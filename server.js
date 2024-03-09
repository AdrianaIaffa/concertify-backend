import express  from "express";
const server = express();
const PORT = 3000;
server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))

//!-----------ROUTES --------------------

server.get("/", (request, response) => {
    response.send("Hello From Concertify")
})