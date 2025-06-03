from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
import os
import requests
import tempfile
import logging
from typing import Optional

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Eye-nimal API")

# Configure CORS to allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=False,  # Must be False for wildcard origins
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize model as None
model = None
YOLO = None

def load_yolo():
    """Lazy import YOLO to reduce initial memory usage"""
    global YOLO
    if YOLO is None:
        try:
            from ultralytics import YOLO as _YOLO
            YOLO = _YOLO
        except ImportError as e:
            logger.error(f"Failed to import YOLO: {e}")
            raise HTTPException(status_code=500, detail="Model initialization failed")
    return YOLO

def download_model():
    global model
    if model is None:
        YOLO = load_yolo()
        
        # Try to load from environment-specified path first
        model_path = os.getenv("MODEL_PATH")
        if model_path and os.path.exists(model_path):
            logger.info(f"Loading model from {model_path}")
            model = YOLO(model_path)
            return model

        # Try local development path
        local_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "models", "best.pt")
        if os.path.exists(local_path):
            logger.info("Loading model from local path")
            model = YOLO(local_path)
            return model

        # Download from Hugging Face
        logger.info("Downloading model from Hugging Face")
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pt') as tmp_file:
            try:
                response = requests.get(MODEL_URL, stream=True)
                response.raise_for_status()
                for chunk in response.iter_content(chunk_size=8192):
                    if chunk:
                        tmp_file.write(chunk)
                tmp_file.flush()
                
                model = YOLO(tmp_file.name)
                return model
            except Exception as e:
                logger.error(f"Error downloading model: {e}")
                raise HTTPException(status_code=500, detail="Failed to load model")
            finally:
                try:
                    os.unlink(tmp_file.name)
                except:
                    pass
    
    return model

@app.get("/")
async def root():
    return {
        "message": "Welcome to Eye-nimal API",
        "status": "healthy"
    }

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        # Ensure model is loaded
        model = download_model()
        
        # Read and validate image
        image_bytes = await file.read()
        try:
            image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        except Exception as e:
            raise HTTPException(status_code=400, detail="Invalid image file")
        
        # Inference with memory optimization
        results = model(image, verbose=False)
        
        # Extract predictions
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
    except Exception as e:
        logger.error(f"Prediction error: {e}")
        raise HTTPException(status_code=500, detail=str(e))