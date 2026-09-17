import numpy as np
from PIL import Image

from app.model.config import IMAGE_SIZE

def preprocess_image(image: Image.Image):
    image = image.convert("RGB")
    image = image.resize(IMAGE_SIZE)

    image_array = np.array(image, dtype=np.float32)
    return np.expand_dims(image_array, axis=0)
