import dotenv from 'dotenv';
import queryString from 'query-string';
import { generateRandomString } from '../utils/helpers.js';
import axios from 'axios';

//! variables
dotenv.config();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI


// * LOGIN
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

// * CALLBACK
export const callbackHandler = (req, res) => {
    // res.send('callback')

    const code = req.query.code || null;

    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: queryString.stringify({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: REDIRECT_URI
        }),
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
      })
      .then(response => {
        if (response.status === 200) {
    
          const { access_token, token_type } = response.data;
    
          axios.get('https://api.spotify.com/v1/me', {
            headers: {
              Authorization: `${token_type} ${access_token}`
            }
          })
            .then(response => {
              res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
            })
            .catch(error => {
              res.send(error);
            });
    
        } else {
          res.send(response);
        }
      })
      .catch(error => {
        res.send(error);
      });
}

export const refreshTokenHandler = (req, res) => {
    const { refresh_token } = req.query;

    axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      },
    })
      .then(response => {
        res.send(response.data);
      })
      .catch(error => {
        res.send(error);
      });
    }