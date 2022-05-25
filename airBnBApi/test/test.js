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

// function haveSameData()
it('make reservation', function(done) {
    const requestBody = {
            "startDate": "2022-05-24",
            "endDate": "2022-05-25"
        }
    request.post({
        url: 'http://localhost:3000/listings/makeReservation/',
        headers: {'content-type': 'application/json'},
        json: requestBody
    }, function(error, response, body) {
        const jsonRes = response.body;
        console.log(jsonRes, 'jsonRes');
        const testQuery = `SELECT * FROM Reserved WHERE Id = ${jsonRes.id}`;
        console.log(testQuery, ' testQuery');
        connection.query(testQuery, function(error,  results, fields){
            console.log(error, ' error');
            console.log(results, 'results');
            const [reservation] = results;
            console.log(reservation, ' reservation');
            const startDateEval = new Date(Date.parse(reservation.startDate)).toISOString().split('T')[0];
            const endDateEval = new Date(Date.parse(reservation.endDate)).toISOString().split('T')[0];
            console.log(startDateEval, ' startDateEval');
            const expectation = {
                Id: reservation.Id
            }
            console.log(expectation, ' expectation');
            console.log()
            expect(reservation.Id).to.equal(jsonRes.id);
            done();
        });
        
    });
});