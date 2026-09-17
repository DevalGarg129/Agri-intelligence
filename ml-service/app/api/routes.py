from fastapi import APIRouter, File, UploadFile, HTTPException
from PIL import Image

from app.model.predictor import predictor


router = APIRouter()


@router.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not file.content_type:
        raise HTTPException(status_code=400, detail="File type is missing")

    allowed_types = {"image/jpeg", "image/png", "image/webp"}

    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail="Only JPEG, PNG and WebP images are supported",
        )

    try:
        contents = await file.read()
        image = Image.open(__import__("io").BytesIO(contents))
        result = predictor.predict(image)

        return {"success": True, "prediction": result}

    except FileNotFoundError as error:
        print(f"Prediction error: {error}")
        raise HTTPException(
            status_code=503,
            detail="Model is not available yet. Add the trained model to ml-service/models first.",
        ) from error

    except Exception as error:
        print(f"Prediction error: {error}")
        raise HTTPException(status_code=500, detail="Failed to process image") from error