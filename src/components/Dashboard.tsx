import { useEffect, useState } from "react";

import { useCurrentUser } from "../hooks/useCurrentUser";
import { useGeoPresence } from "../hooks/useGeoPresence";

import { setGeoEnabled } from "../services/users";

import Login from "./auth/Login";
import Header from "./layout/Header";
import BurgerMenu from "./layout/BurgerMenu";
import LeftPanel from "./layout/LeftPanel";
import RightPanel from "./layout/RightPanel";

function Dashboard() {
  const [currentUser, setCurrentUser] =
    useState(
      localStorage.getItem("user") || ""
    );

  const [menuOpen, setMenuOpen] =
    useState(false);

  const { user, loading } =
    useCurrentUser(currentUser);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    setGeoEnabled(currentUser, false);
  }, [currentUser]);

  useGeoPresence(
    currentUser,
    user?.geoEnabled ?? false,
    user?.online ?? false,
    user?.latitude ?? 0,
    user?.longitude ?? 0
  );

  if (!currentUser) {
    return (
      <Login
        onLogin={(userId) => {
          localStorage.setItem(
            "user",
            userId
          );

          setCurrentUser(userId);
        }}
      />
    );
  }

  if (loading || !user) {
    return <p>Chargement...</p>;
  }

  return (
    <main>
      <Header />

      <BurgerMenu
        open={menuOpen}
        onToggle={() =>
          setMenuOpen(!menuOpen)
        }
      />

      {menuOpen && (
        <div
          className="menu-overlay"
          onClick={() =>
            setMenuOpen(false)
          }
        />
      )}

      <div className="dashboard">
        <LeftPanel
          userId={currentUser}
          user={user}
          open={menuOpen}
          onClose={() =>
            setMenuOpen(false)
          }
        />

        <RightPanel />
      </div>
    </main>
  );
}

export default Dashboard;