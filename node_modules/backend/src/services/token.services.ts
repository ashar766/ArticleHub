import jwt from "jsonwebtoken";

export class TokenService {
  generateAccessToken(payload: object) {
    return jwt.sign(
      payload,
      process.env.JWT_SECRET!,
      {
        expiresIn: "15m",
      }
    );
  }
}