import Link from "next/link";

export default function InboxLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="shell">
      <aside className="rail">
        <Link className="wordmark" href="/">
          InboxPilot
        </Link>
        <nav aria-label="Workspace">
          <Link href="/inbox" aria-current="page">
            Inbox
          </Link>
          <span className="rail-soon">
            Knowledge <span className="soon">Soon</span>
          </span>
          <span className="rail-soon">
            Settings <span className="soon">Soon</span>
          </span>
        </nav>
      </aside>
      <div className="shell-main">{children}</div>
    </div>
  );
}
