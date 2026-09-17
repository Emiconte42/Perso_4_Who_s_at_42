import { forwardRef } from "react";

import type { User } from "../../types/User";

import UserIdentity from "../user/UserIdentity";
import StatusCard from "../user/StatusCard";
import LocationSelector from "../user/LocationSelector";
import MealSelector from "../user/MealSelector";
import TimeSelector from "../user/TimeSelector";
import GeoLocation from "../user/GeoLocation";
import AfterworkSelector from "../user/AfterworkSelector";

type LeftPanelProps = {
  userId: string;
  user: User;
  open: boolean;
  onClose: () => void;
};

const LeftPanel = forwardRef<
  HTMLElement,
  LeftPanelProps
>(({ userId, user, open, onClose }, ref) => {
  return (
    <aside
      ref={ref}
      className={
        open
          ? "left-panel left-panel-open"
          : "left-panel left-panel-closed"
      }
    >
      <UserIdentity
        name={user.name}
      />

      <hr />

      <StatusCard
        userId={userId}
        user={user}
      />

      <hr />

      <LocationSelector
        userId={userId}
        currentLocation={user.location}
      />

      <hr />

      <MealSelector
        userId={userId}
        participatesLunch={user.participatesLunch}
        meal={user.meal}
      />

      <hr />

      <TimeSelector
        userId={userId}
        participatesLunch={user.participatesLunch}
        lunchTime={user.lunchTime}
      />

      <hr />

      <GeoLocation
        userId={userId}
        geoEnabled={user.geoEnabled}
      />

      <AfterworkSelector
        userId={userId}
        afterwork={user.afterwork}
      />

      <hr />

      <div
        style={{
          marginTop: 18,
          textAlign: "center",
        }}
      >
        <span
          onClick={onClose}
          style={{
            cursor: "pointer",
            color: "#2e7d32",
            fontWeight: 600,
            userSelect: "none",
          }}
        >
          Valider
        </span>
      </div>
    </aside>
  );
});

LeftPanel.displayName = "LeftPanel";

export default LeftPanel;