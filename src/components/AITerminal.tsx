const runCommand = async (cmd: string) => {
  setLogs((prev) => [...prev, `> ${cmd}`, "⏳ processing..."]);

  try {
    const res = await fetch("http://localhost:3001/api/command", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ command: cmd }),
    });

    const data = await res.json();

    setLogs((prev) => [
      ...prev,
      `> ${cmd}`,
      data.response,
    ]);

  } catch (err) {
    setLogs((prev) => [
      ...prev,
      `> ${cmd}`,
      "❌ backend offline",
    ]);
  }
};
