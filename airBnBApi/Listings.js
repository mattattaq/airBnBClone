const listings = [
    {
        id: 1,
        name: 'Dracula\'s Castle',
        type: "2 bedroom",
        availability: {
            booked: ["05/22/2022", "05/23/2022", "05/24/2022", "05/26/2022", '5/29/2022'],
        },
        address: "666 E. Blood Drive, Transulvania, Romania",
    },
    {
        id: 2,
        name: 'Frankenstein\'s Castle',
        type: "3 bedroom",
        availability: {
            booked: [],
            available: []
        },
        address: "",
    },
    {
        id: 3,
        name: '123 Fast length, Dr, Fort Collins, CO 80522',
        type: "2 bedroom",
        availability: {
            booked: [],
            available: []
        },
        address: "",
    }
];

// add listing to array
function addListing(listing) {
    const entry = {
        id: listings.length + 1,
        name: listing.name
    };
    listings.push(entry);
}

// reserve listing
function reserve(listing, reservedDates) {
    // find entry
    const listEntry = listings.find(l => l.id === parseInt(listing.id));
    // update object
    listEntry.availability.booked.push(reservedDates);
}

module.exports = { listings, reserve, addListing };

