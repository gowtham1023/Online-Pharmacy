// server/routes/ocr.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const tesseract = require('tesseract.js');
const fs = require('fs');


const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), async (req, res) => {
  const imagePath = req.file.path;

  try {
    const result = await tesseract.recognize(imagePath, 'eng');
    const text = result.data.text;
    const medicines = extractMedicines(text); // You define this logic

    fs.unlinkSync(imagePath); // clean up temp file
    res.json({ medicines });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'OCR failed' });
  }
});

function extractMedicines(text) {
  const lines = text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 2);

  // You can improve this with NLP, regex, etc.
  return lines.slice(0, 5); // return top 5 detected lines as dummy medicines
}

module.exports = router;
