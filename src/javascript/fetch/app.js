

const express = require('express');
const app = express();
const path = require('path');
const uuid4 = require('uuid4');


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
let bills = [{ "billID": "1", "contributorFirstname": "Luca", "contributorLastname": "Mohr", "amount": "13.30", "sharedWith": "Niklas Scholz", "comment": "test", "date": "2022-01-06", "groupID": 1 }, { "billID": "2", "contributorFirstname": "Niklas", "contributorLastname": "Scholz", "amount": "13.30", "sharedWith": "Luca Mohr", "comment": "Test 2", "date": "2022-01-06", "groupID": 1 }]
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
    bills.push({ billID: req.query.billID, contributorFirstname: req.query.contributorFirstname, contributorLastname: req.query.contributorLastname, amount: req.query.amount, sharedWith: req.query.sharedWith, comment: req.query.comment, date: req.query.date, groupID: req.query.groupID })
    res.send(200)
});
;
app.post('/api/bills', (req, res) => {
    res.json(bills)
});
;
app.get('/api/bills/', (req, res) => {
    //bills = bills.filter(bill => bill.billID != req.params.billID)
    res.json(bills)
});
;
app.delete("/api/bills/:billID", (req, res) => {

    bills = bills.filter(bill => bill.billID != req.params.billID)
    res.send(200);
})



// login api

let login = [{ "eMail": "luca@gmx.de", "password": "luca", "firstname": "Luca", "lastname": "Mohr", "groupID": 1, "personID": 1 }, { "eMail": "niklas@gmx.de", "password": "niklas", "firstname": "Niklas", "lastname": "Scholz", "groupID": 1, "personID": 2 }, { "eMail": "simon@gmx.de", "password": "simon", "firstname": "Simon", "lastname": "Ludwig", "groupID": 2, "personID": 3 }, { "eMail": "tobias@gmx.de", "password": "tobias", "firstname": "Tobias", "lastname": "Ludwig", "groupID": 2, "personID": 4 }]
app.post('/api/login', (req, res) => {
    res.json(login)
});
app.get('/api/login', (req, res) => {
    res.json(login)
});

// shooping list api
let shoppingList = [{ "item": "Käse", "shoppingListID": uuid4(), "amount": "2", "groupID": 1 }, { "item": "Brot", "shoppingListID": uuid4(), "amount": "1", "groupID": 1 }]
app.post('/api/shoppingList', (req, res) => {
    res.json(shoppingList)
});
app.get('/api/shoppingList', (req, res) => {
    res.json(shoppingList)
});
app.delete("/api/shoppingList/:shoppingListID", (req, res) => {

    shoppingList = shoppingList.filter(shoppingList => shoppingList.shoppingListID != req.params.shoppingListID)
    res.send(200);
})
app.put('/api/shoppingList', (req, res) => {
    shoppingList.push({ contributor: req.query.contributor, item: req.query.item, shoppingListID: req.query.shoppingListID, amount: req.query.amount, groupID: req.query.groupID })
    res.send(200)
});
module.exports = app;