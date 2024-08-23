const express = require('express');
const router = express.Router();
const School = require('../models/school');

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

router.post('/addSchool', async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || typeof latitude !== 'number' || typeof longitude !== 'number') {
    return res.status(400).json({ message: 'All fields are required and must be of correct types.' });
  }

  try {
    const newSchool = new School({ name, address, latitude, longitude });
    const savedSchool = await newSchool.save();
    res.status(201).json({ message: 'School added successfully!', school: savedSchool });
  } catch (err) {
    console.error('Error inserting school:', err.message);
    res.status(500).json({ message: 'Database error', error: err.message });
  }
});

router.get('/listSchools', async (req, res) => {
  let { latitude, longitude } = req.query;

  latitude = parseFloat(latitude);
  longitude = parseFloat(longitude);

  if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ message: 'Latitude and Longitude are required and must be valid numbers.' });
  }

  try {
    const schools = await School.find();

    const sortedSchools = schools.map(school => ({
      school,
      distance: calculateDistance(latitude, longitude, school.latitude, school.longitude),
    })).sort((a, b) => a.distance - b.distance);

    res.json(sortedSchools);
  } catch (err) {
    console.error('Error fetching schools:', err.message);
    res.status(500).json({ message: 'Database error', error: err.message });
  }
});

module.exports = router;
