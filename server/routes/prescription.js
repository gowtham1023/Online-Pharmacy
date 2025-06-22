const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const fs = require('fs');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload-prescription', upload.single('file'), async (req, res) => {
  const filePath = req.file?.path;

  if (!filePath) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const result = await Tesseract.recognize(filePath, 'eng');
    const text = result.data.text;

    const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
    const medicines = lines.filter(line => /^[A-Za-z]/.test(line));

    fs.unlinkSync(filePath); // clean up
    res.json({ medicines });
  } catch (err) {
    console.error('Tesseract error:', err);
    res.status(500).json({ error: 'Failed to process prescription' });
  }
});

module.exports = router;
