# Agri Intelligence Mobile

A full-stack crop disease detection application that lets a user capture or pick an image of a plant leaf, upload it through a mobile app, and receive an AI-based disease prediction with confidence score.

This repository combines:

- a React Native / Expo mobile frontend
- a Node.js + Express backend for file upload and API orchestration
- a Python FastAPI service for image prediction using a TensorFlow model
- a trained plant disease detection model and dataset assets

---

## Project Overview

The system is designed for quick field diagnosis of crop diseases. A farmer or agronomist can open the app, select a leaf image from the camera or gallery, and send it to the backend. The backend stores the uploaded file temporarily, forwards it to the ML service, and returns the predicted disease class and confidence.

The app uses a transfer-learned MobileNetV2 model trained to detect plant diseases across multiple crop types and disease classes.

---

## Architecture

The repository is split into three main service layers:

1. Client app
   - Built with Expo and React Native
   - Lets the user upload or capture images
   - Sends the image to the backend API
   - Displays prediction results

2. Backend API
   - Built with Express.js
   - Accepts multipart image uploads
   - Validates file type and size
   - Sends image to the ML prediction service
   - Returns JSON with prediction and upload metadata

3. ML Service
   - Built with FastAPI
   - Accepts image uploads
   - Loads a Keras TensorFlow model
   - Preprocesses the image and predicts the disease class
   - Returns the predicted class and confidence

---

## Repository Structure

```bash
agri-intelligence-mobile/
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── controllers/
│   │   │   └── prediction.controller.js
│   │   ├── middleware/
│   │   │   └── upload.middlware.js
│   │   ├── routes/
│   │   │   └── prediction.routes.js
│   │   ├── services/
│   │   │   └── ml.service.js
│   │   └── uploads/
│   ├── package.json
│   └── .env.example (if added later)
├── client/
│   ├── src/
│   ├── app.json
│   ├── package.json
│   └── README.md
├── ml-service/
│   ├── app/
│   ├── requirements.txt
│   └── models/
│       └── plant-disease-detector/
│           ├── model_4_mobilenet_finetuned.keras
│           └── README.md
├── dataset/
├── .gitignore
└── README.md
```

---

## Tech Stack

### Frontend
- React Native
- Expo
- Expo Image Picker
- React Native UI components

### Backend
- Node.js
- Express
- Multer
- Axios
- CORS
- dotenv

### ML Prediction Service
- Python 3
- FastAPI
- TensorFlow / Keras
- PIL (Pillow)
- NumPy
- Python multipart uploads

---

## How the Workflow Works

1. The user selects an image from the gallery or camera inside the Expo app.
2. The app copies the image to a cache file and uploads it to the backend endpoint:
   - POST /api/predictions
3. The backend validates the image, saves it in the temporary uploads folder, and forwards it to the ML service.
4. The ML service loads the TensorFlow model and predicts the crop disease class.
5. The backend sends the response back to the app.
6. The client displays the disease name and confidence percentage.

---

## Mobile App Details

The mobile app is located in the client folder and follows a basic Expo app structure.

### Main user flow
- The home screen displays a placeholder or selected image preview.
- The user can choose an image from the gallery or take a photo with the camera.
- Pressing Analyze Crop triggers the prediction request.
- Result is shown as:
  - disease class name
  - confidence percentage

### Key mobile code paths
- Home screen: client/src/screens/Home/HomeScreen.js
- Image picker component: client/src/components/ImagePicker/ImagePickerButton.js
- API call logic: client/src/services/api.js

---

## Backend Details

The backend is a lightweight Express server that exposes a prediction route.

### Main backend files
- app entry: backend/src/app.js
- server startup: backend/src/server.js
- route setup: backend/src/routes/prediction.routes.js
- controller logic: backend/src/controllers/prediction.controller.js
- upload middleware: backend/src/middleware/upload.middlware.js
- ML client: backend/src/services/ml.service.js

### API behavior
- Upload endpoint: POST /api/predictions
- File field: file
- Accepted formats: JPG, JPEG, PNG, WEBP, GIF, BMP
- Max upload size: 6MB
- The backend deletes the temporary uploaded file after prediction

---

## ML Service Details

The ML microservice is in the ml-service folder.

### Main files
- app entry: ml-service/app/main.py
- API routes: ml-service/app/api/routes.py
- model loading: ml-service/app/model/loader.py
- predictor logic: ml-service/app/model/predictor.py
- preprocessing: ml-service/app/model/preprocessing.py
- class names and model path: ml-service/app/model/config.py

### Model info
The application points to the Keras model:

- ml-service/models/plant-disease-detector/model_4_mobilenet_finetuned.keras

The model is configured for 224x224 RGB inputs and outputs a classification across many crop disease classes, including tomato, potato, corn, apple, grape, pepper, and more.

---

## Running the Project

## 1. Install backend dependencies

```bash
cd backend
npm install
```

Start the backend:

```bash
npm run dev
```

The server listens on port 5000 by default.

---

## 2. Install ML service dependencies

```bash
cd ml-service
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Run the ML API:

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

---

## 3. Install mobile app dependencies

```bash
cd client
npm install
```

Start Expo:

```bash
npx expo start
```

Then run the app on an emulator or physical device using Expo Go or a local Android/iOS simulator.

> Note: the mobile client currently contains a hardcoded backend URL in the API service file. On a real device, it must be updated to the local network IP of the machine running the backend.

---

## Environment Notes

### Backend
The backend uses environment variables such as:

```bash
PORT=5000
ML_SERVICE_URL=http://127.0.0.1:8000
```

This is important because the ML service is called through the backend using the configured URL.

### Client
The Expo app currently uses a hardcoded host value in the API service. This is not truly environment-agnostic and should be adjusted for local network testing.

---

## Current Implementation Observations

This codebase is a working prototype that demonstrates a complete AI disease detection flow, but there are some implementation details worth noting:

- The mobile app is configured for local network testing and may require IP changes depending on the device.
- The backend deletes uploaded temporary files after processing.
- The model file is expected to exist under the ml-service/models folder before inference runs.
- The upload middleware allows common image types and limits uploads to 6MB.
- The app currently focuses on image classification rather than full farm management, reporting, or user accounts.

---

## Future Improvements

Possible next steps for this project include:

- environment variable support for the mobile app API base URL
- better error handling and user feedback for unsupported images
- database support for prediction history
- authentication and user profiles
- deployment to cloud infrastructure
- better model monitoring and retraining pipeline
- dashboard for disease analytics and recommendations

---

## License

This project is intended for educational and prototype use. Check the repository and package configs for the exact licensing terms used in each sub-project.

---

## Summary

Agri Intelligence Mobile is an end-to-end plant disease detection solution built across mobile, backend, and ML layers. It demonstrates how a mobile app can capture crop images, send them through a Node API, and classify them using a TensorFlow-based disease model in real time.
# Agri-intelligence
