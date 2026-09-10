import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import tiger from "@/assets/tiger-hero.png";
import { Logo } from "@/components/tigro/Brand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tigro Club — দ্রুত ও নিরাপদ উত্তোলন" },
      {
        name: "description",
        content: "Tigro Club — দ্রুত, নিরাপদ এবং স্থিতিশীল উত্তোলন সুবিধা সহ গেমিং প্ল্যাটফর্ম।",
      },
      { property: "og:title", content: "Tigro Club" },
      {
        property: "og:description",
        content: "দ্রুত, নিরাপদ এবং স্থিতিশীল উত্তোলন।",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const fade = setTimeout(() => setLeaving(true), 2600);
    const go = setTimeout(() => navigate({ to: "/register" }), 3300);
    return () => {
      clearTimeout(fade);
      clearTimeout(go);
    };
  }, [navigate]);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between bg-brand-splash px-6 py-10 transition-all duration-700 ease-out ${
        leaving ? "-translate-y-4 scale-110 opacity-0 blur-sm" : "translate-y-0 scale-100 opacity-100 blur-0"
      }`}
    >
      <div className="flex w-full flex-1 flex-col items-center justify-center">
        <img
          src={tiger}
          alt="Tigro Club mascot"
          width={1024}
          height={1024}
          className="w-full max-w-sm animate-[fade-in_0.8s_ease-out] object-contain drop-shadow-xl"
        />
        <p className="mt-6 animate-[fade-in_1s_ease-out_0.3s_both] text-center text-2xl font-bold text-brand-on-header">
          Withdraw fast, safe and stable
        </p>
      </div>

      <div className="flex animate-[fade-in_1.1s_ease-out_0.9s_both] flex-col items-center pb-10">
        <Logo className="h-20" />
      </div>
    </main>
  );
}

