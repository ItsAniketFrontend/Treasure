import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);


export default async function handler(req, res) {
  // ✅ CORS (for local dev)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const { email, phone, message } = body;

    // ✅ Basic validation
    if (!email || !message) {
      return res.status(400).json({
        success: false,
        message: "Email and message are required",
      });
    }

    // 📩 Send email
    const response = await resend.emails.send({
      // from: "Treasure <onboarding@resend.dev>",
      from: "Treasure <no-reply@katewacompanies.in>",

      to: "admin@katewacompanies.in",

      subject: "New Enquiry Submission",

      html: `
            <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
              
              <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
                
                <!-- Header -->
                <div style="background: #d2ad41; color: #ffffff; padding: 20px;">
                  <h2 style="margin: 0;">New Enquiry Received</h2>
                </div>

                <!-- Body -->
                <div style="padding: 20px; color: #333;">
                  
                  <p style="margin-bottom: 15px;">You have received a new message from your website contact form.</p>

                  <div style="margin-bottom: 15px;">
                    <p style="margin: 5px 0;"><strong>Email:</strong></p>
                    <p style="margin: 0; background: #f1f5f9; padding: 10px; border-radius: 6px;">${email}</p>
                  </div>

                  <div style="margin-bottom: 15px;">
                    <p style="margin: 5px 0;"><strong>Phone:</strong></p>
                    <p style="margin: 0; background: #f1f5f9; padding: 10px; border-radius: 6px;">
                      ${phone || "N/A"}
                    </p>
                  </div>

                  <div style="margin-bottom: 15px;">
                    <p style="margin: 5px 0;"><strong>Message:</strong></p>
                    <p style="margin: 0; background: #f1f5f9; padding: 12px; border-radius: 6px; line-height: 1.5;">
                      ${message}
                    </p>
                  </div>

                </div>

                <!-- Footer -->
                <div style="background: #f9fafb; padding: 15px; text-align: center; font-size: 12px; color: #888;">
                  <p style="margin: 0;">© ${new Date().getFullYear()} Treasure. All rights reserved.</p>
                </div>

              </div>
              
            </div>
          `
    });

    // ❌ Handle Resend error
    if (response.error) {
      console.error("❌ Resend Error:", response.error);

      return res.status(500).json({
        success: false,
        message: response.error.message,
      });
    }

    console.log("✅ Email sent:", response.data);

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });

  } catch (error) {
    console.error("❌ SERVER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
}