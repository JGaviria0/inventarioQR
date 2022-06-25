const express = require('express');
const router = express.Router();

const pool = require('../database'); //conexion a la basa de datos.

router.get('/add', (req, res) => {
    res.render('links/add.hbs');
});

router.post('/add', async (req, res) => {
    const {title, url , description } = req.body;
    const newLink = {
        title,
        url,
        description
    };
    await pool.query('INSERT INTO links set ?', [newLink]);
    //console.log(newLink);
    res.redirect('/links'); // el / se definio en algun momento como links, entonces redirecciona a la vista links. en index routes 
});

router.get('/', async (req, res) => {
   const links = await pool.query('SELECT * FROM links');
   //console.log(links);
   res.render('links/list', {links});
});

module.exports = router;