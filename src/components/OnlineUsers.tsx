import { useUsers } from "../hooks/useUsers";

function OnlineUsers() {
  const { users, loading } = useUsers();

  if (loading) {
    return <p>Chargement des utilisateurs...</p>;
  }

  const onlineUsers = users.filter((user) => user.online);

  return (
    <>
      <h2>🟢 {onlineUsers.length} personne(s) présente(s)</h2>

      {onlineUsers.length === 0 && (
        <p>Personne n'est présent pour le moment.</p>
      )}

      {onlineUsers.map((user) => (
        <div key={user.name}>
          <p>
            🟢 {user.name}
            {user.location && ` 📍 ${user.location}`}
          </p>
        </div>
      ))}
    </>
  );
}

export default OnlineUsers;