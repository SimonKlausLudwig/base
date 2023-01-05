const express = require('express');
const app = express();
const path = require('path');


let mates = [{ "firstname": "Luca", "lastname": "Mohr", "personID": 1, "groupID": 1 }, { "firstname": "Niklas", "lastname": "Scholz", "personID": 2, "groupID": 1 }]

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

// bills api
app.get("/api/bills")

module.exports = app;