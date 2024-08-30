export const ERRORS: Record<string, string> = {
  ENV_VAR_NOT_FOUND:
    "Internal Server Error: Required environment configuration is missing.",
  INCORRECT_PASSWORD: "Password is not correct",
  USER_NOT_FOUND: "User not found.",
  COOKIE_NOT_FOUND: "No cookie is provided.",
  DUPLICATE_USER: "A user with this email address already exist.",
  INTERNAL_ERROR:
    "An internal server error happened, try again few moments later",
  NOT_ENOUGH_COINS: "You do not have enough coins to purchase this item, please charge your account"  
};
