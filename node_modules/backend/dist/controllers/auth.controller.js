console.log("📦 AuthController file loaded");
import { AuthService } from "../services/auth.services.js";
export class AuthController {
    authService = new AuthService();
    async signup(req, res) {
        console.log("Controller:", req.body);
        const result = await this.authService.signup(req.body);
        return res.status(201).json(result);
    }
    async login(req, res) {
        const result = await this.authService.login(req.body);
        return res.json(result);
    }
    async profile(req, res) {
        return res.json({
            user: req.user,
        });
    }
}
