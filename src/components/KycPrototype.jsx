import { useEffect, useRef, useState } from "react";
import {
  Lock,
  CreditCard,
  Home,
  Clock,
  User,
  Users,
  Eye,
  EyeOff,
  UploadCloud,
  Camera,
  CheckCircle2,
  AlertTriangle,
  PencilLine,
  Lightbulb,
} from "lucide-react";
import { Button, Input, Card, Badge, Checkbox, Radio } from "./KycUI";
import { kycThemeVars } from "./kycTheme";

// Design notes shown in the annotation panel, keyed by screen. Ported
// verbatim from the case study's original annotations.
const ANNOTATIONS = {
  landing: {
    title: "Setting expectations before the flow starts",
    body: "The checklist states exactly what's needed and how long it takes, before asking for anything. Applicants who start a KYC flow without their ID in hand are a common source of drop-off — this screen front-loads that check.",
  },
  accountType: {
    title: "One branch point, chosen deliberately",
    body: "Individual vs. joint is the only fork in this flow, and it's modeled as two full cards rather than a dropdown. Reading each option's consequence up front — a second applicant, shared ownership — matters more here than saving vertical space.",
  },
  personal: {
    title: "Inline validation, and a SIN field that stays masked",
    body: "The SIN field behaves like a password field, masked by default with a reveal toggle — enough to verify entry without leaving nine digits visible if someone glances at the screen. Errors validate on blur, next to the field that caused them, rather than collecting into a summary list at submit.",
  },
  joint: {
    title: "A conditional screen, not a conditional field",
    body: "This screen only exists on the joint branch — an individual applicant never sees it.",
    extraTitle: "Why this needs its own screen",
    extra: "Reusing the exact field layout from the personal details screen keeps the second applicant's form familiar rather than feeling like a different product. The stepper gains an extra step on this path, and the 'Applicant 2 of 2' badge tells the user how much is left, so they don't have to guess whether they've restarted the application.",
  },
  upload: {
    title: "Drag-drop and camera as equal options",
    body: "Desktop users opening an account from a laptop don't reliably have a camera on hand, so 'browse files' isn't demoted to a fallback link. Front and back are uploaded on one screen, since they're really one task.",
  },
  uploadError: {
    title: "Rejecting a file without blaming the user",
    body: "The error names the fix — 'too blurry, try again in better light' — not just the failure.",
    extraTitle: "Handling the edge case",
    extra: "Only the one dropzone that failed goes into an error state; the screen doesn't reset, and a completed back-of-ID upload would stay untouched while the user fixes the front. Retrying costs one click, not a restart.",
  },
  review: {
    title: "Editing one answer shouldn't cost a full restart",
    body: "Every field on this screen links back to the exact step that produced it. Clicking 'Edit' under the SIN drops the user on the personal details screen with everything else preserved, then returns them here — not to square one.",
  },
  success: {
    title: "One outcome, one next step",
    body: "The confirmation states the fact — account open, number, email sent — and offers a single primary action. Anything else the user might do next is listed as information, not a competing call to action.",
  },
};

const SCREEN_NUMBERS = { landing: 1, accountType: 2, personal: 3, joint: 4, upload: 5, uploadError: 6, review: 7, success: 8 };

const STEP_LABELS = { accountType: "Account type", personal: "Your details", joint: "Joint applicant", upload: "Documents", review: "Review" };

const PROVINCE_OPTIONS = [
  { value: "on", label: "Ontario" },
  { value: "bc", label: "British Columbia" },
  { value: "ab", label: "Alberta" },
];

function maskSin(digits) {
  return digits.length >= 3 ? `••• ••• ${digits.slice(-3)}` : `••• ••• ${digits.padStart(3, "•")}`;
}

function formatSin(digits) {
  return digits.length === 9 ? `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 9)}` : digits;
}

function ChecklistItem({ icon, children }) {
  return (
    <div className="flex items-start gap-4">
      <span className="mt-0.5 flex-none" style={{ color: "var(--accent-primary)" }}>
        {icon}
      </span>
      <span style={{ font: "var(--text-body)", color: "var(--text-primary)" }}>{children}</span>
    </div>
  );
}

function SinField({ label, value, revealed, onToggleReveal, onChange, onBlur, borderColor, helpText, helpColor }) {
  return (
    <label className="flex flex-col gap-1.5">
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
      <div
        className="flex items-center gap-2 rounded-[var(--radius-md)] border px-4 py-3"
        style={{ borderColor: borderColor || "var(--border-default)", background: "var(--surface-card)" }}
      >
        <input
          type={revealed ? "text" : "password"}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          style={{ border: "none", outline: "none", flex: 1, font: "var(--text-body)", color: "var(--text-primary)", background: "transparent" }}
        />
        <button
          type="button"
          onClick={onToggleReveal}
          aria-label={revealed ? "Hide SIN" : "Show SIN"}
          className="flex cursor-pointer border-none bg-transparent p-1"
          style={{ color: "var(--text-secondary)" }}
        >
          {revealed ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
        </button>
      </div>
      {helpText && (
        <span style={{ font: "var(--text-caption)", color: helpColor || "var(--text-muted)" }}>{helpText}</span>
      )}
    </label>
  );
}

function Dropzone({ label, status, fileName }) {
  if (status === "uploaded") {
    return (
      <div
        className="flex-1 rounded-[var(--radius-lg)] border-2 p-8 text-center"
        style={{ borderColor: "var(--status-success)", background: "var(--status-success-bg)" }}
      >
        <CheckCircle2 className="mx-auto h-7 w-7" style={{ color: "var(--status-success)" }} />
        <div style={{ font: "var(--text-body)", color: "var(--text-primary)", margin: "12px 0 4px" }}>{label}</div>
        <div style={{ font: "var(--text-body-sm)", color: "var(--text-secondary)" }}>{fileName} uploaded</div>
      </div>
    );
  }
  return (
    <div className="flex-1 rounded-[var(--radius-lg)] border-2 border-dashed p-8 text-center" style={{ borderColor: "var(--border-default)" }}>
      <UploadCloud className="mx-auto h-7 w-7" style={{ color: "var(--text-muted)" }} />
      <div style={{ font: "var(--text-body)", color: "var(--text-primary)", margin: "12px 0 4px" }}>{label}</div>
      <div style={{ font: "var(--text-body-sm)", color: "var(--text-secondary)", marginBottom: 12 }}>Drag and drop, or</div>
      <Button variant="secondary" size="sm">
        Browse files
      </Button>
      <div className="mt-3">
        <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-1.5" style={{ font: "var(--text-body-sm)", color: "var(--text-link)" }}>
          <Camera className="h-3.5 w-3.5" /> Use camera instead
        </a>
      </div>
    </div>
  );
}

function ReviewRow({ label, value }) {
  return (
    <div>
      <div style={{ color: "var(--text-muted)", marginBottom: 2 }}>{label}</div>
      <div style={{ color: "var(--text-primary)" }}>{value}</div>
    </div>
  );
}

export default function KycPrototype({ showAnnotations = true, requireConsent = true }) {
  const [screen, setScreen] = useState("landing");
  const [accountType, setAccountType] = useState(null);
  const [cameFromReview, setCameFromReview] = useState(false);

  const [firstName, setFirstName] = useState("Priya");
  const [lastName, setLastName] = useState("Nandan");
  const [dob, setDob] = useState("1994-03-12");
  const [address, setAddress] = useState("48 Elm Street, Toronto, ON M4B 1B3");
  const [sin, setSin] = useState("246813579");
  const [sinRevealed, setSinRevealed] = useState(false);
  const [sinTouched, setSinTouched] = useState(false);

  const [jointFirstName, setJointFirstName] = useState("Owen");
  const [jointLastName, setJointLastName] = useState("Nandan");
  const [jointDob, setJointDob] = useState("1996-07-22");
  const [jointAddress, setJointAddress] = useState("");
  const [jointSameAddress, setJointSameAddress] = useState(true);
  const [jointSin, setJointSin] = useState("539021847");
  const [jointSinRevealed, setJointSinRevealed] = useState(false);

  const [frontUploadStatus, setFrontUploadStatus] = useState("empty");
  const [backUploadStatus, setBackUploadStatus] = useState("empty");

  const [consentChecked, setConsentChecked] = useState(false);

  const headingRef = useRef(null);
  const isFirstRender = useRef(true);

  // Move focus to the new screen's heading on every navigation, matching the
  // original prototype's keyboard-flow behavior — the point being tested in
  // the accessibility notes below.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [screen]);

  const continueTo = (next) => {
    if (cameFromReview) {
      setScreen("review");
      setCameFromReview(false);
      return;
    }
    setScreen(next);
  };

  const buildSteps = () => {
    const type = accountType || "individual";
    const order = type === "joint" ? ["accountType", "personal", "joint", "upload", "review"] : ["accountType", "personal", "upload", "review"];
    const curKey = screen === "uploadError" ? "upload" : screen;
    const curIdx = order.indexOf(curKey);
    return order.map((key, i) => {
      const st = i < curIdx ? "done" : i === curIdx ? "current" : "upcoming";
      return {
        key,
        label: STEP_LABELS[key],
        dotBg: st === "done" ? "var(--accent-primary)" : st === "current" ? "var(--surface-accent-subtle)" : "var(--surface-card)",
        dotBorder: st === "upcoming" ? "var(--border-default)" : "var(--accent-primary)",
        dotText: st === "done" ? "var(--text-on-accent)" : st === "current" ? "var(--accent-primary)" : "var(--text-muted)",
        dotContent: st === "done" ? "✓" : String(i + 1),
        labelColor: st === "upcoming" ? "var(--text-muted)" : "var(--text-primary)",
        hasLine: i < order.length - 1,
        lineBg: st === "done" ? "var(--accent-primary)" : "var(--border-default)",
      };
    });
  };

  const showStepper = !(screen === "landing" || screen === "success");
  const showEditBanner = cameFromReview && (screen === "personal" || screen === "joint" || screen === "upload");
  const note = ANNOTATIONS[screen] || ANNOTATIONS.landing;

  const sinBorderColor = sinTouched && sin.length !== 9 ? "var(--status-error)" : "var(--border-default)";
  const sinHelpColor = sinTouched && sin.length !== 9 ? "var(--status-error)" : "var(--text-muted)";
  const sinHelpText =
    sinTouched && sin.length !== 9
      ? "Enter your 9-digit SIN, no spaces or letters."
      : "9 digits. Shown masked by default — use the eye icon to verify before submitting.";

  const accountTypeLabel = accountType === "joint" ? "Joint account" : "Individual account";
  const fullName = `${firstName} ${lastName}`;
  const jointFullName = `${jointFirstName} ${jointLastName}`;
  const jointAddressReview = jointSameAddress ? address : jointAddress;
  const isSubmitDisabled = requireConsent && !consentChecked;

  const restart = () => {
    setScreen("landing");
    setAccountType(null);
    setCameFromReview(false);
    setSinRevealed(false);
    setSinTouched(false);
    setJointSinRevealed(false);
    setFrontUploadStatus("empty");
    setBackUploadStatus("empty");
    setConsentChecked(false);
  };

  return (
    <div className="flex flex-wrap items-start gap-8" data-testid="kyc-prototype">
      <div
        className="w-full flex-none overflow-hidden rounded-[var(--radius-lg)] border"
        style={{
          ...kycThemeVars,
          maxWidth: 1160,
          borderColor: "var(--border-subtle)",
          boxShadow: "var(--shadow-lg)",
          background: "var(--surface-card)",
          fontFamily: "var(--font-sans)",
          color: "var(--text-primary)",
        }}
      >
        {/* fake browser chrome */}
        <div className="flex h-11 items-center gap-4 border-b px-4" style={{ background: "var(--surface-page-alt)", borderColor: "var(--border-subtle)" }}>
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--color-ink-150)" }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--color-ink-150)" }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--color-ink-150)" }} />
          </div>
          <div
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full px-4 py-1.5"
            style={{ background: "var(--surface-card)", font: "var(--text-caption)", color: "var(--text-muted)" }}
          >
            <Lock className="h-3 w-3" /> meridian.bank/open-account
          </div>
        </div>

        {/* app header + stepper */}
        <div className="flex h-16 items-center justify-between border-b px-10" style={{ borderColor: "var(--border-subtle)" }}>
          <div style={{ font: "600 20px var(--font-serif)", color: "var(--text-primary)" }}>Meridian</div>
          {showStepper && (
            <div className="flex items-center gap-2">
              {buildSteps().map((step) => (
                <div key={step.key} className="flex items-center gap-2">
                  <div
                    className="flex h-[22px] w-[22px] items-center justify-center rounded-full border"
                    style={{ background: step.dotBg, borderColor: step.dotBorder, font: "600 11px var(--font-sans)", color: step.dotText }}
                  >
                    {step.dotContent}
                  </div>
                  <span className="whitespace-nowrap" style={{ font: "var(--text-caption)", color: step.labelColor }}>
                    {step.label}
                  </span>
                  {step.hasLine && <div className="h-px w-5" style={{ background: step.lineBg }} />}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="min-h-[660px] px-16">
          {showEditBanner && (
            <div className="mt-3 flex items-center justify-between border-b py-3" style={{ borderColor: "var(--border-subtle)" }}>
              <span style={{ font: "var(--text-caption)", color: "var(--text-muted)" }}>Editing this section from your review.</span>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setScreen("review");
                  setCameFromReview(false);
                }}
                style={{ font: "var(--text-body-sm)", color: "var(--text-link)" }}
              >
                Return to review
              </a>
            </div>
          )}

          {screen === "landing" && (
            <div className="mx-auto max-w-[920px] py-14">
              <div className="flex flex-wrap items-start gap-14">
                <div className="min-w-[320px] flex-1">
                  <h2
                    ref={headingRef}
                    tabIndex={-1}
                    className="outline-none"
                    style={{ font: "var(--text-heading-1)", color: "var(--text-primary)", margin: "0 0 16px" }}
                  >
                    Open your account online
                  </h2>
                  <p style={{ font: "var(--text-body-lg)", color: "var(--text-secondary)", maxWidth: 420, margin: "0 0 32px" }}>
                    You can complete this in about 10 minutes. Have these ready before you start.
                  </p>
                  <Button variant="primary" size="lg" onClick={() => setScreen("accountType")}>
                    Get started
                  </Button>
                  <div className="mt-5">
                    <a href="#" onClick={(e) => e.preventDefault()} style={{ font: "var(--text-body-sm)", color: "var(--text-link)" }}>
                      Already started? Sign in to continue.
                    </a>
                  </div>
                </div>
                <div className="min-w-[280px] flex-1">
                  <Card>
                    <div className="flex flex-col gap-6">
                      <ChecklistItem icon={<CreditCard className="h-5 w-5" />}>
                        A government-issued photo ID (driver's license, passport, or provincial ID)
                      </ChecklistItem>
                      <ChecklistItem icon={<Home className="h-5 w-5" />}>
                        Proof of address — a utility bill or bank statement from the last 3 months
                      </ChecklistItem>
                      <ChecklistItem icon={<Clock className="h-5 w-5" />}>About 10 minutes, uninterrupted</ChecklistItem>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {screen === "accountType" && (
            <div className="mx-auto max-w-[760px] py-14">
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="outline-none"
                style={{ font: "var(--text-heading-1)", color: "var(--text-primary)", margin: "0 0 12px" }}
              >
                What type of account are you opening?
              </h2>
              <p style={{ font: "var(--text-body)", color: "var(--text-secondary)", margin: "0 0 32px" }}>
                Joint accounts add a second applicant with full ownership. This can't be changed online later — it requires a branch visit.
              </p>
              <div className="mb-10 flex gap-5">
                <div
                  onClick={() => setAccountType("individual")}
                  className="flex-1 cursor-pointer rounded-[var(--radius-lg)] border-2 p-6"
                  style={{
                    borderColor: accountType === "individual" ? "var(--accent-primary)" : "var(--border-default)",
                    background: accountType === "individual" ? "var(--surface-accent-subtle)" : "var(--surface-card)",
                  }}
                >
                  <User className="h-6 w-6" style={{ color: "var(--accent-primary)" }} />
                  <div style={{ font: "var(--text-heading-3)", margin: "16px 0 6px" }}>Individual account</div>
                  <div style={{ font: "var(--text-body-sm)", color: "var(--text-secondary)", marginBottom: 16 }}>
                    Just you. You're the sole owner and signer.
                  </div>
                  <Radio label="Select" checked={accountType === "individual"} onChange={() => setAccountType("individual")} />
                </div>
                <div
                  onClick={() => setAccountType("joint")}
                  className="flex-1 cursor-pointer rounded-[var(--radius-lg)] border-2 p-6"
                  style={{
                    borderColor: accountType === "joint" ? "var(--accent-primary)" : "var(--border-default)",
                    background: accountType === "joint" ? "var(--surface-accent-subtle)" : "var(--surface-card)",
                  }}
                >
                  <Users className="h-6 w-6" style={{ color: "var(--accent-primary)" }} />
                  <div style={{ font: "var(--text-heading-3)", margin: "16px 0 6px" }}>Joint account</div>
                  <div style={{ font: "var(--text-body-sm)", color: "var(--text-secondary)", marginBottom: 16 }}>
                    You and one other adult share ownership and signing rights.
                  </div>
                  <Radio label="Select" checked={accountType === "joint"} onChange={() => setAccountType("joint")} />
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setScreen("landing")}>
                  Back
                </Button>
                <Button variant="primary" disabled={!accountType} onClick={() => accountType && setScreen("personal")}>
                  Continue
                </Button>
              </div>
            </div>
          )}

          {screen === "personal" && (
            <div className="mx-auto max-w-[640px] py-14">
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="outline-none"
                style={{ font: "var(--text-heading-1)", color: "var(--text-primary)", margin: "0 0 12px" }}
              >
                Your details
              </h2>
              <p style={{ font: "var(--text-body)", color: "var(--text-secondary)", margin: "0 0 32px" }}>
                This information is used to verify your identity and open the account in your name.
              </p>
              <div className="flex flex-col gap-5">
                <div className="flex gap-4">
                  <Input label="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  <Input label="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <Input label="Date of birth" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
                <Input label="Home address" value={address} onChange={(e) => setAddress(e.target.value)} />
                <SinField
                  label="Social insurance number (SIN)"
                  value={sinRevealed ? formatSin(sin) : sin}
                  revealed={sinRevealed}
                  onToggleReveal={() => setSinRevealed((r) => !r)}
                  onChange={(e) => setSin(e.target.value.replace(/\D/g, "").slice(0, 9))}
                  onBlur={() => setSinTouched(true)}
                  borderColor={sinBorderColor}
                  helpText={sinHelpText}
                  helpColor={sinHelpColor}
                />
              </div>
              <div className="mt-10 flex gap-3">
                <Button variant="secondary" onClick={() => setScreen("accountType")}>
                  Back
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    if (sin.length !== 9) {
                      setSinTouched(true);
                      return;
                    }
                    continueTo(accountType === "joint" ? "joint" : "upload");
                  }}
                >
                  {cameFromReview ? "Save and return to review" : "Continue"}
                </Button>
              </div>
            </div>
          )}

          {screen === "joint" && (
            <div className="mx-auto max-w-[640px] py-14">
              <Badge tone="accent">Joint account · Applicant 2 of 2</Badge>
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="outline-none"
                style={{ font: "var(--text-heading-1)", color: "var(--text-primary)", margin: "16px 0 12px" }}
              >
                Add the joint applicant's details
              </h2>
              <p style={{ font: "var(--text-body)", color: "var(--text-secondary)", margin: "0 0 32px" }}>
                This person will have full ownership and signing rights on the account. They'll verify their own documents separately after you
                submit.
              </p>
              <div className="flex flex-col gap-5">
                <div className="flex gap-4">
                  <Input label="First name" value={jointFirstName} onChange={(e) => setJointFirstName(e.target.value)} />
                  <Input label="Last name" value={jointLastName} onChange={(e) => setJointLastName(e.target.value)} />
                </div>
                <Input label="Date of birth" type="date" value={jointDob} onChange={(e) => setJointDob(e.target.value)} />

                <Checkbox
                  label="Same address as primary applicant"
                  checked={jointSameAddress}
                  onChange={() => setJointSameAddress((v) => !v)}
                />
                {jointSameAddress ? (
                  <div
                    className="rounded-[var(--radius-md)] px-4 py-3"
                    style={{ font: "var(--text-body-sm)", color: "var(--text-secondary)", background: "var(--surface-page-alt)" }}
                  >
                    Using: {address}
                  </div>
                ) : (
                  <Input label="Home address" value={jointAddress} onChange={(e) => setJointAddress(e.target.value)} />
                )}

                <SinField
                  label="Social insurance number (SIN)"
                  value={jointSinRevealed ? formatSin(jointSin) : jointSin}
                  revealed={jointSinRevealed}
                  onToggleReveal={() => setJointSinRevealed((r) => !r)}
                  onChange={(e) => setJointSin(e.target.value.replace(/\D/g, "").slice(0, 9))}
                  helpText="9 digits. Verified with the credit bureau separately from the primary applicant."
                />
              </div>
              <div className="mt-10 flex gap-3">
                <Button variant="secondary" onClick={() => setScreen("personal")}>
                  Back
                </Button>
                <Button variant="primary" onClick={() => continueTo("upload")}>
                  {cameFromReview ? "Save and return to review" : "Continue"}
                </Button>
              </div>
            </div>
          )}

          {screen === "upload" && (
            <div className="mx-auto max-w-[820px] py-14">
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="outline-none"
                style={{ font: "var(--text-heading-1)", color: "var(--text-primary)", margin: "0 0 12px" }}
              >
                Upload your ID
              </h2>
              <p style={{ font: "var(--text-body)", color: "var(--text-secondary)", margin: "0 0 32px" }}>
                We need clear photos of the front and back of your government ID.
              </p>
              <div className="mb-8 flex gap-5">
                <Dropzone label="Front of ID" status={frontUploadStatus} fileName="front-id.jpg" />
                <Dropzone label="Back of ID" status={backUploadStatus} fileName="back-id.jpg" />
              </div>

              <div
                className="mb-8 rounded-[var(--radius-md)] border border-dashed p-5"
                style={{ borderColor: "var(--border-strong)", background: "var(--surface-page-alt)" }}
              >
                <div
                  style={{
                    font: "var(--text-label)",
                    letterSpacing: "var(--letter-spacing-label)",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    marginBottom: 8,
                  }}
                >
                  Prototype controls
                </div>
                <p style={{ font: "var(--text-body-sm)", color: "var(--text-secondary)", margin: "0 0 16px" }}>
                  This demo doesn't process real files. Use these to see how the design responds.
                </p>
                <div className="flex gap-3">
                  <Button variant="secondary" size="sm" onClick={() => { setScreen("uploadError"); setFrontUploadStatus("error"); }}>
                    Simulate a rejected photo
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setScreen("review");
                      setFrontUploadStatus("uploaded");
                      setBackUploadStatus("uploaded");
                      setCameFromReview(false);
                    }}
                  >
                    Simulate a successful upload
                  </Button>
                </div>
              </div>

              <Button variant="secondary" onClick={() => setScreen(accountType === "joint" ? "joint" : "personal")}>
                Back
              </Button>
            </div>
          )}

          {screen === "uploadError" && (
            <div className="mx-auto max-w-[820px] py-14">
              <Badge tone="warning">Action needed</Badge>
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="outline-none"
                style={{ font: "var(--text-heading-1)", color: "var(--text-primary)", margin: "16px 0 12px" }}
              >
                We couldn't use that photo
              </h2>
              <p style={{ font: "var(--text-body)", color: "var(--text-secondary)", margin: "0 0 32px" }}>
                Everything else you've entered is saved. Just retake the one photo below.
              </p>
              <div className="mb-8 flex gap-5">
                <div className="flex-1 rounded-[var(--radius-lg)] border-2 p-8 text-center" style={{ borderColor: "var(--status-error)", background: "var(--status-error-bg)" }}>
                  <AlertTriangle className="mx-auto h-7 w-7" style={{ color: "var(--status-error)" }} />
                  <div style={{ font: "var(--text-body)", color: "var(--text-primary)", margin: "12px 0 8px" }}>Front of ID</div>
                  <p style={{ font: "var(--text-body-sm)", color: "var(--status-error)", margin: "0 0 16px" }}>
                    This photo is too blurry to read. Retake it somewhere with even, bright light, and hold the camera steady.
                  </p>
                  <Button variant="primary" size="sm" onClick={() => { setScreen("upload"); setFrontUploadStatus("empty"); }}>
                    Try again
                  </Button>
                </div>
                <div className="flex-1 rounded-[var(--radius-lg)] border-2 border-dashed p-8 text-center" style={{ borderColor: "var(--border-default)" }}>
                  <UploadCloud className="mx-auto h-7 w-7" style={{ color: "var(--text-muted)" }} />
                  <div style={{ font: "var(--text-body)", color: "var(--text-primary)", margin: "12px 0 4px" }}>Back of ID</div>
                  <div style={{ font: "var(--text-body-sm)", color: "var(--text-secondary)" }}>Not uploaded yet</div>
                </div>
              </div>
            </div>
          )}

          {screen === "review" && (
            <div className="mx-auto max-w-[820px] py-14">
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="outline-none"
                style={{ font: "var(--text-heading-1)", color: "var(--text-primary)", margin: "0 0 12px" }}
              >
                Review your application
              </h2>
              <p style={{ font: "var(--text-body)", color: "var(--text-secondary)", margin: "0 0 32px" }}>
                Check the details below, then confirm to submit.
              </p>

              <div className="mb-8 flex flex-col gap-4">
                <Card padding="24px">
                  <div className="mb-4 flex items-baseline justify-between">
                    <span style={{ font: "var(--text-heading-3)" }}>Account type</span>
                    <a
                      href="#"
                      onClick={(e) => { e.preventDefault(); setScreen("accountType"); setCameFromReview(true); }}
                      className="inline-flex items-center gap-1.5"
                      style={{ font: "var(--text-body-sm)", color: "var(--text-link)" }}
                    >
                      <PencilLine className="h-3.5 w-3.5" /> Edit
                    </a>
                  </div>
                  <div style={{ font: "var(--text-body)", color: "var(--text-secondary)" }}>{accountTypeLabel}</div>
                </Card>

                <Card padding="24px">
                  <div className="mb-4 flex items-baseline justify-between">
                    <span style={{ font: "var(--text-heading-3)" }}>Your details</span>
                    <a
                      href="#"
                      onClick={(e) => { e.preventDefault(); setScreen("personal"); setCameFromReview(true); }}
                      className="inline-flex items-center gap-1.5"
                      style={{ font: "var(--text-body-sm)", color: "var(--text-link)" }}
                    >
                      <PencilLine className="h-3.5 w-3.5" /> Edit
                    </a>
                  </div>
                  <div className="grid grid-cols-2 gap-4" style={{ font: "var(--text-body-sm)" }}>
                    <ReviewRow label="Name" value={fullName} />
                    <ReviewRow label="Date of birth" value={dob} />
                    <ReviewRow label="Address" value={address} />
                    <ReviewRow label="SIN" value={<span style={{ fontFamily: "var(--font-mono)" }}>{maskSin(sin)}</span>} />
                  </div>
                </Card>

                {accountType === "joint" && (
                  <Card padding="24px">
                    <div className="mb-4 flex items-baseline justify-between">
                      <span style={{ font: "var(--text-heading-3)" }}>Joint applicant</span>
                      <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); setScreen("joint"); setCameFromReview(true); }}
                        className="inline-flex items-center gap-1.5"
                        style={{ font: "var(--text-body-sm)", color: "var(--text-link)" }}
                      >
                        <PencilLine className="h-3.5 w-3.5" /> Edit
                      </a>
                    </div>
                    <div className="grid grid-cols-2 gap-4" style={{ font: "var(--text-body-sm)" }}>
                      <ReviewRow label="Name" value={jointFullName} />
                      <ReviewRow label="Date of birth" value={jointDob} />
                      <ReviewRow label="Address" value={jointAddressReview} />
                      <ReviewRow label="SIN" value={<span style={{ fontFamily: "var(--font-mono)" }}>{maskSin(jointSin)}</span>} />
                    </div>
                  </Card>
                )}

                <Card padding="24px">
                  <div className="mb-4 flex items-baseline justify-between">
                    <span style={{ font: "var(--text-heading-3)" }}>Documents</span>
                    <a
                      href="#"
                      onClick={(e) => { e.preventDefault(); setScreen("upload"); setCameFromReview(true); }}
                      className="inline-flex items-center gap-1.5"
                      style={{ font: "var(--text-body-sm)", color: "var(--text-link)" }}
                    >
                      <PencilLine className="h-3.5 w-3.5" /> Edit
                    </a>
                  </div>
                  <div className="flex gap-6" style={{ font: "var(--text-body-sm)" }}>
                    <div className="flex items-center gap-2">
                      Front of ID <Badge tone="success">Uploaded</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      Back of ID <Badge tone="success">Uploaded</Badge>
                    </div>
                  </div>
                </Card>
              </div>

              <Checkbox
                label="I confirm this information is accurate and agree to the Terms of Service and Electronic Communications Consent."
                checked={consentChecked}
                onChange={() => setConsentChecked((v) => !v)}
              />

              <div className="mt-6 flex gap-3">
                <Button variant="secondary" onClick={() => setScreen("upload")}>
                  Back
                </Button>
                <Button
                  variant="primary"
                  disabled={isSubmitDisabled}
                  onClick={() => {
                    if (isSubmitDisabled) return;
                    setScreen("success");
                  }}
                >
                  Submit application
                </Button>
              </div>
            </div>
          )}

          {screen === "success" && (
            <div className="mx-auto max-w-[480px] py-[72px] text-center">
              <div
                className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
                style={{ background: "var(--status-success-bg)" }}
              >
                <CheckCircle2 className="h-8 w-8" style={{ color: "var(--status-success)" }} />
              </div>
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="outline-none"
                style={{ font: "var(--text-heading-1)", color: "var(--text-primary)", margin: "0 0 12px" }}
              >
                Your account is open
              </h2>
              <p style={{ font: "var(--text-body)", color: "var(--text-secondary)", margin: "0 0 32px" }}>
                Your chequing account ending in 4821 is ready to use. We've sent a confirmation to your email.
              </p>
              <Card padding="24px">
                <div className="flex flex-col gap-4 text-left">
                  <div className="flex gap-3">
                    <span style={{ font: "600 13px var(--font-mono)", color: "var(--accent-primary)", flex: "none" }}>1</span>
                    <span style={{ font: "var(--text-body-sm)", color: "var(--text-primary)" }}>
                      Set up direct deposit — download a pre-filled form from your dashboard.
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span style={{ font: "600 13px var(--font-mono)", color: "var(--accent-primary)", flex: "none" }}>2</span>
                    <span style={{ font: "var(--text-body-sm)", color: "var(--text-primary)" }}>
                      Order a debit card — arrives by mail in 5–7 business days.
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span style={{ font: "600 13px var(--font-mono)", color: "var(--accent-primary)", flex: "none" }}>3</span>
                    <span style={{ font: "var(--text-body-sm)", color: "var(--text-primary)" }}>
                      Add the Meridian app — sign in with the email and password you just created.
                    </span>
                  </div>
                </div>
              </Card>
              <div className="mt-8 flex justify-center gap-3">
                <Button variant="primary">Go to your dashboard</Button>
                <Button variant="secondary" onClick={restart}>
                  Start over
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showAnnotations && (
        <div className="w-full flex-none sm:w-80 sm:sticky sm:top-6" style={kycThemeVars}>
          <div
            className="rounded-[var(--radius-lg)] border p-7"
            style={{ background: "var(--surface-card)", borderColor: "var(--border-subtle)", boxShadow: "var(--shadow-sm)" }}
          >
            <div className="mb-4 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" style={{ color: "var(--accent-primary)" }} />
              <span
                style={{
                  font: "var(--text-label)",
                  letterSpacing: "var(--letter-spacing-label)",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                }}
              >
                Design note — screen {SCREEN_NUMBERS[screen]}
              </span>
            </div>
            <h3 style={{ font: "var(--text-heading-3)", margin: "0 0 10px", color: "var(--text-primary)" }}>{note.title}</h3>
            <p style={{ font: "var(--text-body-sm)", color: "var(--text-secondary)", margin: 0 }}>{note.body}</p>
            {note.extra && (
              <div className="mt-4 border-t pt-4" style={{ borderColor: "var(--border-subtle)" }}>
                <div
                  style={{
                    font: "var(--text-label)",
                    color: "var(--accent-primary)",
                    textTransform: "uppercase",
                    letterSpacing: "var(--letter-spacing-label)",
                    marginBottom: 8,
                  }}
                >
                  {note.extraTitle}
                </div>
                <p style={{ font: "var(--text-body-sm)", color: "var(--text-secondary)", margin: 0 }}>{note.extra}</p>
              </div>
            )}
          </div>
          <p style={{ font: "var(--text-caption)", color: "var(--text-muted)", margin: "16px 4px 0" }}>
            This note updates as you move through the prototype.
          </p>
        </div>
      )}
    </div>
  );
}
