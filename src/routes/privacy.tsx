import { createFileRoute, useRouter } from "@tanstack/react-router";
import { SupportBubble } from "@/components/tigro/SupportBubble";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "ঝুঁকি প্রকাশ চুক্তি — Tigro Club" },
      { name: "description", content: "Tigro Club-এর ঝুঁকি প্রকাশ চুক্তি পৃষ্ঠা।" },
      { property: "og:title", content: "ঝুঁকি প্রকাশ চুক্তি — Tigro Club" },
      { property: "og:description", content: "Tigro Club-এর ঝুঁকি প্রকাশ চুক্তি পৃষ্ঠা।" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen animate-[fade-in_0.35s_ease-out] bg-background">
      <header className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-4">
        <button
          type="button"
          onClick={() => router.history.back()}
          aria-label="Back"
          className="shrink-0 text-2xl leading-none text-foreground"
        >
          ‹
        </button>
        <h1 className="truncate text-center text-lg font-medium text-foreground">
          ঝুঁকি প্রকাশ চুক্তি
        </h1>
        <span className="w-6 shrink-0" />
      </header>

      <SupportBubble />
    </main>
  );
}
