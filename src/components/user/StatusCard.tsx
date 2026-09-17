import type { User } from "../../types/User";
import { setOnlineStatus } from "../../services/users";

type StatusCardProps = {
  userId: string;
  user: User;
};

function StatusCard({
  userId,
  user,
}: StatusCardProps) {
  return (
    <section>

      <h2>👤 STATUT</h2>

      <fieldset>

        <label>
          <input
            type="radio"
            checked={user.online}
            onChange={async () => {
              await setOnlineStatus(
                userId,
                true
              );
            }}
          />

          Présent
        </label>

        <label>
          <input
            type="radio"
            checked={!user.online}
            onChange={async () => {
              await setOnlineStatus(
                userId,
                false
              );
            }}
          />

          Absent
        </label>

      </fieldset>

    </section>
  );
}

export default StatusCard;