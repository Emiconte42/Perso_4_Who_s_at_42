import { useState } from "react";

import { useUsers } from "../../hooks/useUsers";

type LoginProps = {
  onLogin: (userId: string) => void;
};

function Login({ onLogin }: LoginProps) {
  const { users, loading } = useUsers();

  const [selectedUser, setSelectedUser] =
    useState("");

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <main className="login-page">

      <section className="login-card">

        <h1>🚀 WHO'S @42</h1>

        <h2>Qui es-tu ?</h2>

        <select
          value={selectedUser}
          onChange={(e) =>
            setSelectedUser(e.target.value)
          }
        >
          <option value="">
            -- Choisir --
          </option>

          {users
            .sort((a, b) =>
              a.name.localeCompare(b.name)
            )
            .map((user) => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
        </select>

        <button
          disabled={selectedUser === ""}
          onClick={() =>
            onLogin(selectedUser)
          }
        >
          Entrer
        </button>

      </section>

    </main>
  );
}

export default Login;