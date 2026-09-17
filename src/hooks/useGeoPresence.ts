import { useEffect } from "react";

import {
  setCoordinates,
  setOnlineStatus,
} from "../services/users";

const SCHOOL_LAT = 48.896683;
const SCHOOL_LNG = 2.318109;

// Rayon pour être considéré présent
const SCHOOL_RADIUS = 50;

// Distance minimale avant une mise à jour Firebase
const UPDATE_DISTANCE = 100;

function distanceMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371000;

  const dLat =
    ((lat2 - lat1) * Math.PI) / 180;

  const dLon =
    ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return (
    2 *
    R *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    )
  );
}

export function useGeoPresence(
  userId: string,
  geoEnabled: boolean,
  online: boolean,
  lastLatitude: number,
  lastLongitude: number
) {
  useEffect(() => {
    // GPS désactivé -> aucun suivi
    if (!geoEnabled) {
      return;
    }

    if (!navigator.geolocation) {
      console.error(
        "Géolocalisation indisponible"
      );
      return;
    }

    console.log("📡 GPS activé");

    const watchId =
      navigator.geolocation.watchPosition(
        async ({ coords }) => {
          const latitude =
            coords.latitude;

          const longitude =
            coords.longitude;

          const firstPosition =
            lastLatitude === 0 &&
            lastLongitude === 0;

          const movedDistance =
            firstPosition
              ? UPDATE_DISTANCE + 1
              : distanceMeters(
                  lastLatitude,
                  lastLongitude,
                  latitude,
                  longitude
                );

          // Ignore les petits déplacements
          if (
            movedDistance <
            UPDATE_DISTANCE
          ) {
            return;
          }

          await setCoordinates(
            userId,
            latitude,
            longitude
          );

          const schoolDistance =
            distanceMeters(
              latitude,
              longitude,
              SCHOOL_LAT,
              SCHOOL_LNG
            );

          const shouldBeOnline =
            schoolDistance <=
            SCHOOL_RADIUS;

          if (
            shouldBeOnline !== online
          ) {
            await setOnlineStatus(
              userId,
              shouldBeOnline
            );
          }

          console.log(
            `📍 ${Math.round(
              schoolDistance
            )} m de 42`
          );
        },

        (error) => {
          console.error(error);
        },

        {
          enableHighAccuracy: true,
          maximumAge: 30000,
          timeout: 10000,
        }
      );

    // IMPORTANT :
    // Dès que geoEnabled passe à false,
    // React exécute cette fonction
    // et stoppe totalement le GPS.
    return () => {
      console.log("GPS arrêté");

      navigator.geolocation.clearWatch(
        watchId
      );
    };
  }, [
    userId,
    geoEnabled,
    online,
    lastLatitude,
    lastLongitude,
  ]);
}