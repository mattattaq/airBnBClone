const listings = [
    {
        id: 1,
        name: 'course 1',
        availability: {
            booked: [],
            available: []
        },
        address: "",
        ownerInfo: {
            name: "",
            phoneNumber: ""
        },
        media: {
            img: "",
            title: "",
            photos: [
                {
                    img: "",
                    title: ""
                },
                {
                    img: "",
                    title: ""
                },
                {
                    img: "",
                    title: ""
                },
            ]
        }
    },
    {
        id: 2,
        name: 'course 1',
        availability: {
            booked: [],
            available: []
        },
        address: "",
        ownerInfo: {
            name: "",
            phoneNumber: ""
        },
        media: {
            img: "",
            title: "",
            photos: [
                {
                    img: "",
                    title: ""
                },
                {
                    img: "",
                    title: ""
                },
                {
                    img: "",
                    title: ""
                },
            ]
        }
    },
    {
        id: 3,
        name: 'course 1',
        availability: {
            booked: [],
            available: []
        },
        address: "",
        ownerInfo: {
            name: "",
            phoneNumber: ""
        },
        media: {
            img: "",
            title: "",
            photos: [
                {
                    img: "",
                    title: ""
                },
                {
                    img: "",
                    title: ""
                },
                {
                    img: "",
                    title: ""
                },
            ]
        }
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
function reserve(name, reserveDates, contactInfo) {
    // validate dates
    // add bookedBy
    // add reserve dates (update booked dates / remove from available dates)
    // update object
}

module.exports = { listings, addListing };

