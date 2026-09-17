import UserCard from "./UserCard";

type User = {
  name: string;
  location: string;
};

type PresentUsersProps = {
  users: User[];
};

function PresentUsers({ users }: PresentUsersProps) {
  return (
    <>
      {users.map((user) => (
        <UserCard
          key={user.name}
          name={user.name}
          online={true}
          location={user.location}
        />
      ))}
    </>
  );
}

export default PresentUsers;