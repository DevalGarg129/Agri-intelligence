import numpy as np

from app.model.config import CLASS_NAMES
from app.model.loader import model_loader
from app.model.preprocessing import preprocess_image


class Predictor:
    def __init__(self):
        self.model = None

    def _ensure_model_loaded(self):
        if self.model is None:
            self.model = model_loader.load()

    def predict(self, image):
        self._ensure_model_loaded()

        processed_image = preprocess_image(image)
        probabilities = self.model.predict(processed_image, verbose=0)[0]

        if len(probabilities) != len(CLASS_NAMES):
            raise ValueError(
                f"Model returned {len(probabilities)} scores, "
                f"but there are {len(CLASS_NAMES)} class names."
            )

        predicted_index = int(np.argmax(probabilities))
        confidence = float(probabilities[predicted_index])

        return {
            "class_index": predicted_index,
            "class_name": CLASS_NAMES[predicted_index],
            "confidence": confidence,
        }


predictor = Predictor()