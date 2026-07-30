import { HttpStatus, Message } from "@articlehub/shared";
export const authorize = (role) => (req, res, next) => {
    if (!req.user) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            message: Message.UNAUTHORIZED,
        });
    }
    if (req.user.role !== role) {
        return res.status(HttpStatus.FORBIDDEN).json({
            message: Message.FORBIDDEN,
        });
    }
    next();
};
