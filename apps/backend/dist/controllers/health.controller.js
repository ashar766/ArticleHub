export class HealthController {
    getHealth(req, res) {
        res.status(200).json({
            success: true,
            message: "ArticleHub API is running",
        });
    }
}
