import db from '$utils/database';
import cookie from 'cookie-esm';
import jwt from 'jsonwebtoken';

function getUserFromJwtToken(cookieString){
  const { jwt_token } = cookie.parse(cookieString);
  if(!jwt_token) return null;

  try {
    const user = jwt.verify(jwt_token, process.env.JWT_PRIVATE_KEY);
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }

}

export { 
  getUserFromJwtToken
}