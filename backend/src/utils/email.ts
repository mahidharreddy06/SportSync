import axios from "axios";

export const sendEmail = async (to: string, subject: string, text: string) => {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  // If no API Key is provided, we log it to the console for you to see
  if (!RESEND_API_KEY || RESEND_API_KEY === "your_resend_key_here") {
    console.log("-----------------------------------------");
    console.log("RESEND API KEY MISSING! Printing OTP to console:");
    console.log(`TO: ${to}`);
    console.log(`SUBJECT: ${subject}`);
    console.log(`BODY: ${text}`);
    console.log("-----------------------------------------");
    return true;
  }

  try {
    // We send a direct request to Resend.com
    await axios.post(
      "https://api.resend.com/emails",
      {
        from: "SportSync <onboarding@resend.dev>",
        to: [to],
        subject: subject,
        text: text,
      },
      {
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return true;
  } catch (error: any) {
    console.error("Resend API Error (Falling back to console):", error.response?.data || error.message);
    console.log("-----------------------------------------");
    console.log(`FALLBACK OTP FOR: ${to}`);
    console.log(`BODY: ${text}`);
    console.log("-----------------------------------------");
    // We return true so the frontend doesn't show an error, 
    // and the dev can just look at the terminal for the code.
    return true; 
  }
};
