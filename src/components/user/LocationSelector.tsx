import { locations } from "../../data/locations";
import { setLocation } from "../../services/users";

type LocationSelectorProps = {
  userId: string;
  currentLocation: string;
};

function LocationSelector({
  userId,
  currentLocation,
}: LocationSelectorProps) {
  return (
    <>
      <h3>📍 OÙ ES-TU ?</h3>

      <select
        value={currentLocation}
        onChange={(e) =>
          setLocation(userId, e.target.value)
        }
      >
        <option value="">
          Choisir un emplacement...
        </option>

        {locations.map((location) => (
          <option
            key={location}
            value={location}
          >
            {location}
          </option>
        ))}
      </select>
    </>
  );
}

export default LocationSelector;