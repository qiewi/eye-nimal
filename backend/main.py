from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
from PIL import Image
import io
import base64
import os
import requests
from pathlib import Path

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
        # Try to load from the root models directory first
        root_model_path = Path("../models/best.pt")
        
        if root_model_path.exists():
            print("Loading model from root models directory...")
            model = YOLO(str(root_model_path))
        else:
            print("Downloading model from Hugging Face...")
            # Create models directory if it doesn't exist
            models_dir = Path("models")
            models_dir.mkdir(exist_ok=True)
            
            local_model_path = models_dir / "best.pt"
            try:
                # Download and save the model
                response = requests.get(MODEL_URL)
                local_model_path.write_bytes(response.content)
                model = YOLO(str(local_model_path))
            except Exception as e:
                print(f"Error downloading model: {e}")
                raise Exception("Could not load or download the model")
    
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