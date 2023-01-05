//import { v4 as uuid } from 'uuid';

const express = require('express');
const app = express();
const path = require('path');


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    next();
});


let employees = [
    { id: "1", name: "Simon Ludwig" }
]


let mates = [{ "firstname": "Luca", "lastname": "Mohr", "personID": 1, "groupID": 1 }, { "firstname": "Niklas", "lastname": "Scholz", "personID": 2, "groupID": 1 }]
let bills = [{ "billID": 1, "contributor": "Luca", "amount": -13.30, "sharedWith": "Niklas", "comment": "test" }]
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    next();
});

// api mates
app.get('/api/mates', (req, res) => res.json(mates));
;

app.put("/api/mates", (req, res) => {
    mates.push({ firstname: "Tim", lastname: "Mayer", personID: 3, groupID: 4 });
    res.send(200);
})

app.delete("/api/mates/:mateID", (req, res) => {

    mates.filter(mate => mate.personID === req.params.mateID)
    res.send(200);
})

// api bills
app.put('/api/bills', (req, res) => {
    bills.push({ billID: req.query.billID, contributor: req.query.contributor, amount: req.query.amount, sharedWith: req.query.sharedWith, comment: req.query.comment })
    res.send(200)
});
;
app.post('/api/bills', (req, res) => {
    res.json(bills)
});
;
app.get('/api/bills', (req, res) => {
    res.json(bills)
});
;
module.exports = app;