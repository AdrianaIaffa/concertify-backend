import express, { response } from 'express'
import { callbackHandler, loginHandler } from '../api/spotifyApi.js';

const spotifyRouter = express.Router();

spotifyRouter.get('/', (request, response) => {
    response.send("Hello From Concertify!")
});
spotifyRouter.get('/login', loginHandler)
spotifyRouter.get('/callback', callbackHandler)

export default spotifyRouter