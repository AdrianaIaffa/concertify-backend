import express, { response } from 'express'
const spotifyRouter = express.Router();

spotifyRouter.get('/', (request, response) => {
    response.send("Hello From Concertify!")
});

export default spotifyRouter