// src/controllers/auth.js

import { registerUser } from '../db/services/auth';
import { loginUser } from '../db/services/auth';
import { ONE_DAY } from '../constants/index';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.json({
    status: 200,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
   const session = await loginUser(req.body);

   res.cookie('refreshToken', session.refreshToken,{
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
   });

   res.cookie('sessionId ', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
   });

   res.json({
     status: 200,
     message: 'Successfully logged in!',
     data: {
       accessToken: session.accessToken,
    },
   });
  };
