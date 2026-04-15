import { OAuth2Client } from "google-auth-library";
import { envVars } from "../../../config/index.js";

const verifyGoogleToken = async (idToken) => {
  const client = new OAuth2Client();

  const ticket = await client.verifyIdToken({
    idToken,
    audience: envVars.client_id,
  });
  const payload = ticket.getPayload();

  return payload;
};

export default verifyGoogleToken;
