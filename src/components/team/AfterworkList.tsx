import { useUsers } from "../../hooks/useUsers";

function AfterworkList() {
  const { users, loading } = useUsers();

  if (loading) {
    return null;
  }

  const participants = users.filter(
    (user) =>
      user.online &&
      user.afterwork
  );

  if (participants.length === 0) {
    return null;
  }

  return (
    <>
      <hr />

      <p
        style={{
          fontStyle: "italic",
          color: "#8fbfa5",
          marginBottom: "12px",
        }}
      >
        Qui est partant pour un verre ce soir ?
      </p>

      {participants.map((user) => (
        <p
          key={user.id}
          style={{
            margin: "4px 0",
          }}
        >
          • {user.name}
        </p>
      ))}
    </>
  );
}

export default AfterworkList;