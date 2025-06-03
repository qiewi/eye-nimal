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
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI(title="Eye-nimal API")

# Configure CORS with environment variables
ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://eye-nimal.vercel.app",
    "https://eye-nimal-qies-projects-952358dd.vercel.app",
    "https://eye-nimal-fh7umiezw-qies-projects-952358dd.vercel.app",
    # Wildcard for development/preview deployments
    "https://*.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
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
            logger.info("Successfully imported YOLO")
        except ImportError as e:
            logger.error(f"Failed to import YOLO: {e}")
            raise HTTPException(status_code=500, detail="Model initialization failed")
    return YOLO

def download_model():
    global model
    if model is None:
        try:
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
                    response = requests.get(
                        "https://huggingface.co/rizqeez/eyenimal/resolve/main/best.pt",
                        stream=True,
                        timeout=30
                    )
                    response.raise_for_status()
                    
                    # Download with progress logging
                    total_size = int(response.headers.get('content-length', 0))
                    block_size = 8192
                    downloaded = 0
                    
                    for chunk in response.iter_content(chunk_size=block_size):
                        if chunk:
                            downloaded += len(chunk)
                            tmp_file.write(chunk)
                            if total_size > 0:
                                percent = (downloaded / total_size) * 100
                                logger.info(f"Download progress: {percent:.1f}%")
                    
                    tmp_file.flush()
                    logger.info("Model download completed")
                    
                    model = YOLO(tmp_file.name)
                    logger.info("Model loaded successfully")
                    return model
                except Exception as e:
                    logger.error(f"Error downloading model: {str(e)}")
                    raise HTTPException(status_code=500, detail=f"Failed to load model: {str(e)}")
                finally:
                    try:
                        os.unlink(tmp_file.name)
                    except:
                        pass
        except Exception as e:
            logger.error(f"Unexpected error in download_model: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")
    
    return model

@app.get("/")
async def root():
    return {
        "message": "Welcome to Eye-nimal API",
        "status": "healthy",
        "cors_origins": ALLOWED_ORIGINS
    }

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        logger.info("Starting prediction request")
        
        # Ensure model is loaded
        if not model:
            logger.info("Loading model for first time use")
        model = download_model()
        
        # Read and validate image
        logger.info("Reading uploaded file")
        image_bytes = await file.read()
        try:
            image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
            logger.info("Image successfully loaded and converted to RGB")
        except Exception as e:
            logger.error(f"Invalid image file: {str(e)}")
            raise HTTPException(status_code=400, detail="Invalid image file")
        
        # Inference with memory optimization
        logger.info("Running inference")
        results = model(image, verbose=False)
        
        # Extract predictions
        pred_idx = int(results[0].probs.top1)
        pred_conf = float(results[0].probs.top1conf)
        pred_label = results[0].names[pred_idx]
        
        # Get top5 predictions
        top5_idx = results[0].probs.top5
        top5_labels = [results[0].names[i] for i in top5_idx]
        top5_confs = [float(results[0].probs.data[i]) for i in top5_idx]
        
        logger.info(f"Prediction completed successfully: {pred_label}")
        
        return {
            "pred_label": pred_label,
            "pred_conf": pred_conf,
            "top5_labels": top5_labels,
            "top5_confs": top5_confs
        }
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))