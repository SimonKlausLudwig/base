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
/*
app.post("/api/employee", (req, res) => {
    employees.push({ id: "2", name: req.query.name });
    res.send(200);
})
app.get('/api/employees', (req, res) => res.json(employees));
app.get('/api/employee/:emplId', (req, res) => {
    const matchingEmployees = employees.filter(a => a.id === req.params.emplId);
    if (matchingEmployees.length <= 0) {
        res.send(404);
    }
    res.json(matchingEmployees[0])
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});
*/
/*
app.post("/api/employee", (req, res) => {
    mates.push({ firstname: "Tim", lastname: "Mayer", personID: 3 });
    res.send(200);
})
*/
//app.get('/api/employees', (req, res) => res.json(mates));
/*
app.get('/api/employee/:mateID', (req, res) => {
    const matchingEmployees = mates.filter(a => a.id === req.params.mateID);
    if (matchingEmployees.length <= 0) {
        res.send(404);
    }
    res.json(matchingEmployees[0])
});
*/
app.get('/api/mates', (req, res) => res.json(mates));
//app.get('/', (req, res) => {
//    res.sendFile(path.join(__dirname, '/index.html'));
//});
/*
app.put("/api/mates", (req, res) => {
    mates.push({ firstname: "Tim", lastname: "Mayer", personID: 3, groupID: 4 });
    res.send(200);
})
*/
app.delete("/api/mates/:mateID", (req, res) => {

    mates.filter(mate => mate.personID === req.params.mateID)
    res.send(200);
})
app.put("/api/bills", (req, res) => {
    bills.push({ contributor: "Tim", amount: -20.00, sharedWith: ["Luca", "Niklas"] });
    res.send(200);
})
app.get('/api/bills', (req, res) => res.json(bills));

module.exports = app;