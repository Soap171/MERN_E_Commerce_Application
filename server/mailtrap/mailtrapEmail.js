import { mailtrapClient, sender } from "../mailtrap/mailtrapConfig.js";
import { errorHandler } from "../utils/errorHandler.js";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "../mailtrap/emailTemplates.js";

export const sendVerificationEmail = async (email, token, next) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", token),
      category: "Verification Email",
    });

    console.log(response);
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "Internal server error"));
  }
};

export const sendWelcomeEmail = async (email, name, next) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: process.env.MAILTRAP_WELCOME_EMAIL_UUID,
      template_variables: {
        name: name,
        company_info_name: "UpTrend",
      },
    });

    console.log(response);
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "Internal server error"));
  }
};

export const sendResetPasswordEmail = async (email, resetURL, next) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Reset Password",
    });

    console.log(response);
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "Internal server error"));
  }
};

export const sendResetPasswordSuccessEmail = async (email, next) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password reset successfully",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Reset Password",
    });

    console.log(response);
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "Internal server error"));
  }
};
