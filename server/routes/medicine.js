const express = require('express');
const axios = require('axios');
const router = express.Router();

const indianFallbacks = {
  prolomet: ['Prolomet XL 25', 'Prolomet XL 50', 'Prolomet XL 100'],
  paracetamol: ['Paracetamol 500mg', 'Paracetamol 650mg', 'Dolo 650'],
  amoxicillin: ['Amoxicillin 250mg', 'Amoxicillin 500mg', 'Augmentin'],
  dolo: ['Dolo 500', 'Dolo 650']
};

// Utility: Generate a clean fallback image URL
const getImageUrl = (name) =>
  `https://via.placeholder.com/180x120.png?text=${encodeURIComponent(name)}`;

// @route   GET /api/medicine/search?q=prolomet
router.get('/search', async (req, res) => {
  const query = req.query.q?.toLowerCase();
  if (!query) return res.status(400).json({ error: 'Missing search term' });

  try {
    const rxResponse = await axios.get(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${query}`);
    const conceptGroups = rxResponse.data?.drugGroup?.conceptGroup || [];

    const results = [];
    const added = new Set();

    conceptGroups.forEach((group) => {
      (group.conceptProperties || []).forEach((drug) => {
        const name = drug.name;
        if (!added.has(name.toLowerCase())) {
          added.add(name.toLowerCase());
          results.push({
            name,
            price: (Math.random() * 200 + 20).toFixed(2),
            image: getImageUrl(name)
          });
        }
      });
    });

    if (results.length === 0 && indianFallbacks[query]) {
      indianFallbacks[query].forEach((name) => {
        results.push({
          name,
          price: (Math.random() * 200 + 20).toFixed(2),
          image: getImageUrl(name)
        });
      });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'No valid medicines found' });
    }

    res.json(results.slice(0, 20));
  } catch (err) {
    console.error('Search error:', err.message);
    res.status(500).json({ error: 'Search failed' });
  }
});

module.exports = router;
