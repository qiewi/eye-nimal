from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
from PIL import Image
import io
import base64

app = FastAPI(title="Eye-nimal API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to Eye-nimal API"} 

# Load model YOLOv8 classification
model = YOLO("../models/best.pt")  # path ke model kamu

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Baca file gambar
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    # Inference
    results = model(image)
    pred_idx = int(results[0].probs.top1)
    pred_conf = float(results[0].probs.top1conf)
    pred_label = results[0].names[pred_idx]
    # (Opsional) Kembalikan info lain, misal top5
    top5_idx = results[0].probs.top5
    top5_labels = [results[0].names[i] for i in top5_idx]
    top5_confs = [float(results[0].probs.data[i]) for i in top5_idx]
    return {
        "pred_label": pred_label,
        "pred_conf": pred_conf,
        "top5_labels": top5_labels,
        "top5_confs": top5_confs
    }

