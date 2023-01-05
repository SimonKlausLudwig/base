const express = require('express');
const app = express();
const path = require('path');

let employees = [
    { id: "1", name: "Simon Ludwig" }
]

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

module.exports = app;