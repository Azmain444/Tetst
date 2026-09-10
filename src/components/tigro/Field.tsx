import { useState, type ReactNode } from "react";
import { Eye, EyeOff, Lock, Mail, Smartphone, Ticket } from "lucide-react";

export const icons = {
  phone: <Smartphone className="h-6 w-6 fill-brand text-brand-deep" strokeWidth={1.5} />,
  lock: <Lock className="h-6 w-6 text-brand-deep" strokeWidth={1.75} />,
  ticket: <Ticket className="h-6 w-6 fill-brand text-brand-deep" strokeWidth={1.5} />,
  mail: <Mail className="h-6 w-6 text-brand-deep" strokeWidth={1.5} />,
};

export function FieldLabel({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      {icon}
      <span className="text-base text-foreground">{children}</span>
    </div>
  );
}

export function TextInput({
  placeholder,
  defaultValue,
  value,
  onChange,
  type = "text",
}: {
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (v: string) => void;
  type?: string;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="h-14 w-full rounded-xl bg-card px-5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
    />
  );
}

export function PasswordInput({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value?: string;
  onChange?: (v: string) => void;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="h-14 w-full rounded-xl bg-card pl-5 pr-14 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-label="Toggle password"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
      >
        {show ? <Eye className="h-6 w-6" /> : <EyeOff className="h-6 w-6" />}
      </button>
    </div>
  );
}

export function PhoneInput({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-14 w-32 items-center justify-center gap-2 rounded-xl bg-card text-sm text-muted-foreground">
        +880 <span className="text-xs">▾</span>
      </div>
      <input
        type="tel"
        placeholder="ফোন নম্বর লিখুন"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="h-14 flex-1 rounded-xl bg-card px-5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
      />
    </div>
  );
}
