import { useUsers } from "../../hooks/useUsers";

const lunchTimes = [
  "11h00",
  "11h30",
  "12h00",
  "12h30",
  "13h00",
  "13h30",
  "14h00",
  "14h30",
  "15h00",
];

function mealLabel(meal: string) {
  switch (meal) {
    case "apporte":
      return "J'ai apporté";

    case "cantine":
      return "Cantine";

    case "dehors":
      return "Dehors";

    default:
      return "—";
  }
}

function locationLabel(location: string) {
  switch (location.toLowerCase()) {
    case "42":
      return "🏢 42";

    case "non defini":
      return "non defini";

    case "bocal":
      return "🧠 Bocal";

    case "cafeteria":
    case "cafétéria":
      return "☕ Cafétéria";

    default:
      return location || "—";
  }
}

function TeamTable() {
  const { users, loading } = useUsers();

  if (loading) {
    return <p>Chargement...</p>;
  }

  const presentUsers = users
    .filter((u) => u.online)
    .sort((a, b) => {
      if (a.participatesLunch !== b.participatesLunch) {
        return a.participatesLunch ? -1 : 1;
      }

      const ia = lunchTimes.indexOf(a.lunchTime);
      const ib = lunchTimes.indexOf(b.lunchTime);

      if (ia !== ib) {
        return ia - ib;
      }

      return a.name.localeCompare(b.name);
    });

  const absentUsers = users
    .filter((u) => !u.online)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <table>
      <thead>
        <tr>
          <th align="center">👤</th>
          <th align="center">📍</th>
          <th align="center">🍽️</th>
          <th align="center">🕐</th>
        </tr>
      </thead>

      <tbody>
        {presentUsers.map((user) => (
  <tr
    key={user.id}
    className="present-row"
  >
            <td>{user.name}</td>

            <td>{locationLabel(user.location)}</td>

            <td>
              {user.participatesLunch
                ? mealLabel(user.meal)
                : "—"}
            </td>

            <td>
              {user.participatesLunch
                ? user.lunchTime
                : "—"}
            </td>
          </tr>
        ))}

{presentUsers.length > 0 &&
  absentUsers.length > 0 && (
    <tr className="separator-row">
      <td colSpan={4}></td>
    </tr>
)}

        {absentUsers.map((user) => (
          <tr
            key={user.id}
            className="absent-row"
          >
            <td>{user.name}</td>

            <td>Absent</td>

            <td>—</td>

            <td>—</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TeamTable;