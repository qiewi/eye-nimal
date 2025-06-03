from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
from PIL import Image
import io
import base64
import os
import requests
from pathlib import Path
import tempfile

app = FastAPI(title="Eye-nimal API")

# Configure CORS with environment variables
PRODUCTION_URL = "https://eye-nimal.vercel.app"
LOCAL_URL = "http://localhost:3000"
MODEL_URL = os.getenv("MODEL_URL", "https://huggingface.co/rizqeez/eyenimal/resolve/main/best.pt")

# Allow both development and production URLs
allowed_origins = [LOCAL_URL, PRODUCTION_URL]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize model as None
model = None

def download_model():
    global model
    if model is None:
        # In local development, try to load from the root models directory
        if not os.getenv("VERCEL"):
            root_model_path = Path("../models/best.pt")
            if root_model_path.exists():
                print("Loading model from root models directory...")
                model = YOLO(str(root_model_path))
                return model

        # In Vercel or if local model not found, download to temp directory
        print("Downloading model from Hugging Face...")
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pt') as tmp_file:
            try:
                response = requests.get(MODEL_URL)
                tmp_file.write(response.content)
                tmp_file.flush()  # Ensure all data is written
                model = YOLO(tmp_file.name)
                return model
            except Exception as e:
                print(f"Error downloading model: {e}")
                raise Exception("Could not load or download the model")
            finally:
                # Clean up temp file after model is loaded
                try:
                    os.unlink(tmp_file.name)
                except:
                    pass
    
    return model

@app.get("/")
async def root():
    return {"message": "Welcome to Eye-nimal API"} 

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Ensure model is loaded
    model = download_model()
    
    # Read image file
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    
    # Inference
    results = model(image)
    pred_idx = int(results[0].probs.top1)
    pred_conf = float(results[0].probs.top1conf)
    pred_label = results[0].names[pred_idx]
    
    # Get top5 predictions
    top5_idx = results[0].probs.top5
    top5_labels = [results[0].names[i] for i in top5_idx]
    top5_confs = [float(results[0].probs.data[i]) for i in top5_idx]
    
    return {
        "pred_label": pred_label,
        "pred_conf": pred_conf,
        "top5_labels": top5_labels,
        "top5_confs": top5_confs
    }