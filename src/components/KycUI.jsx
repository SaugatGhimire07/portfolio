import { useState } from "react";

// Small UI primitives ported from the "Meridian Financial" design system
// referenced by the KYC case study. Kept 1:1 with the original component
// behavior (variants, tones, sizes) so the case study accurately represents
// what was designed, rather than being redrawn in the portfolio's own style.

const BUTTON_SIZES = {
  sm: { padding: "8px 16px", font: "var(--text-body-sm)" },
  md: { padding: "12px 22px", font: "var(--text-body)" },
  lg: { padding: "16px 28px", font: "var(--text-body-lg)" },
};

const BUTTON_VARIANTS = {
  primary: { background: "var(--accent-primary)", color: "var(--text-on-accent)", border: "1px solid transparent" },
  secondary: { background: "transparent", color: "var(--text-primary)", border: "1px solid var(--border-default)" },
  ghost: { background: "transparent", color: "var(--text-primary)", border: "1px solid transparent" },
  inverse: { background: "var(--surface-inverse)", color: "var(--text-on-inverse)", border: "1px solid transparent" },
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  icon = null,
  onClick,
  type = "button",
}) {
  const [hovered, setHovered] = useState(false);
  const v = BUTTON_VARIANTS[variant] || BUTTON_VARIANTS.primary;
  const s = BUTTON_SIZES[size] || BUTTON_SIZES.md;

  let background = v.background;
  if (hovered && !disabled) {
    if (variant === "primary") background = "var(--accent-primary-hover)";
    else if (variant === "secondary" || variant === "ghost") background = "var(--surface-page-alt)";
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...v,
        ...s,
        background,
        fontFamily: "var(--font-sans)",
        fontWeight: 500,
        borderRadius: "var(--radius-full)",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        transition:
          "background var(--duration-base) var(--ease-standard), border-color var(--duration-base) var(--ease-standard), opacity var(--duration-base) var(--ease-standard)",
      }}
    >
      {icon}
      {children}
    </button>
  );
}

export function Input({ label, placeholder, value, onChange, onBlur, type = "text", error, helpText, prefix }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontFamily: "var(--font-sans)" }}>
      {label && (
        <span
          style={{
            font: "var(--text-label)",
            letterSpacing: "var(--letter-spacing-label)",
            textTransform: "uppercase",
            color: "var(--text-secondary)",
          }}
        >
          {label}
        </span>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "12px 16px",
          borderRadius: "var(--radius-md)",
          border: `1px solid ${error ? "var(--status-error)" : "var(--border-default)"}`,
          background: "var(--surface-card)",
          transition: "border-color var(--duration-base) var(--ease-standard)",
        }}
      >
        {prefix && <span style={{ color: "var(--text-muted)", font: "var(--text-body)" }}>{prefix}</span>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          style={{
            border: "none",
            outline: "none",
            flex: 1,
            font: "var(--text-body)",
            color: "var(--text-primary)",
            background: "transparent",
            minWidth: 0,
          }}
        />
      </div>
      {(error || helpText) && (
        <span style={{ font: "var(--text-caption)", color: error ? "var(--status-error)" : "var(--text-muted)" }}>
          {error || helpText}
        </span>
      )}
    </label>
  );
}

export function Card({ children, padding = "32px", bordered = true, elevated = true, style }) {
  return (
    <div
      style={{
        background: "var(--surface-card)",
        borderRadius: "var(--radius-lg)",
        padding,
        border: bordered ? "1px solid var(--border-subtle)" : "none",
        boxShadow: elevated ? "var(--shadow-md)" : "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

const BADGE_TONES = {
  neutral: { bg: "var(--surface-page-alt)", color: "var(--text-secondary)" },
  accent: { bg: "var(--surface-accent-subtle)", color: "var(--accent-primary-hover)" },
  success: { bg: "var(--status-success-bg)", color: "var(--status-success)" },
  warning: { bg: "var(--status-warning-bg)", color: "var(--status-warning)" },
  error: { bg: "var(--status-error-bg)", color: "var(--status-error)" },
};

export function Badge({ children, tone = "neutral" }) {
  const t = BADGE_TONES[tone] || BADGE_TONES.neutral;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "4px 12px",
        borderRadius: "var(--radius-full)",
        background: t.bg,
        color: t.color,
        font: "var(--text-label)",
        letterSpacing: "var(--letter-spacing-label)",
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}

export function Checkbox({ label, checked, onChange }) {
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: "10px", cursor: "pointer", fontFamily: "var(--font-sans)" }}>
      <span
        style={{
          width: 20,
          height: 20,
          borderRadius: "var(--radius-sm)",
          border: `1px solid ${checked ? "var(--accent-primary)" : "var(--border-default)"}`,
          background: checked ? "var(--accent-primary)" : "var(--surface-card)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "all var(--duration-fast) var(--ease-standard)",
        }}
      >
        {checked && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text-on-accent)" strokeWidth="3">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        )}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} style={{ display: "none" }} />
      <span style={{ font: "var(--text-body)", color: "var(--text-primary)" }}>{label}</span>
    </label>
  );
}

export function Radio({ label, checked, onChange, name }) {
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: "10px", cursor: "pointer", fontFamily: "var(--font-sans)" }}>
      <span
        style={{
          width: 20,
          height: 20,
          borderRadius: "var(--radius-full)",
          border: `1px solid ${checked ? "var(--accent-primary)" : "var(--border-default)"}`,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "all var(--duration-fast) var(--ease-standard)",
        }}
      >
        {checked && <span style={{ width: 10, height: 10, borderRadius: "var(--radius-full)", background: "var(--accent-primary)" }} />}
      </span>
      <input type="radio" name={name} checked={checked} onChange={onChange} style={{ display: "none" }} />
      <span style={{ font: "var(--text-body)", color: "var(--text-primary)" }}>{label}</span>
    </label>
  );
}

export function Select({ label, value, onChange, options = [] }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontFamily: "var(--font-sans)" }}>
      {label && (
        <span
          style={{
            font: "var(--text-label)",
            letterSpacing: "var(--letter-spacing-label)",
            textTransform: "uppercase",
            color: "var(--text-secondary)",
          }}
        >
          {label}
        </span>
      )}
      <select
        value={value}
        onChange={onChange}
        style={{
          padding: "12px 16px",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--border-default)",
          background: "var(--surface-card)",
          font: "var(--text-body)",
          color: "var(--text-primary)",
          outline: "none",
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
