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

// post to reserve
app.post('/listings/reserve/:id', (req, res) => {
    const listing = listings.find(l => l.id === parseInt(req.params.id));
    if(!listing) return res.status(404).send('Cannot find that listing');

    // date parsing, is it available?
    console.log(listing);
    res.send(`You've successfully booked ${listing.name}`);
})

// put
app.put('/api/listings/:id', (req, res) => {
    // look up Listing
    const listings = listings.find(l => l.id === parseInt(req.params.id));
    if(!listings) return res.status(404).send('Listing not found');

    const { error } = validateListing(req.body);
    if (error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    // update Listing
    listings.name = req.body.name;
    // return the updated listing to the client
    res.send(listings);
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