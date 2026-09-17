type UserCardProps = {
  name: string;
  online: boolean;
  location?: string;
};

function UserCard({ name, online, location }: UserCardProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 16px",
        marginBottom: "10px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        backgroundColor: online ? "#f4fff6" : "#f8f8f8",
      }}
    >
      <span>
        {online ? "🟢" : "⚫"} {name}
      </span>

      {online && location && <span>📍 {location}</span>}
    </div>
  );
}

export default UserCard;