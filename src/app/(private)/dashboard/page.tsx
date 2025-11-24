"use client";

export default function Dashboard() {
  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard (Área Protegida)</h1>

      <button onClick={logout}>Sair</button>
    </div>
  );
}
