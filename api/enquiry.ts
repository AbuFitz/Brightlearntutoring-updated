import { Resend } from "resend";

export const config = { runtime: "edge" };

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAIL = "info@brightlearntutoring.co.uk";
const FROM_ADDRESS = "BrightLearn <noreply@brightlearntutoring.co.uk>";
const SITE_URL = "https://www.brightlearntutoring.co.uk";

const LOGO_SVG = `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="8" fill="#ffffff"/><path d="M6 22l7-7-7-7v14zm10-14v14l11-7-11-7z" fill="#111111"/></svg>`;

interface EnquiryPayload {
  "Enquiry type": string;
  "Student name": string;
  "Year group": string;
  "Support needed": string;
  "Session type": string;
  "Current grade"?: string;
  "Target grade"?: string;
  "Exam board"?: string;
  "Additional notes"?: string;
  "Contact name": string;
  "Contact email": string;
  "Contact phone": string;
  "Preferred contact": string;
}

function shell(body: string, preview: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><meta name="color-scheme" content="light"/></head>
<body style="margin:0;padding:0;background:#f2f1ed;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
<div style="display:none;max-height:0;overflow:hidden;">${preview}</div>
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f2f1ed;">
  <tr><td align="center" style="padding:32px 16px 48px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

      <!-- Header -->
      <tr><td style="background:#1a1a1a;border-radius:16px 16px 0 0;padding:22px 28px;">
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="padding-right:12px;vertical-align:middle;">${LOGO_SVG}</td>
          <td style="vertical-align:middle;">
            <div style="color:#fff;font-size:15px;font-weight:700;line-height:1;letter-spacing:-0.01em;">BrightLearn</div>
            <div style="color:rgba(255,255,255,0.4);font-size:11px;margin-top:3px;">www.brightlearntutoring.co.uk</div>
          </td>
        </tr></table>
      </td></tr>

      <!-- Card -->
      <tr><td style="background:#fff;border:1px solid #e6e3db;border-top:none;border-radius:0 0 16px 16px;padding:32px 28px;">
        ${body}
      </td></tr>

      <!-- Footer -->
      <tr><td style="padding:20px 8px 0;text-align:center;">
        <p style="margin:0;font-size:11px;color:#b0aa9e;line-height:1.8;">BrightLearn Tutoring &nbsp;·&nbsp; <a href="mailto:${ADMIN_EMAIL}" style="color:#b0aa9e;text-decoration:none;">${ADMIN_EMAIL}</a></p>
        <p style="margin:4px 0 0;font-size:11px;color:#b0aa9e;">${preview}</p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body></html>`;
}

function row(label: string, value?: string): string {
  if (!value || value === "—") return "";
  return `<tr>
    <td style="padding:9px 16px;font-size:12px;color:#9b9488;width:130px;vertical-align:top;white-space:nowrap;border-bottom:1px solid #f0ede6;">${label}</td>
    <td style="padding:9px 16px;font-size:12px;color:#1a1a1a;font-weight:500;word-break:break-word;border-bottom:1px solid #f0ede6;">${value}</td>
  </tr>`;
}

function sect(title: string, rows: string): string {
  if (!rows.trim()) return "";
  return `<table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e6e3db;border-radius:10px;overflow:hidden;margin-bottom:14px;">
    <tr><td colspan="2" style="background:#f7f6f2;padding:8px 16px;border-bottom:1px solid #e6e3db;">
      <span style="font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:#9b9488;">${title}</span>
    </td></tr>
    ${rows}
  </table>`;
}

function buildAdminHtml(d: EnquiryPayload): string {
  const replyEmail = d["Contact email"] !== "—" ? d["Contact email"] : "";
  const replyName = d["Contact name"] !== "—" ? d["Contact name"].split(" ")[0] : d["Student name"].split(" ")[0];

  const body = `
    <table cellpadding="0" cellspacing="0" style="margin-bottom:18px;"><tr>
      <td style="background:#dbeafe;color:#1d4ed8;font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;padding:5px 12px;border-radius:100px;">New enquiry</td>
    </tr></table>
    <h1 style="margin:0 0 6px;font-size:20px;font-weight:700;color:#1a1a1a;line-height:1.25;letter-spacing:-0.02em;">New tutoring enquiry received</h1>
    <p style="margin:0 0 24px;font-size:13px;color:#6b6560;line-height:1.65;">Submitted via the BrightLearn website. Please respond within <strong>1 working day</strong>.</p>

    ${sect("Enquiry type", row("Submitted by", d["Enquiry type"]))}
    ${sect("Student details",
      row("Name", d["Student name"]) +
      row("Year group", d["Year group"])
    )}
    ${sect("Support needed",
      row("Support", d["Support needed"]) +
      row("Session type", d["Session type"])
    )}
    ${sect("Current level",
      row("Current grade", d["Current grade"]) +
      row("Target grade", d["Target grade"]) +
      row("Exam board", d["Exam board"])
    )}
    ${sect("Anything else", row("Notes", d["Additional notes"]))}
    ${sect("Contact details",
      row("Name", d["Contact name"]) +
      row("Email", `<a href="mailto:${d["Contact email"]}" style="color:#2563eb;text-decoration:none;">${d["Contact email"]}</a>`) +
      row("Phone", `<a href="tel:${d["Contact phone"]}" style="color:#2563eb;text-decoration:none;">${d["Contact phone"]}</a>`) +
      row("Preferred contact", d["Preferred contact"])
    )}

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f6f2;border-radius:12px;margin-top:8px;">
      <tr><td style="padding:20px 24px;text-align:center;">
        <p style="margin:0 0 14px;font-size:13px;color:#6b6560;">Hit reply or click below to respond to this enquiry directly.</p>
        <a href="mailto:${replyEmail}" style="display:inline-block;background:#1a1a1a;color:#fff;font-size:13px;font-weight:600;padding:11px 28px;border-radius:100px;text-decoration:none;">Reply to ${replyName}</a>
      </td></tr>
    </table>
  `;
  return shell(body, "Sent automatically when a form was submitted on www.brightlearntutoring.co.uk");
}

function buildConfirmationHtml(d: EnquiryPayload): string {
  const firstName = (d["Contact name"] !== "—" ? d["Contact name"] : d["Student name"]).trim().split(" ")[0];

  const body = `
    <table cellpadding="0" cellspacing="0" style="margin-bottom:18px;"><tr>
      <td style="background:#dcfce7;color:#166534;font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;padding:5px 12px;border-radius:100px;">Enquiry received</td>
    </tr></table>
    <h1 style="margin:0 0 6px;font-size:20px;font-weight:700;color:#1a1a1a;line-height:1.25;letter-spacing:-0.02em;">Thank you, ${firstName} — we've received your enquiry</h1>
    <p style="margin:0 0 24px;font-size:13px;color:#6b6560;line-height:1.65;">A member of BrightLearn Tutoring will review the details below and contact you to discuss tuition, current availability and the next steps — including arranging a free introductory session.</p>

    ${sect("Enquiry type", row("Submitted by", d["Enquiry type"]))}
    ${sect("Student details",
      row("Name", d["Student name"]) +
      row("Year group", d["Year group"])
    )}
    ${sect("Support needed",
      row("Support", d["Support needed"]) +
      row("Session type", d["Session type"])
    )}
    ${sect("Current level",
      row("Current grade", d["Current grade"]) +
      row("Target grade", d["Target grade"]) +
      row("Exam board", d["Exam board"])
    )}
    ${sect("Anything else", row("Notes", d["Additional notes"]))}
    ${sect("Contact details",
      row("Name", d["Contact name"]) +
      row("Email", d["Contact email"]) +
      row("Phone", d["Contact phone"]) +
      row("Preferred contact", d["Preferred contact"])
    )}

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f6f2;border-radius:12px;margin-top:8px;">
      <tr><td style="padding:20px 24px;text-align:center;">
        <p style="margin:0 0 14px;font-size:13px;color:#6b6560;">If you need to add anything else, just reply to this email and we'll help.</p>
        <table cellpadding="0" cellspacing="0" role="presentation" style="margin:0 auto;"><tr>
          <td style="padding-right:10px;">
            <a href="mailto:${ADMIN_EMAIL}" style="display:inline-block;background:#111111;color:#ffffff;font-size:13px;font-weight:700;padding:12px 26px;border-radius:100px;text-decoration:none;">Reply by email</a>
          </td>
          <td>
            <a href="${SITE_URL}" style="display:inline-block;background:#ffffff;color:#111111;font-size:13px;font-weight:700;padding:12px 26px;border-radius:100px;border:1px solid #e6e3db;text-decoration:none;">Visit website</a>
          </td>
        </tr></table>
      </td></tr>
    </table>
  `;
  return shell(body, "We've received your BrightLearn enquiry and will be in touch to discuss next steps.");
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let data: EnquiryPayload;
  try {
    data = (await req.json()) as EnquiryPayload;
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const contactEmail = data["Contact email"] && data["Contact email"] !== "—" ? data["Contact email"] : null;
  const fromName = data["Contact name"] !== "—" ? data["Contact name"] : data["Student name"];

  try {
    // Admin notification
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: [ADMIN_EMAIL],
      replyTo: contactEmail ? [contactEmail] : undefined,
      subject: `New tutoring enquiry from ${fromName} — BrightLearn`,
      html: buildAdminHtml(data),
    });

    // Customer confirmation
    if (contactEmail) {
      await resend.emails.send({
        from: FROM_ADDRESS,
        to: [contactEmail],
        replyTo: [ADMIN_EMAIL],
        subject: `We've received your enquiry`,
        html: buildConfirmationHtml(data),
      });
    }
  } catch (err) {
    console.error("Resend error:", err);
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
