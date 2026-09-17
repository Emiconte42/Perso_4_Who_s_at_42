import { useEffect, useState } from "react";

import {
  setGeoEnabled,
  setCoordinates,
} from "../../services/users";

type GeoLocationProps = {
  userId: string;
  geoEnabled: boolean;
};

function GeoLocation({
  userId,
  geoEnabled,
}: GeoLocationProps) {
  const [loading, setLoading] =
    useState(false);

  const [enabled, setEnabled] =
    useState(geoEnabled);

  useEffect(() => {
    setEnabled(geoEnabled);
  }, [geoEnabled]);

  async function enableGps() {
    if (loading || enabled) {
      return;
    }

    if (!navigator.geolocation) {
      alert(
        "La géolocalisation n'est pas supportée."
      );
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setEnabled(true);

        await setCoordinates(
          userId,
          position.coords.latitude,
          position.coords.longitude
        );

        await setGeoEnabled(
          userId,
          true
        );

        setLoading(false);
      },

      async () => {
        setEnabled(false);

        await setGeoEnabled(
          userId,
          false
        );

        setLoading(false);

        alert(
          "Vous avez refusé la géolocalisation."
        );
      },

      {
        enableHighAccuracy: true,
      }
    );
  }

  async function disableGps() {
    if (loading || !enabled) {
      return;
    }

    setLoading(true);

    setEnabled(false);

    await setGeoEnabled(
      userId,
      false
    );

    setLoading(false);
  }

  return (
    <>
      <h3>📡 GÉOLOCALISATION</h3>

      <fieldset disabled={loading}>
        <label>
          <input
            type="radio"
            checked={enabled}
            onChange={enableGps}
          />
          Activée
        </label>

        <label>
          <input
            type="radio"
            checked={!enabled}
            onChange={disableGps}
          />
          Désactivée
        </label>
      </fieldset>
    </>
  );
}

export default GeoLocation;