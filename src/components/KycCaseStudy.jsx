import { Fragment, useEffect } from "react";
import { ArrowIcon } from "./icons";
import KycPrototype from "./KycPrototype";
import { Button, Input, Card, Badge, Checkbox, Radio, Select } from "./KycUI";
import { kycThemeVars, KYC_FONTS_URL, PROVINCE_OPTIONS } from "./kycTheme";

const FLOW_STEPS = [
  { number: 1, label: "Landing" },
  { number: 2, label: "Account type" },
  { number: 3, label: "Personal details" },
  { number: 5, label: "Document upload" },
  { number: 7, label: "Review + consent" },
  { number: 8, label: "Success" },
];

const RESPONSIVE_ROWS = [
  { screen: "1 · Landing", tablet: "Stacks to one column; checklist card moves below the intro copy, full width.", mobile: "Single column; the three checklist items condense to a row of icons with short labels." },
  { screen: "2 · Account type", tablet: "Cards stay side by side with tighter gutters.", mobile: "Cards stack full-width, one above the other." },
  { screen: "3 · Personal details", tablet: "Two-column field pairs (first/last name) are kept.", mobile: "All fields go single-column; Continue becomes a bar pinned to the bottom of the screen." },
  { screen: "4 · Joint applicant", tablet: "Same layout as screen 3.", mobile: "The “Applicant 2 of 2” badge moves into the pinned bottom bar so it stays visible while scrolling." },
  { screen: "5 · Document upload", tablet: "Front/back dropzones stay side by side if width allows, else stack.", mobile: "Dropzones stack vertically; “Use camera” becomes the primary action, since mobile users have a camera in hand." },
  { screen: "6 · Upload error", tablet: "Same layout, narrower gutters.", mobile: "“Try again” is pinned to the bottom of the screen for one-thumb reach." },
  { screen: "7 · Review + consent", tablet: "Summary cards drop from a grid to a single column.", mobile: "Each section collapses into an accordion to manage length; consent and submit are pinned to the bottom." },
  { screen: "8 · Success", tablet: "Same centered layout, narrower measure.", mobile: "The two actions stack full-width instead of sitting side by side." },
];

const CONTRAST_ROWS = [
  { tone: "neutral", label: "Pending", colors: "ink-500 on paper-100", ratio: "4.9:1", pass: true, result: "Passes AA (4.5:1)" },
  { tone: "success", label: "Uploaded", colors: "success-700 on success-100", ratio: "5.0:1", pass: true, result: "Passes AA (4.5:1)" },
  {
    tone: "warning",
    label: "Action needed",
    colors: "warning-700 on warning-100",
    ratio: "3.5:1",
    pass: false,
    result: "Flagged — clears 3:1 for bold text at this weight, short of 4.5:1 for regular small text. A shade darker on --status-warning is the fix; noted rather than shipped silently.",
  },
  { tone: "error", label: "Rejected", colors: "error-700 on error-100", ratio: "5.3:1", pass: true, result: "Passes AA (4.5:1)" },
];

function SectionHeading({ children }) {
  return <h2 className="text-2xl font-bold tracking-tight text-slate-200 sm:text-3xl">{children}</h2>;
}

function ComponentShowcaseCard({ title, note, children }) {
  return (
    <div className="rounded-lg border border-slate-300/10 bg-slate-800/50 p-6">
      <div className="mb-4 text-sm font-semibold text-slate-200">{title}</div>
      <div className="rounded-md p-5" style={{ ...kycThemeVars, background: "var(--surface-page)" }}>
        {children}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-slate-500">{note}</p>
    </div>
  );
}

function FlowNode({ number, label, highlight, sublabel }) {
  return (
    <div
      className={`rounded-md border px-3.5 py-3 text-center ${
        highlight ? "border-teal-400/40 bg-teal-400/10" : "border-slate-300/10 bg-slate-800/50"
      }`}
    >
      <div className={`text-xs font-semibold ${highlight ? "text-teal-300" : "text-slate-500"}`}>{number}</div>
      <div className="mt-1 text-sm text-slate-200">{label}</div>
      {sublabel && <div className="mt-1 text-xs text-teal-300">{sublabel}</div>}
    </div>
  );
}

export default function KycCaseStudy({ onBack }) {
  useEffect(() => {
    if (document.getElementById("kyc-fonts-link")) return;
    const link = document.createElement("link");
    link.id = "kyc-fonts-link";
    link.rel = "stylesheet";
    link.href = KYC_FONTS_URL;
    document.head.appendChild(link);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-400 antialiased">
      <div className="mx-auto max-w-screen-xl px-6 py-12 md:px-12 md:py-16 lg:py-24">
        <button
          type="button"
          className="group mb-2 inline-flex items-center text-sm font-semibold leading-tight text-teal-300"
          onClick={onBack}
        >
          <ArrowIcon className="mr-1 h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-2" />
          Back
        </button>

        {/* Hero */}
        <div className="mt-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-400/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-teal-300">
            UI/UX case study
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
            Opening an account, without the interrogation
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-400">
            An 8-screen identity-verification (KYC) flow for opening a bank account online — individual or joint — designed as a portfolio
            piece for a frontend developer (UI/UX) role.
          </p>
          <div className="mt-10 flex flex-wrap gap-14 border-y border-slate-300/10 py-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Role</div>
              <div className="mt-1.5 text-slate-300">Product &amp; UI/UX design, solo</div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Deliverable</div>
              <div className="mt-1.5 text-slate-300">8 connected screens, built as a working prototype</div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Scope</div>
              <div className="mt-1.5 text-slate-300">2 conditional branches, desktop-first at 1440px</div>
            </div>
          </div>
        </div>

        {/* Problem / approach */}
        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading>The problem</SectionHeading>
            <p className="mt-4 leading-relaxed text-slate-400">
              Account opening is where digital banking products lose the most people. Every screen after "get started" asks for something
              an applicant is reluctant to hand over — a SIN, a photo of a government ID — while a compliance requirement
              (know-your-customer, or KYC) sets exactly what has to be collected before the account can open. The interface has to collect
              that information without feeling like an interrogation, and it has to handle the two places this flow actually branches: a
              joint applicant, and a rejected ID photo.
            </p>
          </div>
          <div>
            <SectionHeading>The approach</SectionHeading>
            <p className="mt-4 leading-relaxed text-slate-400">
              Each screen asks for one group of related information, in the order a person would naturally provide it. Validation happens
              inline, next to the field, rather than in a summary list at submit. The two edge cases most flows handle poorly — a second
              applicant, and a failed upload — are treated as first-class screens with their own recovery paths, not modals bolted onto the
              happy path. A shared component set keeps every screen consistent without one-off styling.
            </p>
          </div>
        </div>

        {/* Flow diagram */}
        <div className="mt-20">
          <SectionHeading>Flow and branch logic</SectionHeading>
          <p className="mt-3 max-w-2xl leading-relaxed text-slate-400">
            Two decisions branch the flow: account type (screen 2) determines whether the joint applicant screen (4) appears at all, and a
            failed document upload (screen 5) loops to a dedicated error state (6) instead of failing the whole flow.
          </p>
          <div className="mt-8 overflow-x-auto rounded-lg border border-slate-300/10 bg-slate-800/30 p-8">
            <div
              className="grid items-start"
              style={{
                minWidth: 1180,
                gridTemplateColumns: "130px 28px 130px 28px 130px 28px 150px 28px 150px 28px 130px",
                gridTemplateRows: "auto 20px auto",
                columnGap: 0,
              }}
            >
              {FLOW_STEPS.map((step, i) => (
                <Fragment key={step.number}>
                  <div style={{ gridColumn: i * 2 + 1, gridRow: 1 }}>
                    <FlowNode number={step.number} label={step.label} />
                  </div>
                  {i < FLOW_STEPS.length - 1 && (
                    <div style={{ gridColumn: i * 2 + 2, gridRow: 1 }} className="flex h-full items-center justify-center text-slate-600">
                      →
                    </div>
                  )}
                </Fragment>
              ))}

              {/* connector lines from Account type (col 3) and Document upload (col 7) down to their branches */}
              <div style={{ gridColumn: 3, gridRow: 2 }} className="mx-auto h-full w-px bg-slate-700" />
              <div style={{ gridColumn: 7, gridRow: 2 }} className="mx-auto h-full w-px bg-slate-700" />

              <div style={{ gridColumn: 3, gridRow: 3 }}>
                <FlowNode number={4} label="Joint applicant" sublabel="if joint account" highlight />
              </div>
              <div style={{ gridColumn: 7, gridRow: 3 }}>
                <FlowNode number={6} label="Upload error" sublabel="↻ retries to 5" highlight />
              </div>
            </div>
          </div>
        </div>

        {/* Shared components */}
        <div className="mt-20">
          <SectionHeading>Shared components</SectionHeading>
          <p className="mt-3 max-w-2xl leading-relaxed text-slate-400">
            Every screen draws from the same six components below — no one-off styling per screen. Where a component recurs, it's noted.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ComponentShowcaseCard title="Button" note="Forward action on 2, 3, 4, 5, 7 · edit action on 7">
              <div className="flex flex-col items-start gap-2.5">
                <Button variant="primary">Continue</Button>
                <Button variant="secondary">Back</Button>
                <Button variant="ghost">Edit</Button>
              </div>
            </ComponentShowcaseCard>

            <ComponentShowcaseCard title="Input" note="All text fields on 3, 4 · masked/error variants specifically on 3, 4">
              <div className="flex flex-col gap-2.5">
                <Input label="First name" placeholder="Jane" value="" onChange={() => {}} />
                <Input label="Date of birth" error="Enter a valid date" value="" onChange={() => {}} />
              </div>
            </ComponentShowcaseCard>

            <ComponentShowcaseCard
              title="Checkbox & radio"
              note="Radio underlies the account-type cards on 2 · checkbox gates consent on 7"
            >
              <div className="flex flex-col gap-3">
                <Radio label="Individual account" checked onChange={() => {}} />
                <Checkbox label="I agree to the terms" checked onChange={() => {}} />
              </div>
            </ComponentShowcaseCard>

            <ComponentShowcaseCard title="Badge" note="Document status on 5, 6 · consent state referenced on 8">
              <div className="flex flex-wrap gap-2">
                <Badge tone="neutral">Pending</Badge>
                <Badge tone="success">Uploaded</Badge>
                <Badge tone="warning">Action needed</Badge>
                <Badge tone="error">Rejected</Badge>
              </div>
            </ComponentShowcaseCard>

            <ComponentShowcaseCard title="Select" note="Available for address fields on 3, 4; not needed by this flow's demo data">
              <Select label="Province" options={PROVINCE_OPTIONS} value="on" onChange={() => {}} />
            </ComponentShowcaseCard>

            <ComponentShowcaseCard title="Card" note="Account-type options (2), upload dropzones (5, 6), review summaries (7)">
              <div
                className="rounded-md border p-4 text-sm"
                style={{ borderColor: "var(--border-subtle)", color: "var(--text-secondary)" }}
              >
                The surface behind every grouped section
              </div>
            </ComponentShowcaseCard>
          </div>
        </div>

        {/* Interactive prototype */}
        <div className="mt-20">
          <SectionHeading>Interactive prototype</SectionHeading>
          <p className="mt-3 max-w-2xl leading-relaxed text-slate-400">
            Click through it. Choices branch the flow the same way they would in production — choose "joint" on screen 2 and screen 4
            appears; simulate a rejected photo on screen 5 and you land on the error-recovery screen (6) instead of skipping to review.
          </p>
          <p className="mt-1.5 text-xs text-slate-500">
            Designed at 1440px desktop width, shown responsively below. Tablet and mobile notes follow the prototype.
          </p>
          <div className="mt-8">
            <KycPrototype />
          </div>
        </div>

        {/* Responsive behavior */}
        <div className="mt-20">
          <SectionHeading>Responsive behavior</SectionHeading>
          <p className="mt-3 max-w-2xl leading-relaxed text-slate-400">
            The prototype above is designed desktop-first at 1440px. Each screen adapts as follows going down to tablet (768px) and mobile
            (390px).
          </p>
          <div className="mt-8 overflow-x-auto rounded-lg border border-slate-300/10">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead className="border-b border-slate-300/10 bg-slate-800/50">
                <tr>
                  <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Screen</th>
                  <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Tablet · 768px</th>
                  <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Mobile · 390px</th>
                </tr>
              </thead>
              <tbody>
                {RESPONSIVE_ROWS.map((row) => (
                  <tr key={row.screen} className="border-b border-slate-300/10 last:border-none">
                    <td className="py-4 px-6 align-top text-sm font-semibold text-slate-200 whitespace-nowrap">{row.screen}</td>
                    <td className="py-4 px-6 align-top text-sm text-slate-400">{row.tablet}</td>
                    <td className="py-4 px-6 align-top text-sm text-slate-400">{row.mobile}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Accessibility */}
        <div className="mt-20">
          <SectionHeading>Accessibility</SectionHeading>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-slate-200">Status badge contrast</h3>
            <p className="mt-3 max-w-2xl leading-relaxed text-slate-400">
              All four badges use ink-toned text on a tinted background rather than saturated color on white — that's also what keeps
              their contrast in range.
            </p>
            <div className="mt-6 overflow-x-auto rounded-lg border border-slate-300/10">
              <table className="w-full min-w-[720px] border-collapse text-left">
                <thead className="border-b border-slate-300/10 bg-slate-800/50">
                  <tr>
                    <th className="py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Badge</th>
                    <th className="py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Colors</th>
                    <th className="py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Ratio</th>
                    <th className="py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {CONTRAST_ROWS.map((row) => (
                    <tr key={row.tone} className="border-b border-slate-300/10 text-sm last:border-none">
                      <td className="py-4 px-6 align-middle">
                        <div style={kycThemeVars}>
                          <Badge tone={row.tone}>{row.label}</Badge>
                        </div>
                      </td>
                      <td className="py-4 px-6 align-middle text-slate-400">{row.colors}</td>
                      <td className="py-4 px-6 align-middle font-mono text-slate-300">{row.ratio}</td>
                      <td className={`py-4 px-6 align-middle ${row.pass ? "text-emerald-400" : "text-amber-400"}`}>{row.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            <div>
              <h3 className="text-lg font-semibold text-slate-200">Masked SIN field</h3>
              <p className="mt-3 leading-relaxed text-slate-400">
                The field is a real <code className="text-slate-300">&lt;input type="password"&gt;</code> with a visible label, not a
                masked span dressed up to look like one. On focus, a screen reader announces "Social insurance number (SIN), edit text,
                password" — the word "password" is what communicates the value is obscured, so nothing extra needs bolting on to explain
                the mask. The reveal toggle is a real button with an aria-label that switches between "Show SIN" and "Hide SIN" as it's
                pressed, so the state change is announced too, not just shown.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-200">Keyboard flow</h3>
              <p className="mt-3 leading-relaxed text-slate-400">
                Tab order on every screen follows the visual order: fields first, then Back, then the primary action — Continue, Try
                again, or Submit. When Continue moves the user to a new screen, focus doesn't stay on a button that no longer exists or
                fall back to the top of the page — it moves to that screen's heading, made focusable with tabindex="-1" for exactly this
                purpose. That's the difference between a keyboard user losing their place on every step and knowing where they landed.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-200">Focus states</h3>
              <p className="mt-3 leading-relaxed text-slate-400">
                Every interactive element — Continue, Back, Try again, the account-type cards, the SIN reveal toggle — gets a 2px outline
                in the accent focus ring color with a 2px offset, applied through :focus-visible so it only shows for keyboard focus, not
                mouse clicks. It's the one place in this system a color is used more assertively than elsewhere, on purpose.
              </p>
            </div>
          </div>
        </div>

        {/* Constraints */}
        <div className="mt-20">
          <SectionHeading>Constraints and tradeoffs</SectionHeading>
          <p className="mt-4 max-w-4xl leading-relaxed text-slate-400">
            Inline validation was chosen over a summary error list mainly to cut the back-and-forth at the review screen — a user
            shouldn't have to jump between a list of errors and the form to fix them. The tradeoff is timing: validating on every
            keystroke would mark the SIN field invalid while the user is still three digits into typing it, which reads as broken.
            Validation runs on blur instead, after the user leaves the field, so an error only appears once they've actually finished
            with it.
          </p>
        </div>

        {/* What's next */}
        <div className="mt-16">
          <SectionHeading>What I'd test next</SectionHeading>
          <p className="mt-4 max-w-4xl leading-relaxed text-slate-400">
            The first thing I'd want to watch is whether the individual-vs-joint fork on screen 2 is understood before someone commits to
            it — does anyone pick joint, then get surprised when a second applicant's details show up on screen 4? The second is whether
            the inline, in-place error recovery on screen 6 actually keeps people in the flow, compared to a generic "upload failed" toast
            that dumps them back at the top of the upload screen. Both are the kind of thing that's easy to have an opinion on and hard to
            know without watching a handful of people actually hit them.
          </p>
        </div>

        {/* Process */}
        <div className="mt-16 mb-4">
          <SectionHeading>Process</SectionHeading>
          <p className="mt-4 max-w-4xl leading-relaxed text-slate-400">
            The flow and its two branches — individual vs. joint, and the upload failure loop — were mapped out before any screen was
            designed, so the joint-applicant and error-recovery screens were built as real states from the start, not patched in later.
            The shared component set — button, input, checkbox and radio, badge, select, card — was defined next, before the eight screens
            were laid out, so every screen pulled from the same set instead of accumulating one-off styling. Responsive behavior was
            planned per screen alongside the desktop layout, not left as a pass at the end.
          </p>
        </div>
      </div>
    </div>
  );
}
