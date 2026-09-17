import {
  setMeal,
  setParticipatesLunch,
} from "../../services/users";

type MealSelectorProps = {
  userId: string;
  participatesLunch: boolean;
  meal: string;
};

function MealSelector({
  userId,
  participatesLunch,
  meal,
}: MealSelectorProps) {
  return (
    <section>

      <h2>🍽️ DÉJEUNER</h2>

      <fieldset>

        <label>
          <input
            type="radio"
            name="participatesLunch"
            checked={participatesLunch}
            onChange={async () => {
              await setParticipatesLunch(
                userId,
                true
              );
            }}
          />

          Oui
        </label>

        <label>
          <input
            type="radio"
            name="participatesLunch"
            checked={!participatesLunch}
            onChange={async () => {
              await setParticipatesLunch(
                userId,
                false
              );
            }}
          />

          Non
        </label>

      </fieldset>

      <hr />

      <fieldset
        disabled={!participatesLunch}
        style={{
          opacity: participatesLunch ? 1 : 0.4,
        }}
      >

        <h2>🥪 REPAS</h2>

        <label>
          <input
            type="radio"
            name="meal"
            checked={meal === "apporte"}
            onChange={() =>
              setMeal(userId, "apporte")
            }
          />

          J'ai apporté mon repas
        </label>

        <label>
          <input
            type="radio"
            name="meal"
            checked={meal === "cantine"}
            onChange={() =>
              setMeal(userId, "cantine")
            }
          />

          Je prends à la cantine
        </label>

        <label>
          <input
            type="radio"
            name="meal"
            checked={meal === "dehors"}
            onChange={() =>
              setMeal(userId, "dehors")
            }
          />

          Je vais chercher dehors
        </label>

      </fieldset>

    </section>
  );
}

export default MealSelector;