import jwt from "jsonwebtoken";
import { Token } from "@articlehub/shared";

export class TokenService {
  generateAccessToken(payload: object) {
    return jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: Token.ACCESS_TOKEN_EXPIRES_IN,
    });
  }

  generateRefreshToken(payload: object) {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: Token.REFRESH_TOKEN_EXPIRES_IN,
    });
  }
}
