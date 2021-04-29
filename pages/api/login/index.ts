import { NextApiRequest, NextApiResponse } from 'next';
import querystring from 'querystring';
import { setCookie } from 'nookies';
import { generateRandomString } from '../../../src/utils/string';

const Login = (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const state = generateRandomString(16);

    setCookie({ res }, 'spotify_auth_state', state, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    // your application requests authorization
    const scope = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: process.env.CLIENT_ID,
        scope: scope,
        redirect_uri: process.env.REDIRECT_URI,
        state: state
      }));
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message })
  }
};

export default Login;
