export async function autoCommitChange(change: {
  file: string;
  content: string;
  message: string;
}) {
  console.log("📡 Committing change:", change);

  // placeholder for real GitHub API integration
  return {
    status: "queued",
    message: change.message,
  };
}