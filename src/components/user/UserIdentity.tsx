type UserIdentityProps = {
  name: string;
};

function UserIdentity({ name }: UserIdentityProps) {
  function logout() {
    localStorage.removeItem("user");
    window.location.reload();
  }

  return (
    <>
      <h2>{name}</h2>

      <button onClick={logout}>
        Changer d'utilisateur
      </button>
    </>
  );
}

export default UserIdentity;