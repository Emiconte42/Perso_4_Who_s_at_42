import { setLunchTime } from "../../services/users";

const lunchTimes = [
  "11h00",
  "11h30",
  "12h00",
  "12h30",
  "13h00",
  "13h30",
  "14h00",
];

type TimeSelectorProps = {
  userId: string;
  participatesLunch: boolean;
  lunchTime: string;
};

function TimeSelector({
  userId,
  participatesLunch,
  lunchTime,
}: TimeSelectorProps) {
  return (
    <fieldset
      disabled={!participatesLunch}
      style={{
        opacity: participatesLunch ? 1 : 0.4,
      }}
    >
      <h2>🕐 HEURE DE DÉJEUNER</h2>

      <select
        value={lunchTime}
        onChange={(e) =>
          setLunchTime(
            userId,
            e.target.value
          )
        }
      >
        <option value="">
          Choisir une heure...
        </option>

        {lunchTimes.map((time) => (
          <option
            key={time}
            value={time}
          >
            {time}
          </option>
        ))}
      </select>
    </fieldset>
  );
}

export default TimeSelector;