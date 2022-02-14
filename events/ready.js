const clientDetails = {
    guilds: client.guilds.cache.size,
    users: client.users.cache.size,
    ping: client.ws.ping, ms
}

const express = require('express');

const app = express();

app.get("/", (req, res) => {
    res.status(200).send('Main Page')
})

app.get("/info", (req, res) => {
    res.status(200).send()
})