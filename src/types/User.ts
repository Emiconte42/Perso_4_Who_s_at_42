export type MealType =
  | ""
  | "apporte"
  | "cantine"
  | "dehors";

export type User = {
  id: string;

  name: string;

  online: boolean;

  location: string;

  participatesLunch: boolean;

  meal: MealType;

  lunchTime: string;

  geoEnabled: boolean;

  latitude: number;

  longitude: number;

  afterwork: boolean;

  updatedAt?: Date;
};