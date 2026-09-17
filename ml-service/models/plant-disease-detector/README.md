---
license: mit
language:
- en
tags:
- image-classification
- plant-disease
- agriculture
- mobilenetv2
- transfer-learning
- fine-tuning
- tensorflow
- keras
- computer-vision
- plantvillage
datasets:
- plantvillage
metrics:
- accuracy
model-index:
- name: plant-disease-detector-mobilenetv2-finetuned
  results:
  - task:
      type: image-classification
      name: Image Classification
    dataset:
      type: plantvillage
      name: PlantVillage (Augmented)
    metrics:
    - type: accuracy
      value: 0.9875
      name: Test Accuracy
---

# 🌿 Plant Disease Detector — MobileNetV2 Fine-Tuned

**38-class plant disease classification | 98.75% Test Accuracy | TensorFlow / Keras**

[![Python](https://img.shields.io/badge/Python-3.10%2B-blue)](https://python.org)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.x-orange)](https://tensorflow.org)
[![Accuracy](https://img.shields.io/badge/Accuracy-98.75%25-green)](https://github.com/Muhammad-Hassan12/Plant-Disease-Detector)
[![License](https://img.shields.io/badge/License-MIT-yellow)](https://opensource.org/licenses/MIT)

---

## 📖 Model Overview

This model is a fine-tuned **MobileNetV2** classifier capable of identifying **38 different plant disease categories** (covering both diseased and healthy states) from leaf images. It was developed as an end-to-end deep learning project to assist farmers and agricultural experts in early crop disease detection, helping prevent large-scale crop loss through fast and accessible AI-powered diagnosis.

The model was trained on the **PlantVillage (Augmented) dataset** (~87,000 images, 38 classes, 14 crop species) and achieves **98.75% accuracy** on the held-out test set.

- **Architecture:** MobileNetV2 (Transfer Learning + Fine-Tuning)
- **Framework:** TensorFlow 2.x / Keras (Functional API)
- **Input:** RGB leaf images, resized to `224 × 224`
- **Output:** Softmax probabilities over 38 plant disease classes
- **GitHub Repository:** [Muhammad-Hassan12/Plant-Disease-Detector](https://github.com/Muhammad-Hassan12/Plant-Disease-Detector)
- **Live Demo:** [Streamlit App](https://plant-disease-detector-qbcnpnfs29enspoqjjm6d5.streamlit.app/)

---

## 🧠 Training Methodology & Experimentation

To arrive at the best possible model, **4 experimental strategies** were systematically evaluated. Each experiment built on the learnings of the previous one.

| Exp | Strategy | Description | Outcome |
|-----|----------|-------------|---------|
| **1** | Simple CNN (Scratch) | Custom CNN trained from scratch on raw images | Moderate accuracy; struggled with complex visual features |
| **2** | CNN + Data Augmentation | Same architecture with random flip, rotation, and zoom augmentation | Better generalization; significantly slower convergence |
| **3** | Transfer Learning — Feature Extraction | MobileNetV2 (frozen base) + custom classification head | High accuracy; very fast convergence (~few epochs) |
| **4** ✅ | **Transfer Learning — Fine-Tuning** | MobileNetV2 (top 55 layers unfrozen) + fine-tuning at `lr=1e-4` | **Best Performance — 98.75% Test Accuracy** |

### Why Fine-Tuning Won

Freezing the MobileNetV2 base (Experiment 3) gave strong results quickly, but the frozen ImageNet features weren't perfectly adapted to plant leaf textures. Unfreezing the top 55 layers and retraining at a very low learning rate (`1e-4`) allowed the model to adapt its high-level feature detectors to the specific visual patterns of diseased leaves without catastrophically forgetting the low-level ImageNet features. This is the standard recipe for domain-adapted transfer learning and it paid off here — pushing accuracy from ~97% (frozen) to **98.75%** (fine-tuned).

---

## 🏗️ Model Architecture

```
Input (224 × 224 × 3)
    │
    ├── Preprocessing Layer (rescale pixels to [-1, 1])
    │
    ├── Data Augmentation Layers (active during training only)
    │       RandomFlip → RandomRotation → RandomZoom
    │
    ├── MobileNetV2 Base (pre-trained on ImageNet)
    │       Top 55 layers unfrozen for fine-tuning
    │       Remaining layers frozen
    │
    ├── Global Average Pooling 2D
    │
    ├── Dense(128, activation='relu')
    │
    └── Dense(38, activation='softmax')  →  38-class output
```

Key design decisions:
- **Preprocessing baked into the model** — no external normalization needed at inference time; just pass raw PIL/NumPy images.
- **Augmentation inside the model graph** — augmentation layers are automatically disabled during `model.predict()`, so inference is clean and deterministic.
- **Global Average Pooling** instead of Flatten — reduces parameters and improves regularization.

---

## 📊 Performance

| Metric | Value |
|--------|-------|
| **Test Accuracy** | **98.75%** |
| **Dataset** | PlantVillage (Augmented) |
| **Test Set Size** | ~10% of ~87,000 images |
| **Number of Classes** | 38 |
| **Number of Crop Species** | 14 |

Training history (accuracy & loss curves) are available in the [Training_Graphs](https://github.com/Muhammad-Hassan12/Plant-Disease-Detector/tree/main/Training_Graphs) folder of the GitHub repository.

---

## 🌿 Supported Classes (38 Total)

The model classifies leaf images into the following 38 categories across 14 crop species:

| # | Class |
|---|-------|
| 1 | Apple — Apple Scab |
| 2 | Apple — Black Rot |
| 3 | Apple — Cedar Apple Rust |
| 4 | Apple — Healthy |
| 5 | Blueberry — Healthy |
| 6 | Cherry — Powdery Mildew |
| 7 | Cherry — Healthy |
| 8 | Corn — Cercospora Leaf Spot / Gray Leaf Spot |
| 9 | Corn — Common Rust |
| 10 | Corn — Northern Leaf Blight |
| 11 | Corn — Healthy |
| 12 | Grape — Black Rot |
| 13 | Grape — Esca (Black Measles) |
| 14 | Grape — Leaf Blight (Isariopsis Leaf Spot) |
| 15 | Grape — Healthy |
| 16 | Orange — Haunglongbing (Citrus Greening) |
| 17 | Peach — Bacterial Spot |
| 18 | Peach — Healthy |
| 19 | Pepper (Bell) — Bacterial Spot |
| 20 | Pepper (Bell) — Healthy |
| 21 | Potato — Early Blight |
| 22 | Potato — Late Blight |
| 23 | Potato — Healthy |
| 24 | Raspberry — Healthy |
| 25 | Soybean — Healthy |
| 26 | Squash — Powdery Mildew |
| 27 | Strawberry — Leaf Scorch |
| 28 | Strawberry — Healthy |
| 29 | Tomato — Bacterial Spot |
| 30 | Tomato — Early Blight |
| 31 | Tomato — Late Blight |
| 32 | Tomato — Leaf Mold |
| 33 | Tomato — Septoria Leaf Spot |
| 34 | Tomato — Spider Mites / Two-Spotted Spider Mite |
| 35 | Tomato — Target Spot |
| 36 | Tomato — Tomato Yellow Leaf Curl Virus |
| 37 | Tomato — Tomato Mosaic Virus |
| 38 | Tomato — Healthy |

---

## 🚀 How to Use

### Option 1 — Direct Inference with TensorFlow

```python
import tensorflow as tf
import numpy as np
from PIL import Image

# Load model
model = tf.keras.models.load_model("model_4_mobilenet_finetuned.keras")

# Class labels (must match training order)
CLASS_NAMES = [
    "Apple___Apple_scab", "Apple___Black_rot", "Apple___Cedar_apple_rust", "Apple___Healthy",
    "Blueberry___Healthy", "Cherry___Powdery_mildew", "Cherry___Healthy",
    "Corn___Cercospora_leaf_spot_Gray_leaf_spot", "Corn___Common_rust",
    "Corn___Northern_Leaf_Blight", "Corn___Healthy",
    "Grape___Black_rot", "Grape___Esca_(Black_Measles)",
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)", "Grape___Healthy",
    "Orange___Haunglongbing_(Citrus_greening)",
    "Peach___Bacterial_spot", "Peach___Healthy",
    "Pepper,_bell___Bacterial_spot", "Pepper,_bell___Healthy",
    "Potato___Early_blight", "Potato___Late_blight", "Potato___Healthy",
    "Raspberry___Healthy", "Soybean___Healthy", "Squash___Powdery_mildew",
    "Strawberry___Leaf_scorch", "Strawberry___Healthy",
    "Tomato___Bacterial_spot", "Tomato___Early_blight", "Tomato___Late_blight",
    "Tomato___Leaf_Mold", "Tomato___Septoria_leaf_spot",
    "Tomato___Spider_mites_Two-spotted_spider_mite", "Tomato___Target_Spot",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus", "Tomato___Tomato_mosaic_virus",
    "Tomato___Healthy"
]

def predict(image_path: str):
    img = Image.open(image_path).convert("RGB").resize((224, 224))
    img_array = np.expand_dims(np.array(img), axis=0)  # shape: (1, 224, 224, 3)
    # No manual normalization needed — preprocessing is baked into the model
    predictions = model.predict(img_array)
    predicted_class = CLASS_NAMES[np.argmax(predictions)]
    confidence = float(np.max(predictions))
    return {"class": predicted_class, "confidence": f"{confidence:.2%}"}

result = predict("your_leaf_image.jpg")
print(result)
# Example output: {'class': 'Tomato___Early_blight', 'confidence': '99.12%'}
```

### Option 2 — Run the Streamlit App Locally

```bash
# Clone the repository
git clone https://github.com/Muhammad-Hassan12/Plant-Disease-Detector.git
cd Plant-Disease-Detector

# Install dependencies
pip install -r requirements.txt

# Launch the app
streamlit run Deploy/app.py
```
---

## 📂 Repository Structure

```bash
📦 Plant-Disease-Detector
├── app.py                              # Streamlit web app
├── model_4_mobilenet_finetuned.keras   # Final deployed model
└── requirements.txt                    # Requirements and Dependencies
```

---


## 📦 Dependencies

```
tensorflow>=2.10
streamlit
pillow
numpy
matplotlib
```

Install via:
```bash
pip install -r requirements.txt
```

---

## 📋 Dataset

| Property | Detail |
|----------|--------|
| **Name** | PlantVillage (Augmented) |
| **Source** | [Kaggle — PlantVillage Dataset](https://www.kaggle.com/datasets/vipoooool/new-plant-diseases-dataset) |
| **Total Images** | ~87,000 RGB images |
| **Classes** | 38 (disease + healthy states) |
| **Crop Species** | 14 |
| **Image Type** | Controlled lab-condition leaf photographs |
| **Split** | ~80% Train / ~20% Validation+Test |

> **Note on Dataset Scope:** The PlantVillage dataset consists of lab-controlled images with uniform backgrounds. Real-world field performance may vary due to lighting variation, occlusion, soil on leaves, and other environmental factors. Always validate with domain experts before production agricultural deployment.

---

## ⚠️ Limitations & Disclaimer

- **Dataset bias:** Trained exclusively on PlantVillage lab-condition images. Performance on field photographs with cluttered backgrounds may degrade.
- **Species coverage:** Only covers the 14 crop species present in PlantVillage. Predictions on out-of-distribution crops will be unreliable.
- **Intended use:** This model is designed for **educational and assistive purposes**. It is not a replacement for professional agricultural diagnosis. Findings should be confirmed by qualified agricultural experts before taking large-scale action (chemical treatment, crop disposal, etc.).
- **Not for clinical or regulatory use.**

---

## 👤 Author

**Syed Muhammad Hassan**
- GitHub: [@Muhammad-Hassan12](https://github.com/Muhammad-Hassan12)
- HuggingFace: [rarfileexe](https://huggingface.co/rarfileexe)
- BS Computer Science, Ziauddin University, Karachi, Pakistan

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](https://github.com/Muhammad-Hassan12/Plant-Disease-Detector/blob/main/LICENSE) file for details.

---

## 🙏 Acknowledgements

- **Kaggle** for providing free GPU compute (12-hour sessions) used to train all four experimental models.
- The **PlantVillage** project and Hughes et al. for the open dataset enabling this research.
- **Google** for MobileNetV2 and the ImageNet pre-trained weights that made transfer learning possible.