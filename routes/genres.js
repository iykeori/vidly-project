const express = require('express');
const router = express.Router();

const genres = [
    {
        id: 1,
        name: 'Action'
    },
    {
        id: 2,
        name: 'Drama'
    },
    {
        id: 3,
        name: 'Comedy'
    }
];

router.get('/', (req, res) => {
    res.send(genres);
});

router.get('/:id', (req, res) => {
   const genre = genres.find(g => g.id === parseInt(req.params.id));
   if (!genre) return res.status(404).send('The genre with the given ID was not found.'); 
   res.send(genre);
});

router.post('/', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) return res.status(400).send(result.error.details[0].message);
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});

router.put('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    //validate
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //update genre
    genre.name = req.body.name;
    res.send(genre);
});

router.delete('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    //delete genre
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    //return genre
    res.send(genre);
});

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema);
}

module.exports = router;