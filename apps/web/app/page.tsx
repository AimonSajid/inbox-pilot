import Link from "next/link";
import type { HealthResponse } from "@inbox-pilot/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

async function loadHealth(): Promise<HealthResponse | null> {
  try {
    const response = await fetch(`${API_URL}/health`, { cache: "no-store" });
    if (!response.ok) {
      return null;
    }
    return (await response.json()) as HealthResponse;
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const health = await loadHealth();
  const apiUp = health?.status === "ok";

  return (
    <main className="landing">
      <header className="topbar">
        <span className="wordmark">InboxPilot</span>
        <Link className="button" href="/inbox">
          Open inbox
        </Link>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">Support inbox</p>
          <h1>Live chat, one shared inbox.</h1>
          <p className="lede">
            Website visitors write in through a chat widget. Agents answer from
            one workspace, with AI drafts drawn from the company knowledge base.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/inbox">
              Open inbox
            </Link>
            <a className="button secondary" href={`${API_URL}/health`}>
              API health
            </a>
          </div>
        </div>
        <aside className="status-card" aria-live="polite">
          <p className="status-label">Local API</p>
          <p className={apiUp ? "status-value ok" : "status-value bad"}>
            {apiUp ? "Ready" : "Unreachable"}
          </p>
          <p>
            {health
              ? `${health.service} · database ${health.database}`
              : "Start the API to see a shared health check here."}
          </p>
        </aside>
      </section>

      <section className="steps" aria-label="Product shape">
        <article className="step">
          <span>01</span>
          <h2>Widget</h2>
          <p>Visitors chat from the site they are already on. No customer portal.</p>
        </article>
        <article className="step">
          <span>02</span>
          <h2>Inbox</h2>
          <p>Agents reply, assign, and resolve conversations as they arrive.</p>
        </article>
        <article className="step">
          <span>03</span>
          <h2>Drafts</h2>
          <p>Suggested replies come from the workspace knowledge base. Agents send them.</p>
        </article>
      </section>

      <footer className="landing-footer">InboxPilot</footer>
    </main>
  );
}
