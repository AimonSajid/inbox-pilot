import { CONVERSATION_STATUSES, type ConversationStatus } from "@inbox-pilot/types";

const STATUS_LABELS: Record<ConversationStatus, string> = {
  OPEN: "Open",
  PENDING: "Pending",
  RESOLVED: "Resolved",
};

export default function InboxPage() {
  return (
    <>
      <header className="shell-header">
        <h1 className="shell-title">Inbox</h1>
        <span className="workspace-chip">Workspace</span>
      </header>
      <div className="filters" role="group" aria-label="Conversation status">
        {CONVERSATION_STATUSES.map((status) => (
          <button
            key={status}
            className="filter"
            type="button"
            aria-pressed={status === "OPEN"}
          >
            {STATUS_LABELS[status]}
          </button>
        ))}
      </div>
      <section className="empty">
        <h2>No conversations yet</h2>
        <p>
          This shell is the agent inbox. Live visitor chat, assignment, and
          replies are not connected yet.
        </p>
      </section>
    </>
  );
}
