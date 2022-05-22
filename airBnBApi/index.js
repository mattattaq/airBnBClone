const Joi = require('joi');
const { listings, addListing, reserve } = require('./Listings');
const express = require('express');
console.log('listings', listings);
const app = express();


// middleware
app.use(express.json());

app.get('/listings', (req, res) => {
    // get list of listings that you can get
    res.send(listings);
});

// /api/listings/1
app.get('/api/listings/:id', (req, res) => {
    const listing = listings.find(l => l.id === parseInt(req.params.id));
    if(!listing) return res.status(404).send('Course not found');
    res.send(listing);
    
});

// post to listings
app.post('/listings/add', function(req, res){
    console.log(req.body);
    const { error } = validateListing(req.body);
    if (error) return res.status(400).send(result.error.details[0].message);
    addListing(listing = req.body);
    res.send(listings);
});

// put
app.put('/api/listings/:id', (req, res) => {
    // look up course
    const listings = listings.find(l => l.id === parseInt(req.params.id));
    if(!listings) return res.status(404).send('Course not found');

    const { error } = validateListing(req.body);
    if (error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    // update course
    course.name = req.body.name;
    // return the updated course to the client
    res.send(course);
});

// delete
app.delete('/api/listings/:id', (req, res) => {
    // look up the course
    // doesn't exist, return 404
    // const course = listings.find(c => c.id === parseInt(req.params.id));
    // if(!course) return res.status(404).send('Course not found');
    
    // // delete
    // const index = listings.indexOf(course);
    // listings.splice(index, 1);

    // // return the same course
    // res.send(course);

});
// PORT
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`));

function validateListing(listings) {
    // validate
    const schema = {
        name: Joi. string().min(3).required(),

    };
    return result = Joi.validate(listings, schema);
}