const express = require("express");
const path = require('path');
const axios = require('axios');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/pokemon', (req, res) => {
    const num = getRandomID();
    const info = getPokemon(num)
    .then(function(result) {
        if(result) {res.render('pokemon', { ...result.data, num: num });}
    });
})

app.listen(3000, () => {

})

const getPokemon = async (id) => {
    try {
    //   const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      return response
    } catch (e) {
      console.log("ERROR", e);
    }
};

const getRandomID = () => {
    let num = 1 + Math.random() * (800);
    return Math.floor(num);
}