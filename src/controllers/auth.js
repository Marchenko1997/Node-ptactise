// src/controllers/auth.js

import { registerUser } from '../db/services/auth.js';
import { loginUser } from '../db/services/auth.js';
import { logOutUser } from '../db/services/auth.js';
import { ONE_DAY } from '../constants/index.js';
import { refreshUsersSession, requestResetToken, resetPassword } from '../db/services/auth.js';

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

  export const lodOutUserController = async (req, res) => {
    if(req.cookies.sessionId) {
      await logOutUser(req.cookies.sessionId);
    }

    res.clearCookie(`refreshToken`);
    res.clearCookie(`sessionId`);

    res.status(204).send();
  };

  const setupSession = (res, session) => {
    res.cookie('refreshToken', session.refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + ONE_DAY),
    });
    res.cookie('sessionId', session._id, {
      httpOnly: true,
      expires: new Date(Date.now() + ONE_DAY),
    });
  };

  export const refreshUserSessionController = async (req, res) => {
    const session = await refreshUsersSession({
      sessionId: req.cookies.sessionId,
      refreshToken: req.cookies.refreshToken,
    });

    setupSession(res, session);

    res.json({
      status: 200,
      message: 'Successfully refreshed a session!',
      data: {
        accessToken: session.accessToken,
      },
    });
  };

  export const requestResetEmailController = async (req, res) => {
    await requestResetToken(req.body.email);
    res.json({
      message: 'Reset password email was successfully sent!',
      status: 200,
      data: {},
    });
  };

  export const resetPasswordController = async (req, res) => {
    await resetPassword(req.body);
    res.json({
      message: 'Password was successfully reset!',
      status: 200,
      data: {},
    });
  };
