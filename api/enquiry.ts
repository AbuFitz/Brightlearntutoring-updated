import { Resend } from "resend";

export const config = { runtime: "edge" };

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAIL = "info@brightlearntutoring.co.uk";
const FROM_ADDRESS = "BrightLearn <noreply@brightlearntutoring.co.uk>";

const LOGO_SVG = `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="8" fill="#ffffff"/><path d="M6 22l7-7-7-7v14zm10-14v14l11-7-11-7z" fill="#1a1a1a"/></svg>`;

interface EnquiryPayload {
  "Enquiry type": string;
  "Parent name": string;
  "Parent email": string;
  "Parent phone": string;
  "Preferred contact": string;
  "Student name": string;
  "Student email"?: string;
  "Student phone"?: string;
  Programme: string;
  "Year group": string;
  "Help needed": string;
  "Current grade"?: string;
  "Target grade"?: string;
  "Additional notes"?: string;
  "Preferred days": string;
  "Preferred times": string;
  "Availability notes"?: string;
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
            <div style="color:rgba(255,255,255,0.4);font-size:11px;margin-top:3px;">brightlearntutoring.co.uk</div>
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

function step(num: string, color: string, text: string, sub: string): string {
  return `<tr style="border-top:${num === "1" ? "none" : "1px solid #f0ede6"};">
    <td style="padding:14px 16px;">
      <table cellpadding="0" cellspacing="0"><tr>
        <td style="width:28px;vertical-align:top;padding-right:10px;">
          <div style="width:24px;height:24px;background:${color.split("|")[0]};border-radius:50%;text-align:center;line-height:24px;font-size:11px;font-weight:800;color:${color.split("|")[1]};">${num}</div>
        </td>
        <td style="vertical-align:top;">
          <div style="font-size:13px;font-weight:600;color:#1a1a1a;">${text}</div>
          <div style="font-size:12px;color:#6b6560;margin-top:2px;">${sub}</div>
        </td>
      </tr></table>
    </td>
  </tr>`;
}

function buildAdminHtml(d: EnquiryPayload): string {
  const replyEmail = d["Parent email"] !== "—" ? d["Parent email"] : d["Student email"] ?? "";
  const replyName = d["Parent name"] !== "—" ? d["Parent name"].split(" ")[0] : d["Student name"].split(" ")[0];

  const body = `
    <table cellpadding="0" cellspacing="0" style="margin-bottom:18px;"><tr>
      <td style="background:#dbeafe;color:#1d4ed8;font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;padding:5px 12px;border-radius:100px;">New enquiry</td>
    </tr></table>
    <h1 style="margin:0 0 6px;font-size:20px;font-weight:700;color:#1a1a1a;line-height:1.25;letter-spacing:-0.02em;">New tutoring enquiry received</h1>
    <p style="margin:0 0 24px;font-size:13px;color:#6b6560;line-height:1.65;">Submitted via the BrightLearn website. Please respond within <strong>1 working day</strong>.</p>

    ${sect("Enquiry type", row("Submitted by", d["Enquiry type"]))}
    ${sect(d["Enquiry type"] === "Student" ? "Parent / Guardian" : "Contact details",
      row("Name", d["Parent name"]) +
      row("Email", `<a href="mailto:${d["Parent email"]}" style="color:#2563eb;text-decoration:none;">${d["Parent email"]}</a>`) +
      row("Phone", `<a href="tel:${d["Parent phone"]}" style="color:#2563eb;text-decoration:none;">${d["Parent phone"]}</a>`) +
      row("Preferred contact", d["Preferred contact"])
    )}
    ${sect("Student details",
      row("Name", d["Student name"]) +
      (d["Student email"] ? row("Email", d["Student email"]) : "") +
      (d["Student phone"] ? row("Phone", d["Student phone"]) : "") +
      row("Programme", d["Programme"]) +
      row("Year group", d["Year group"])
    )}
    ${sect("Learning needs",
      row("Help needed", d["Help needed"]) +
      row("Current grade", d["Current grade"]) +
      row("Target grade", d["Target grade"]) +
      row("Notes", d["Additional notes"])
    )}
    ${sect("Availability",
      row("Days", d["Preferred days"]) +
      row("Times", d["Preferred times"]) +
      row("Notes", d["Availability notes"])
    )}

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f6f2;border-radius:12px;margin-top:8px;">
      <tr><td style="padding:20px 24px;text-align:center;">
        <p style="margin:0 0 14px;font-size:13px;color:#6b6560;">Hit reply or click below to respond to this enquiry directly.</p>
        <a href="mailto:${replyEmail}" style="display:inline-block;background:#1a1a1a;color:#fff;font-size:13px;font-weight:600;padding:11px 28px;border-radius:100px;text-decoration:none;">Reply to ${replyName} &rarr;</a>
      </td></tr>
    </table>
  `;
  return shell(body, "Sent automatically when a form was submitted on brightlearntutoring.co.uk");
}

function buildConfirmationHtml(d: EnquiryPayload): string {
  const firstName = (d["Parent name"] !== "—" ? d["Parent name"] : d["Student name"]).trim().split(" ")[0];
  const contactMethod = d["Preferred contact"] !== "—" ? d["Preferred contact"] : "email or phone";
  const programme = d["Programme"] || "Maths Tutoring";

  const progAccent =
    programme.includes("KS2") ? { bg: "#dbeafe", text: "#1d4ed8", bar: "#3b82f6", num: "#eff6ff", numText: "#1d4ed8" }
    : programme.includes("KS3") ? { bg: "#d1fae5", text: "#065f46", bar: "#10b981", num: "#ecfdf5", numText: "#065f46" }
    : { bg: "#ede9fe", text: "#5b21b6", bar: "#7c3aed", num: "#f5f3ff", numText: "#5b21b6" };

  const summaryRows: string[] = [];
  const pairs: [string, string | undefined][] = [
    ["Programme", d["Programme"]],
    ["Year group", d["Year group"]],
    ["Preferred days", d["Preferred days"]],
    ["Preferred times", d["Preferred times"]],
  ];
  pairs.forEach(([label, val], i) => {
    if (!val || val === "—") return;
    const borderTop = i === 0 ? "" : "border-top:1px solid #ede9e2;";
    const valueCell = label === "Programme"
      ? `<span style="display:inline-block;background:${progAccent.bg};color:${progAccent.text};font-size:11px;font-weight:700;padding:3px 11px;border-radius:100px;">${val}</span>`
      : `<span style="font-size:13px;font-weight:600;color:#111111;">${val}</span>`;
    summaryRows.push(`<tr>
      <td style="padding:10px 0;font-size:12px;color:#9b9488;width:130px;${borderTop}">${label}</td>
      <td style="padding:10px 0;${borderTop}">${valueCell}</td>
    </tr>`);
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <meta name="color-scheme" content="light"/>
  <title>Enquiry confirmed — BrightLearn Tutoring</title>
</head>
<body style="margin:0;padding:0;background:#f4f2ee;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">

<div style="display:none;max-height:0;overflow:hidden;font-size:1px;color:#f4f2ee;">Thanks ${firstName} — your BrightLearn enquiry is confirmed. We'll be in touch within 1 working day. &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>

<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f4f2ee;">
<tr><td align="center" style="padding:36px 16px 56px;">
<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:560px;">

  <!-- ━━━━━━━━━━━━━━━━━━ HEADER ━━━━━━━━━━━━━━━━━━ -->
  <tr><td style="background:#111111;border-radius:20px 20px 0 0;padding:22px 32px;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td style="vertical-align:middle;">
          <table cellpadding="0" cellspacing="0" role="presentation"><tr>
            <!-- Logo mark -->
            <td style="vertical-align:middle;padding-right:11px;">
              <div style="width:38px;height:38px;background:rgba(255,255,255,0.1);border-radius:9px;text-align:center;line-height:0;padding-top:8px;box-sizing:border-box;">
                <svg width="22" height="22" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 23 L13 16 L5 9 Z M15 9 L15 23 L27 16 Z" fill="#ffffff"/>
                </svg>
              </div>
            </td>
            <!-- Wordmark -->
            <td style="vertical-align:middle;">
              <div style="color:#ffffff;font-size:16px;font-weight:800;letter-spacing:-0.025em;line-height:1;">BrightLearn</div>
              <div style="color:rgba(255,255,255,0.38);font-size:10px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;margin-top:3px;">Tutoring</div>
            </td>
          </tr></table>
        </td>
        <td style="text-align:right;vertical-align:middle;">
          <div style="display:inline-block;background:rgba(52,211,153,0.15);border:1px solid rgba(52,211,153,0.3);border-radius:100px;padding:5px 11px;">
            <span style="color:#34d399;font-size:10px;font-weight:700;letter-spacing:0.05em;">&#10003; DBS CHECKED</span>
          </div>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- Coloured accent bar -->
  <tr><td style="background:#111111;padding:0 32px 0;">
    <div style="height:3px;background:${progAccent.bar};border-radius:0 0 3px 3px;"></div>
  </td></tr>

  <!-- ━━━━━━━━━━━━━━━━━━ HERO ━━━━━━━━━━━━━━━━━━ -->
  <tr><td style="background:#ffffff;padding:36px 32px 30px;">
    <p style="margin:0 0 18px;">
      <span style="display:inline-block;background:${progAccent.bg};color:${progAccent.text};font-size:10px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;padding:5px 14px;border-radius:100px;">${programme}</span>
    </p>
    <h1 style="margin:0 0 12px;font-size:28px;font-weight:800;color:#111111;line-height:1.2;letter-spacing:-0.03em;">Thanks, ${firstName}!<br/>Your enquiry is confirmed &#10003;</h1>
    <p style="margin:0;font-size:14px;color:#6b6560;line-height:1.75;">We'll be in touch within <strong style="color:#111111;">1 working day</strong> — usually much sooner. No commitment needed at this stage.</p>
  </td></tr>

  <!-- Divider -->
  <tr><td style="background:#ffffff;padding:0 32px;"><div style="height:1px;background:#f0ede6;"></div></td></tr>

  <!-- ━━━━━━━━━━━━━━━━━━ WHAT HAPPENS NEXT ━━━━━━━━━━━━━━━━━━ -->
  <tr><td style="background:#ffffff;padding:28px 32px 32px;">

    <p style="margin:0 0 22px;font-size:10px;font-weight:800;color:#b0aa9e;letter-spacing:0.14em;text-transform:uppercase;">What happens next</p>

    <!-- Step 1 -->
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:10px;">
      <tr>
        <td style="vertical-align:top;padding-right:16px;width:36px;">
          <div style="width:36px;height:36px;background:#eff6ff;border-radius:50%;text-align:center;line-height:36px;font-size:13px;font-weight:800;color:#2563eb;">1</div>
        </td>
        <td style="vertical-align:middle;border-bottom:1px solid #f4f1eb;padding:0 0 20px;">
          <div style="font-size:14px;font-weight:700;color:#111111;margin-bottom:3px;">We review your enquiry</div>
          <div style="font-size:13px;color:#9b9488;">Usually within a few hours of receiving it</div>
        </td>
      </tr>
    </table>

    <!-- Step 2 -->
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:10px;">
      <tr>
        <td style="vertical-align:top;padding-right:16px;width:36px;">
          <div style="width:36px;height:36px;background:#ecfdf5;border-radius:50%;text-align:center;line-height:36px;font-size:13px;font-weight:800;color:#059669;">2</div>
        </td>
        <td style="vertical-align:middle;border-bottom:1px solid #f4f1eb;padding:0 0 20px;">
          <div style="font-size:14px;font-weight:700;color:#111111;margin-bottom:3px;">We contact you via ${contactMethod}</div>
          <div style="font-size:13px;color:#9b9488;">To discuss your child's needs and confirm a suitable session slot</div>
        </td>
      </tr>
    </table>

    <!-- Step 3 -->
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td style="vertical-align:top;padding-right:16px;width:36px;">
          <div style="width:36px;height:36px;background:#f5f3ff;border-radius:50%;text-align:center;line-height:36px;font-size:13px;font-weight:800;color:#7c3aed;">3</div>
        </td>
        <td style="vertical-align:middle;padding-bottom:4px;">
          <div style="font-size:14px;font-weight:700;color:#111111;margin-bottom:3px;">Your sessions begin</div>
          <div style="font-size:13px;color:#9b9488;">Live online group sessions &nbsp;&middot;&nbsp; No contracts &nbsp;&middot;&nbsp; Cancel any time</div>
        </td>
      </tr>
    </table>

  </td></tr>

  <!-- ━━━━━━━━━━━━━━━━━━ SUMMARY ━━━━━━━━━━━━━━━━━━ -->
  ${summaryRows.length ? `<tr><td style="background:#f9f8f5;border-top:1px solid #e9e6de;border-bottom:1px solid #e9e6de;padding:24px 32px;">
    <p style="margin:0 0 14px;font-size:10px;font-weight:800;color:#b0aa9e;letter-spacing:0.14em;text-transform:uppercase;">Your enquiry summary</p>
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      ${summaryRows.join("")}
    </table>
  </td></tr>` : ""}

  <!-- ━━━━━━━━━━━━━━━━━━ CTA ━━━━━━━━━━━━━━━━━━ -->
  <tr><td style="background:#ffffff;padding:28px 32px 32px;border-radius:0 0 20px 20px;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f9f8f5;border-radius:14px;border:1px solid #e9e6de;">
      <tr><td style="padding:24px 26px;">
        <p style="margin:0 0 6px;font-size:15px;font-weight:700;color:#111111;">Got questions in the meantime?</p>
        <p style="margin:0 0 20px;font-size:13px;color:#6b6560;line-height:1.65;">We're happy to help — just drop us an email or visit the website.</p>
        <table cellpadding="0" cellspacing="0" role="presentation"><tr>
          <td style="padding-right:10px;">
            <a href="mailto:${ADMIN_EMAIL}" style="display:inline-block;background:#111111;color:#ffffff;font-size:13px;font-weight:700;padding:12px 24px;border-radius:100px;text-decoration:none;letter-spacing:-0.01em;">Email us</a>
          </td>
          <td>
            <a href="https://brightlearntutoring.co.uk" style="display:inline-block;background:#ffffff;color:#111111;font-size:13px;font-weight:700;padding:11px 22px;border-radius:100px;text-decoration:none;border:1px solid #d6d2c9;letter-spacing:-0.01em;">Visit website</a>
          </td>
        </tr></table>
      </td></tr>
    </table>
  </td></tr>

  <!-- ━━━━━━━━━━━━━━━━━━ FOOTER ━━━━━━━━━━━━━━━━━━ -->
  <tr><td style="padding:28px 8px 0;text-align:center;">

    <!-- Social links -->
    <table cellpadding="0" cellspacing="0" role="presentation" style="margin:0 auto 16px;">
      <tr>
        <td style="padding:0 4px;">
          <a href="https://www.tiktok.com/@brightlearntutoring" style="display:inline-block;background:#1a1a1a;border-radius:8px;padding:7px 13px;text-decoration:none;">
            <span style="color:#ffffff;font-size:11px;font-weight:600;">TikTok</span>
          </a>
        </td>
        <td style="padding:0 4px;">
          <a href="https://www.instagram.com/brightlearn_tutoring/" style="display:inline-block;background:#1a1a1a;border-radius:8px;padding:7px 13px;text-decoration:none;">
            <span style="color:#ffffff;font-size:11px;font-weight:600;">Instagram</span>
          </a>
        </td>
        <td style="padding:0 4px;">
          <a href="https://www.youtube.com/channel/UCwLfSed7TDecNnVqY5RjuFQ" style="display:inline-block;background:#1a1a1a;border-radius:8px;padding:7px 13px;text-decoration:none;">
            <span style="color:#ffffff;font-size:11px;font-weight:600;">YouTube</span>
          </a>
        </td>
      </tr>
    </table>

    <p style="margin:0 0 4px;font-size:11px;color:#b0aa9e;line-height:1.8;">
      <strong style="color:#8c8680;font-weight:600;">BrightLearn Tutoring</strong> &nbsp;&middot;&nbsp;
      <a href="https://brightlearntutoring.co.uk" style="color:#b0aa9e;text-decoration:none;">brightlearntutoring.co.uk</a> &nbsp;&middot;&nbsp;
      <a href="mailto:${ADMIN_EMAIL}" style="color:#b0aa9e;text-decoration:none;">${ADMIN_EMAIL}</a>
    </p>
    <p style="margin:0;font-size:11px;color:#c8c3bb;">You received this because you submitted an enquiry on our website.</p>

  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
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

  const contactEmail =
    data["Parent email"] !== "—" ? data["Parent email"] : (data["Student email"] ?? null);
  const fromName =
    data["Parent name"] !== "—" ? data["Parent name"] : data["Student name"];

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
        subject: `We've received your enquiry — BrightLearn Tutoring`,
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
