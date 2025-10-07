import express from 'express'

const app = express()

app.get("/ping", (req, res) => {
    res.send("pong")
})

app.listen(9090, () => {
    console.log("Server run on port: 9090");
})