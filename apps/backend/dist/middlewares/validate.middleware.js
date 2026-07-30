import { HttpStatus, Message } from "@articlehub/shared";
export const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            message: Message.VALIDATION_FAILED,
            errors: result.error.flatten().fieldErrors,
        });
    }
    req.body = result.data;
    next();
};
