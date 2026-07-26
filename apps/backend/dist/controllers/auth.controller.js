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
    async forgotPassword(req, res) {
        const result = await this.authService.forgotPassword(req.body.email);
        return res.json(result);
    }
    async resetPassword(req, res) {
        const result = await this.authService.resetPassword(req.body.token, req.body.password);
        return res.json(result);
    }
}
