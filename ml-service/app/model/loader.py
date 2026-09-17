import os

import tensorflow as tf

from app.model.config import MODEL_PATH


class ModelLoader:
    def __init__(self):
        self.model = None

    def load(self):
        if self.model is None:
            if not os.path.exists(MODEL_PATH):
                raise FileNotFoundError(
                    f"Model file not found at {MODEL_PATH}. "
                    "Place your trained model in the ml-service/models directory."
                )

            print(f"Loading model from : {MODEL_PATH}")
            self.model = tf.keras.models.load_model(MODEL_PATH)
            print("Model Loaded successfully")
        return self.model


model_loader = ModelLoader()