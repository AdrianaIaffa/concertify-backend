import express, { response } from 'express'
import { loginHandler } from '../api/spotifyApi.js';

const spotifyRouter = express.Router();

spotifyRouter.get('/', (request, response) => {
    response.send("Hello From Concertify!")
});
spotifyRouter.get('/login', loginHandler)

export default spotifyRouter