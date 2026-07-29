import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Workspace() {
  const [workflows, setWorkflows] = useState([]);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch workflows on mount
  useEffect(() => {
    fetchWorkflows();
  }, []);

  async function fetchWorkflows() {
    setLoading(true);
    const { data, error } = await supabase
      .from("workflows")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error("Fetch error:", error);
    else setWorkflows(data || []);

    setLoading(false);
  }

  async function createWorkflow() {
    if (!newName.trim()) return;

    const { data, error } = await supabase
      .from("workflows")
      .insert([{ name: newName, status: "paused" }])
      .select();

    if (error) {
      console.error("Create error:", error);
      return;
    }

    setNewName("");
    setWorkflows((prev) => [...data, ...prev]);
  }

  async function toggleWorkflowStatus(id, currentStatus) {
    const newStatus = currentStatus === "running" ? "paused" : "running";

    const { data, error } = await supabase
      .from("workflows")
      .update({ status: newStatus })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Toggle error:", error);
      return;
    }

    setWorkflows((prev) =>
      prev.map((w) => (w.id === id ? data[0] : w))
    );
  }

  async function deleteWorkflow(id) {
    const { error } = await supabase.from("workflows").delete().eq("id", id);
    if (error) {
      console.error("Delete error:", error);
      return;
    }

    setWorkflows((prev) => prev.filter((w) => w.id !== id));
  }

  return (
    <div className="workspace-container">
      <h2 className="workspace-title">Workspace</h2>

      {/* Create Workflow */}
      <div className="workspace-create">
        <input
          type="text"
          placeholder="New workflow name..."
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="workspace-input"
        />
        <button onClick={createWorkflow} className="workspace-btn">
          Create
        </button>
      </div>

      {/* Workflow List */}
      <div className="workspace-list">
        {loading && <p>Loading workflows...</p>}

        {!loading && workflows.length === 0 && (
          <p>No workflows yet — create one!</p>
        )}

        {workflows.map((workflow) => (
          <div key={workflow.id} className="workspace-item">
            <div className="workspace-info">
              <h3>{workflow.name}</h3>
              <p>Status: {workflow.status}</p>
            </div>

            <div className="workspace-actions">
              <button
                onClick={() =>
                  toggleWorkflowStatus(workflow.id, workflow.status)
                }
                className="workspace-btn"
              >
                {workflow.status === "running" ? "Pause" : "Play"}
              </button>

              <button
                onClick={() => deleteWorkflow(workflow.id)}
                className="workspace-btn delete"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
