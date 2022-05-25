const expect  = require('chai').expect;
const request = require('request');
const mysql = require('mysql');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'airbnb'
  });
  
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

it('make reservation', function(done) {
    const requestBody = {
            "startDate": "2022-05-24",
            "endDate": "2022-05-25",
            "listing_id": 1
        }
    request.post({
        url: 'http://localhost:3000/listings/makeReservation/',
        headers: {'content-type': 'application/json'},
        json: requestBody
    }, function(error, response, body) {
        const jsonRes = response.body;
        const testQuery = `SELECT * FROM Reserved WHERE Id = ${jsonRes.id}`;
        console.log(testQuery, ' testQuery');
        connection.query(testQuery, function(error,  results, fields){
            const [reservation] = results;
            const expectation = {
                Id: reservation.Id
            }
            expect(reservation.Id).to.equal(jsonRes.id);
            done();
        });
    });
});

it('list reservations', function(done) {
request.get({
    url: 'http://localhost:3000/reservations/getAllReservations',
    headers: {'content-type': 'application/json'},
}, function(error, response, body) {
    const jsonRes = response.body;
    const testQuery = `SELECT * FROM Reserved`;
        connection.query(testQuery, function(error,  results, fields){
            console.log(results, ' results');
            expect(results.length).to.equal(JSON.parse(jsonRes).length);
            done();
        });
    });
});