import dotenv from 'dotenv';
import queryString from 'query-string';
import { generateRandomString } from '../utils/helpers.js';

// //! variables
dotenv.config();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI

const stateKey = 'spotify_auth_state';

export const loginHandler = (req, res) => {

    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    const scope = 'user-read-private user-read-email';

    const queryParams = queryString.stringify({
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        state: state,
        scope: scope,
    });
    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
}

