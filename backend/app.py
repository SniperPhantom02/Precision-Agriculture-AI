from fastapi import FastAPI
from pydantic import BaseModel
from model import predict_irrigation

app = FastAPI()

class InputData(BaseModel):
    temp: float
    rainfall: float
    soil_type: str
    crop_type: str

@app.get("/")
def home():
    return {"message": "Precision Agriculture AI API is running"}

@app.post("/predict")
def predict(data: InputData):
    result = predict_irrigation(
        data.temp,
        data.rainfall,
        data.soil_type,
        data.crop_type
    )
    return result
