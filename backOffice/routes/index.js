const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/createHub', (req, res) => {
    if (req.session.token) {
        res.render('createHub', { token: req.session.token });
    } else {
        res.redirect('/login');
    }
  });

router.get('/backOffice', (req, res) => {
    if (req.session.token) {
        res.render('backOffice', { token: req.session.token });
    } else {
        res.redirect('/login');
    }
});

router.get('/users/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const response = await axios.get(process.env.API_URL + `users/${userId}`,{
        headers: {
            'Authorization': `Bearer ${req.session.token}`,
            'Content-Type': 'application/json'
        }});
        const userData = response.data;
        if (req.session.token) {
            res.render('userDetails', { user: userData, token: req.session.token });
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        res.redirect('/login');
    }
});

router.get('/gardens/:id', async (req, res) => {
    const gardenId = req.params.id;
    try {
        const response = await axios.get(process.env.API_URL + `gardens/${gardenId}`,{
        headers: {
            'Authorization': `Bearer ${req.session.token}`,
            'Content-Type': 'application/json'
        }});
        const gardenData = response.data;
        if (req.session.token) {
            res.render('gardenDetails', { garden: gardenData, token: req.session.token });
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        res.redirect('/login');
    }
});

router.get('/hub/:id', async (req, res) => {
    const hubId = req.params.id;
        try {
                const response = await axios.get(process.env.API_URL + `hub/${hubId}`,{
        headers: {
            'Authorization': `Bearer ${req.session.token}`,
            'Content-Type': 'application/json'
        }});
                const hubData = response.data;
                if (req.session.token) {
                        res.render('hubDetails', { hub: hubData, token: req.session.token });
        } else {
                        res.redirect('/login');
        }
    } catch (error) {
        res.redirect('/login');
    }
});

module.exports = router;