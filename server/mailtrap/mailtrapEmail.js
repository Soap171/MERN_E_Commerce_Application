import { mailtrapClient, sender } from "../mailtrap/mailtrapConfig.js";
import { errorHandler } from "../utils/errorHandler.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "../mailtrap/emailTemplates.js";

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
