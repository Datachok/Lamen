import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    console.log("[v0] Contact API called");
    const body = await request.json();
    const { name, email, subject, message } = body;

    console.log("[v0] Received data:", { name, email, subject });

    // Validation
    if (!name || !email || !subject || !message) {
      console.log("[v0] Validation failed: missing fields");
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("[v0] Validation failed: invalid email");
      return NextResponse.json(
        { error: "Email invalide" },
        { status: 400 }
      );
    }

    // Step 1: Create a broadcast targeting the audience
    const audienceId = "a883138f-ff78-4147-8c2a-12a4c9a6dd56";
    const fromEmail = process.env.RESEND_FROM_EMAIL || "contact@datachok.io";

    console.log("[v0] Creating broadcast for audience:", audienceId);
    console.log("[v0] From:", fromEmail);
    console.log("[v0] API Key present:", !!process.env.RESEND_API_KEY);

    const broadcast = await resend.broadcasts.create({
      audienceId,
      from: fromEmail,
      replyTo: email,
      subject: `[Contact Lamen] ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #5ce1e6 0%, #c1ff72 100%);
                padding: 30px;
                border-radius: 12px;
                text-align: center;
                margin-bottom: 30px;
              }
              .header h1 {
                color: #1a1a1a;
                margin: 0;
                font-size: 24px;
              }
              .content {
                background: #f9f9f9;
                padding: 30px;
                border-radius: 12px;
                margin-bottom: 20px;
              }
              .field {
                margin-bottom: 20px;
              }
              .field-label {
                font-weight: 600;
                color: #666;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 5px;
              }
              .field-value {
                color: #1a1a1a;
                font-size: 16px;
              }
              .message-box {
                background: white;
                padding: 20px;
                border-radius: 8px;
                border-left: 4px solid #5ce1e6;
              }
              .footer {
                text-align: center;
                color: #999;
                font-size: 14px;
                padding-top: 20px;
                border-top: 1px solid #eee;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>📧 Nouveau message de contact</h1>
            </div>
            
            <div class="content">
              <div class="field">
                <div class="field-label">Nom</div>
                <div class="field-value">${name}</div>
              </div>
              
              <div class="field">
                <div class="field-label">Email</div>
                <div class="field-value"><a href="mailto:${email}">${email}</a></div>
              </div>
              
              <div class="field">
                <div class="field-label">Sujet</div>
                <div class="field-value">${subject}</div>
              </div>
              
              <div class="field">
                <div class="field-label">Message</div>
                <div class="message-box">
                  ${message.replace(/\n/g, "<br>")}
                </div>
              </div>
            </div>
            
            <div class="footer">
              <p>Ce message a été envoyé depuis le formulaire de contact de Lamen</p>
            </div>
          </body>
        </html>
      `,
    });

    console.log("[v0] Broadcast created:", broadcast);

    if (broadcast.error) {
      console.error("[v0] Broadcast creation error:", broadcast.error);
      return NextResponse.json(
        { error: "Erreur lors de la creation du broadcast." },
        { status: 500 }
      );
    }

    // Step 2: Send the broadcast
    const sendResult = await resend.broadcasts.send(broadcast.data!.id);

    console.log("[v0] Broadcast sent:", sendResult);

    if (sendResult.error) {
      console.error("[v0] Broadcast send error:", sendResult.error);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi du broadcast." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data: sendResult.data },
      { status: 200 }
    );
  } catch (error) {
    console.error("[v0] Error sending email:", error);
    console.error("[v0] Error details:", JSON.stringify(error, null, 2));
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message. Veuillez réessayer." },
      { status: 500 }
    );
  }
}
