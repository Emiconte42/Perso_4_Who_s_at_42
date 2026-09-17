type AbsentUsersProps = {
  users: string[];
};

function AbsentUsers({ users }: AbsentUsersProps) {
  return (
    <>
      {users.map((name) => (
        <p key={name}>⚫ {name}</p>
      ))}
    </>
  );
}

export default AbsentUsers;