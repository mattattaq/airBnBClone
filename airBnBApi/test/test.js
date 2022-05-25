const expect = require('chai').expect;
const request = require('request');
const mysql = require('mysql');

console.log(process.env.MYSQL_HOST, ' mysql host');
console.log(process.env.MYSQL_USER, ' mysql user');
console.log(process.env.MYSQL_PASSWORD, ' mysql pass');

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'airbnb'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

it('make reservation', function (done) {
    const requestBody = {
        "startDate": "2022-05-24",
        "endDate": "2022-05-25",
        "listing_ids": [1,2]
    }
    request.post({
        url: 'http://localhost:3000/listings/makeReservation/',
        headers: { 'content-type': 'application/json' },
        json: requestBody
    }, function (error, response, body) {
        const jsonRes = response.body;
        const testQuery = `SELECT * FROM Reserved WHERE Id = ${jsonRes.reservationId}`;
        console.log(testQuery, ' testQuery');
        connection.query(testQuery, function (error, results, fields) {
            const [reservation] = results;
            const expectation = {
                Id: reservation.Id
            }
            expect(reservation.Id).to.equal(jsonRes.reservationId);
            done();
        });
    });
});

it('list reservations', function (done) {
    request.get({
        url: 'http://localhost:3000/reservations/getAllReservations',
        headers: { 'content-type': 'application/json' },
    }, function (error, response, body) {
        const jsonRes = response.body;
        const testQuery = `SELECT * FROM Reserved`;
        connection.query(testQuery, function (error, results, fields) {
            console.log(results, ' results');
            expect(results.length).to.equal(JSON.parse(jsonRes).length);
            done();
        });
    });
});