import { NextApiRequest, NextApiResponse } from 'next';
import querystring from 'querystring';
import { destroyCookie } from 'nookies';
import request from 'request';

const Callback = (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    // your application requests refresh and access tokens
    // after checking the state parameter

    const code = _req.query.code || null;
    const state = _req.query.state || null;

    const storedState = _req.cookies ? _req.cookies['spotify_auth_state'] : null;

    if (state === null || state !== storedState) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
    } else {
      destroyCookie({ res }, 'spotify_auth_state');
      const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: process.env.REDIRECT_URI,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
        },
        json: true
      };

      request.post(authOptions, function(error: any, response: any, body: any) {
        if (!error && response.statusCode === 200) {

          const access_token = body.access_token,
              refresh_token = body.refresh_token;

          const options = {
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
          };

          // use the access token to access the Spotify Web API
          request.get(options, function(error, response, body) {
            console.log({ body, error, response });
          });

          // we can also pass the token to the browser to make requests from there
          res.redirect('/#' +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token
            }));
        } else {
          res.redirect('/#' +
            querystring.stringify({
              error: 'invalid_token'
            }));
        }
      });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message })
  }
};

export default Callback;
