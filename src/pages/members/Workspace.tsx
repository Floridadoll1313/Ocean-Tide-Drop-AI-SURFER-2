import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

type Workflow = {
  id: string;
  name: string;
  status: "running" | "paused";
  created_at: string;
  // user_id is enforced by RLS; no need to expose here unless you want it
};

export default function Workspace() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch on mount
  useEffect(() => {
    fetchWorkflows();
  }, []);

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel("workflows-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "workflows",
        },
        (payload) => {
          setWorkflows((prev) => {
            switch (payload.eventType) {
              case "INSERT": {
                const inserted = payload.new as Workflow;
                // Avoid duplicates
                if (prev.find((w) => w.id === inserted.id)) return prev;
                return [inserted, ...prev];
              }
              case "UPDATE": {
                const updated = payload.new as Workflow;
                return prev.map((w) => (w.id === updated.id ? updated : w));
              }
              case "DELETE": {
                const removed = payload.old as Workflow;
                return prev.filter((w) => w.id !== removed.id);
              }
              default:
                return prev;
            }
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchWorkflows() {
    setLoading(true);
    const { data, error } = await supabase
      .from("workflows")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch workflows error:", error);
    } else {
      setWorkflows((data || []) as Workflow[]);
    }
    setLoading(false);
  }

  async function createWorkflow() {
    if (!newName.trim()) return;

    const { error } = await supabase
      .from("workflows")
      .insert([{ name: newName.trim(), status: "paused" }]);

    if (error) {
      console.error("Create workflow error:", error);
      return;
    }

    setNewName("");
    // No manual state update needed; realtime will pick up INSERT
  }

  async function toggleWorkflowStatus(id: string, currentStatus: Workflow["status"]) {
    const newStatus = currentStatus === "running" ? "paused" : "running";

    const { error } = await supabase
      .from("workflows")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      console.error("Toggle workflow status error:", error);
    }
    // Realtime will handle UPDATE
  }

  async function deleteWorkflow(id: string) {
    const { error } = await supabase.from("workflows").delete().eq("id", id);

    if (error) {
      console.error("Delete workflow error:", error);
    }
    // Realtime will handle DELETE
  }

  return (
    <div className="workspace-container">
      <header className="workspace-header">
        <h2 className="workspace-title">Workspace</h2>
        <p className="workspace-subtitle">
          Design, run, and control your AI workflows in real time.
        </p>
      </header>

      {/* Create Workflow */}
      <section className="workspace-create">
        <input
          type="text"
          placeholder="Name your new workflow..."
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="workspace-input"
        />
        <button onClick={createWorkflow} className="workspace-btn primary">
          Create Workflow
        </button>
      </section>

      {/* Workflow List */}
      <section className="workspace-list">
        {loading && <p className="workspace-status">Loading workflows...</p>}

        {!loading && workflows.length === 0 && (
          <p className="workspace-status">
            No workflows yet. Create one to start your automation ocean.
          </p>
        )}

        {workflows.map((workflow) => (
          <div key={workflow.id} className="workspace-item">
            <div className="workspace-info">
              <h3 className="workspace-name">{workflow.name}</h3>
              <span
                className={
                  workflow.status === "running"
                    ? "workspace-badge running"
                    : "workspace-badge paused"
                }
              >
                {workflow.status === "running" ? "Running" : "Paused"}
              </span>
            </div>

            <div className="workspace-actions">
              <button
                onClick={() =>
                  toggleWorkflowStatus(workflow.id, workflow.status)
                }
                className={
                  workflow.status === "running"
                    ? "workspace-btn secondary"
                    : "workspace-btn primary"
                }
              >
                {workflow.status === "running" ? "Pause" : "Play"}
              </button>

              <button
                onClick={() => deleteWorkflow(workflow.id)}
                className="workspace-btn danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
            }
