import {
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase";

export async function setOnlineStatus(
  userId: string,
  online: boolean
) {
  await updateDoc(doc(db, "users", userId), {
    online,
  });
}

export async function setLocation(
  userId: string,
  location: string
) {
  await updateDoc(doc(db, "users", userId), {
    location,
  });
}

export async function setParticipatesLunch(
  userId: string,
  participatesLunch: boolean
) {
  await updateDoc(doc(db, "users", userId), {
    participatesLunch,
    lunchTime: "",
    meal: "",
  });
}

export async function setMeal(
  userId: string,
  meal: string
) {
  await updateDoc(doc(db, "users", userId), {
    meal,
  });
}

export async function setLunchTime(
  userId: string,
  lunchTime: string
) {
  await updateDoc(doc(db, "users", userId), {
    lunchTime,
  });
}

export async function setGeoEnabled(
  userId: string,
  geoEnabled: boolean
) {
  await updateDoc(doc(db, "users", userId), {
    geoEnabled,
  });
}

export async function setCoordinates(
  userId: string,
  latitude: number,
  longitude: number
) {
  await updateDoc(doc(db, "users", userId), {
    latitude,
    longitude,
  });
}

export async function setAfterwork(
  userId: string,
  afterwork: boolean
) {
  await updateDoc(doc(db, "users", userId), {
    afterwork,
  });
}