const express = require("express");
const bp = require('body-parser')

const groups = {}

const app = express(); app.listen(4000, () => {
    console.log("Server running on port 4000");
});

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.get("/:groupId/:santaId", (req, res) => {
    const groupId = req.params.groupId
    const santaId = req.params.santaId

    if (!groups[groupId]) {
        res.status(404).json('No groupId like that');
        return
    }
    if (!groups[groupId][santaId]) {
        res.status(404).json('No santaId like that');
        return
    }
    res.json(groups[groupId][santaId]);
});

app.get("/:groupId", (req, res) => {
    const groupId = req.params.groupId

    if (!groups[groupId]) {
        res.status(404).json('No groupId like that');
        return
    }
    res.json(groups[groupId]);
});

app.post("/createGroup/:groupid", (req, res) => {
    const groupId = req.params.groupid

    if (groups[groupId]) {
        res.end('Group already exists');
        return
    }

    groups[groupId] = req.body
    res.end('Group created');
});
