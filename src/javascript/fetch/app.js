import { v4 as uuid } from 'uuid';

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
let bills = [{ "contributor": "Luca", "amount": -13.30, "sharedWith": ["Luca", "Niklas"] }]
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
app.put("/api/bills", (req, res) => {
    let uuid = uuid()
    bills.push({ billID: uuid, contributor: req.contributor, amount: req.amount, sharedWith: req.sharedWith, comment: req.comment });
    res.send(200);
})
app.get('/api/bills', (req, res) => res.json(bills));
app.delete(app.delete("/api/mates/:billID", (req, res) => {
    mates.filter(bill => bill.billID === req.params.billID)
    res.send(200);
}))
app.post("/api/bills")
app.put("/api/bills", (req, res) => {
    let uuid = uuid()
    bills.push({ billID: uuid, contributor: "Luca", amount: -20, sharedWith: "Niklas", comment: "Test" });
    res.send(200);
})
module.exports = app;