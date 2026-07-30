import { HttpStatus, Message } from "@articlehub/shared";
export class HealthController {
    getHealth(req, res) {
        res.status(HttpStatus.OK).json({
            success: true,
            message: Message.API_IS_RUNNING,
        });
    }
}
