import {
  setCoordinates,
  setGeoEnabled,
} from "../../services/users";

type GeoLocationSelectorProps = {
  userId: string;
  geoEnabled: boolean;
};

function GeoLocationSelector({
  userId,
  geoEnabled,
}: GeoLocationSelectorProps) {

  async function handleChange() {

    // Désactivation
    if (geoEnabled) {
      await setGeoEnabled(userId, false);
      return;
    }

    if (!navigator.geolocation) {
      alert("Votre navigateur ne supporte pas la géolocalisation.");
      return;
    }

    navigator.geolocation.watchPosition(
      async (position) => {

        await setCoordinates(
          userId,
          position.coords.latitude,
          position.coords.longitude
        );

      },
      () => {
        alert("Autorisation refusée.");
      },
      {
        enableHighAccuracy: true,
      }
    );

    await setGeoEnabled(userId, true);
  }

  return (
    <>
      <h3>📡 GÉOLOCALISATION</h3>

      <label>
        <input
          type="checkbox"
          checked={geoEnabled}
          onChange={handleChange}
        />

        Activer la géolocalisation
      </label>
    </>
  );
}

export default GeoLocationSelector;