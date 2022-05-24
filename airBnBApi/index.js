const Joi = require('joi');
const { listings, addListing, reserve } = require('./Listings');
const express = require('express');
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
    if(!listing) return res.status(404).send('Listing not found');
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

    const now = new Date();

    // evaluate returned dates
    const bookedDates = listing.availability.booked.map(date => new Date(date))
    const reserveDates = req.body.reserveDates ?
        new Date(req.body.reserveDates) : res.status(404).send('Malformed Body');

    // is reservation before today?
    if(reserveDates < now) return res.send('No time travelling allowed');
    const { error } = validateReservation(bookedDates, reserveDates);
    
    // date parsing, is it available?
    if(bookedDates.find(d => d.toDateString() === reserveDates.toDateString())) {
        res.send("Please pick another date");
    } else {
        res.send(`You've successfully booked ${listing.name}`);
        // reserveNow
        // reserve(listing, reserveDate);
    }

});


function validateReservation(bookedDates, reserveDates) {
    console.log(bookedDates, ' bookedDates');
    console.log(reserveDates, ' reserveDates');
    const schema = {
        reserveDate: Joi.date().iso(),
        bookedDates: Joi.date().iso()
    }
    return result = Joi.validate(reserveDates, schema);
}

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
        name: Joi.string().min(3).required()
    };
    return result = Joi.validate(listings, schema);
}