const axios = require("axios")
const fs = require("fs")
const path = require("path")
const FormData = require("form-data")

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://127.0.0.1:8000";

const getContentType = (filePath) => {
    const extension = path.extname(filePath).toLowerCase();

    const typeMap = {
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".webp": "image/webp",
        ".gif": "image/gif",
        ".bmp": "image/bmp",
    };

    return typeMap[extension] || "application/octet-stream";
};

const predictImage = async (filePath) => {
    const stats = fs.statSync(filePath);

    if (!stats.size) {
        throw new Error("Uploaded image is empty");
    }

    const formData = new FormData();
    const fileName = path.basename(filePath);

    formData.append("file", fs.createReadStream(filePath), {
        filename: fileName,
        contentType: getContentType(filePath),
        knownLength: stats.size,
    });

    const response = await axios.post(`${ML_SERVICE_URL}/predict`, formData, {
        headers: {
            ...formData.getHeaders(),
        },
        timeout: 30000,
    });
    return response.data;
};

module.exports = {
    predictImage,
};