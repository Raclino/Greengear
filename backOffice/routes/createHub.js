const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/new', async (req, res) => {
  try {
    const response = await axios.post(process.env.API_URL + 'hub', {
      hub_name: req.body.hubName,
      hub_version: req.body.hubVersion
    },{
    headers: {
        'Authorization': `Bearer ${req.session.token}`,
        'Content-Type': 'application/json'
    }});
    res.redirect('/backOffice');
  } catch (error) {
    console.error('Erreur d\'authentification', error);
    res.redirect('/login');
  }
});

module.exports = router;
