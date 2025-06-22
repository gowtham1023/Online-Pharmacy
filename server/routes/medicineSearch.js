// server/routes/medicine.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

// Existing medicine routes (keep them here if any)

// Add the search functionality from medicineSearch.js
router.get('/search', async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: 'Missing search term' });

  try {
    const response = await axios.get(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${query}`);
    const related = response.data?.drugGroup?.conceptGroup || [];

    const results = [];
    related.forEach(group => {
      group.conceptProperties?.forEach(drug => {
        results.push({
          name: drug.name,
          rxcui: drug.rxcui,
          price: (Math.random() * 200 + 20).toFixed(2), // Mock pricing
          image: `https://source.unsplash.com/featured/?medicine,${drug.name}` // Dynamic image
        });
      });
    });

    res.json(results.slice(0, 10)); // limit results
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Search failed' });
  }
});

module.exports = router;
