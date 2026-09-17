const fs = require("fs/promises");

const { predictImage } = require("../services/ml.service.js");

const createPrediction = async (req, res) => {
  let filePath = null;
  const uploadedFile = req.file || req.files?.file?.[0] || req.files?.image?.[0];

  try {
    // -----------------------------------
    // 1. Check image upload
    // -----------------------------------
    if (!uploadedFile) {
      return res.status(400).json({
        success: false,
        message: "Crop image is required",
      });
    }

    filePath = uploadedFile.path;

    // -----------------------------------
    // 2. Multer upload information
    // -----------------------------------
    console.log("Multer upload:", {
      fieldname: uploadedFile.fieldname,
      originalname: uploadedFile.originalname,
      mimetype: uploadedFile.mimetype,
      size: uploadedFile.size,
      path: uploadedFile.path,
    });

    // -----------------------------------
    // 3. Check actual uploaded file
    // -----------------------------------
    const uploadedBytes = await fs.readFile(filePath);

    console.log("Uploaded file diagnostic:", {
      size: uploadedBytes.length,

      firstBytesHex: uploadedBytes
        .subarray(0, 32)
        .toString("hex"),

      firstBytesText: uploadedBytes
        .subarray(0, 100)
        .toString("utf8"),
    });

    // -----------------------------------
    // 4. Send image to ML service
    // -----------------------------------
    const mlResult = await predictImage(filePath);

    // -----------------------------------
    // 5. Return prediction
    // -----------------------------------
    return res.status(200).json({
      success: true,

      prediction: mlResult.prediction,

      image: {
        filename: uploadedFile.filename,
        originalName: uploadedFile.originalname,
      },
    });

  } catch (error) {
    console.error(
      "Prediction request failed:",
      error.message
    );

    if (error.response) {
      console.error(
        "ML service response:",
        error.response.data
      );
    }

    return res.status(502).json({
      success: false,
      message: error.message || "ML service unavailable",
    });

  } finally {

    // -----------------------------------
    // 7. Delete temporary uploaded image
    // -----------------------------------
    if (filePath) {
      try {
        await fs.unlink(filePath);

        console.log(
          "Temporary image deleted:",
          filePath
        );

      } catch (error) {
        console.error(
          "Failed to remove temporary image:",
          error.message
        );
      }
    }
  }
};

module.exports = {
  createPrediction,
};