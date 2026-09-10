import logo from "@/assets/tigro-logo.png";

export function Logo({ className = "h-9" }: { className?: string }) {
  return (
    <img
      src={logo}
      alt="Tigro Club"
      width={1152}
      height={576}
      loading="lazy"
      className={`${className} w-auto object-contain brand-logo`}
    />
  );
}

export function AuthHeader({
  title,
  lines,
  onBack,
}: {
  title?: string;
  lines?: string[];
  onBack?: () => void;
}) {
  return (
    <header className="bg-brand-header px-4 pb-5 pt-3">
      <div className="relative flex items-center justify-center">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className="absolute left-0 text-2xl leading-none text-brand-on-header"
        >
          ‹
        </button>
        <Logo className="h-9" />
        <div className="absolute right-0 flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#006a4e]">
            <span className="block h-3 w-3 rounded-full bg-[#f42a41]" />
          </span>
          <span className="text-base font-medium text-brand-on-header">BD</span>
        </div>
      </div>

      {title ? (
        <h1 className="mt-5 text-xl font-semibold text-brand-on-header">{title}</h1>
      ) : null}
      {lines?.length ? (
        <div className="mt-3 space-y-0.5 text-xs leading-relaxed text-brand-on-header/90">
          {lines.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </div>
      ) : null}
    </header>
  );
          }
