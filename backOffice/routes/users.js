const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const response = await axios.post(process.env.API_URL + '/login', {
      username: req.body.username,
      password: req.body.password
    });
    req.session.token = response.data.token;
    res.cookie('token', response.data.token, { httpOnly: true, secure: true });
    res.redirect('/backOffice');
  } catch (error) {
    console.error('Erreur d\'authentification', error);
    res.redirect('/login');
  }
});

router.get('/backOffice', (req, res) => {
    res.render('backOffice');
});

module.exports = router;
