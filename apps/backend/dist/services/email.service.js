import { BrevoClient } from "@getbrevo/brevo";
const brevo = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY,
});
export class EmailService {
    async sendResetPasswordEmail(email, token) {
        await brevo.transactionalEmails.sendTransacEmail({
            sender: {
                name: process.env.BREVO_SENDER_NAME,
                email: process.env.BREVO_SENDER_EMAIL,
            },
            to: [
                {
                    email,
                },
            ],
            subject: "Reset your ArticleHub password",
            htmlContent: `
        <h2>Reset Password</h2>

        <p>You requested a password reset.</p>

        <p>Your reset token is:</p>

        <h3>${token}</h3>

        <p>This token expires in 15 minutes.</p>
      `,
        });
    }
}
