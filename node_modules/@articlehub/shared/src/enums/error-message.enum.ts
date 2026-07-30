export enum Message {
  SOMETHING_WENT_WRONG = "Something went wrong",

  UNAUTHORIZED = "Unauthorized",
  FORBIDDEN = "Forbidden",
  INTERNAL_SERVER_ERROR = "Internal server error",

  INVALID_TOKEN = "Invalid token",
  INVALID_REFRESH_TOKEN = "Invalid refresh token",
  REFRESH_TOKEN_REQUIRED = "Refresh token required",
  REFRESH_TOKEN_MISMATCH = "Refresh token mismatch",

  VALIDATION_FAILED = "Validation failed",
  INVALID_REQUEST = "Invalid request",

  NOT_FOUND = "Not found",
  USER_NOT_FOUND = "User not found",
  ARTICLE_NOT_FOUND = "Article not found",
  NOTIFICATION_NOT_FOUND = "Notification not found",

  ALREADY_EXISTS = "Already exists",
  USER_ALREADY_EXISTS = "User already exists",

  INVALID_CREDENTIALS = "Invalid email or password",

  USER_CREATED_SUCCESSFULLY = "User created successfully",
  LOGIN_SUCCESSFUL = "Login successful",
  ACCESS_TOKEN_REFRESHED = "Access token refreshed",

  ARTICLE_CREATED_SUCCESSFULLY = "Article created successfully",
  ARTICLES_FETCHED_SUCCESSFULLY = "Articles fetched successfully",
  ARTICLE_FETCHED_SUCCESSFULLY = "Article fetched successfully",
  MY_ARTICLES_FETCHED_SUCCESSFULLY = "My articles fetched successfully",
  ARTICLE_UPDATED_SUCCESSFULLY = "Article updated successfully",
  ARTICLE_DELETED_SUCCESSFULLY = "Article deleted successfully",
  ARTICLE_APPROVED_SUCCESSFULLY = "Article approved successfully",
  ARTICLE_REJECTED_SUCCESSFULLY = "Article rejected successfully",

  NOTIFICATIONS_FETCHED_SUCCESSFULLY = "Notifications fetched successfully",
  NOTIFICATION_MARKED_AS_READ = "Notification marked as read",

  PASSWORD_RESET_EMAIL_SENT_SUCCESSFULLY = "Password reset email sent successfully",
  PASSWORD_RESET_SUCCESSFULLY = "Password reset successfully",
  INVALID_RESET_TOKEN = "Invalid reset token",
  RESET_TOKEN_EXPIRED = "Reset token has expired",

  REJECTION_REASON_REQUIRED = "Rejection reason is required",

  API_IS_RUNNING = "ArticleHub API is running",
}
