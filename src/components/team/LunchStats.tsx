import { useUsers } from "../../hooks/useUsers";

const lunchTimes = [
  "11h00",
  "11h30",
  "12h00",
  "12h30",
  "13h00",
  "13h30",
  "14h00",
  "14h30",
  "15h00",
];

function LunchStats() {
  const { users, loading } = useUsers();

  if (loading) {
    return <p>Calcul des statistiques...</p>;
  }

  const participants = users.filter(
    (user) =>
      user.online &&
      user.participatesLunch &&
      user.lunchTime !== ""
  );

  const counts = lunchTimes.map((time) => ({
    time,
    count: participants.filter(
      (user) => user.lunchTime === time
    ).length,
  }));

  const visibleCounts = counts.filter(
    ({ count }) => count > 0
  );

  const best = counts.reduce(
    (max, current) =>
      current.count > max.count
        ? current
        : max,
    {
      time: "",
      count: 0,
    }
  );

  const max = Math.max(
    ...counts.map((c) => c.count),
    1
  );

  return (
    <>
      <hr />

      <h2
        style={{
          margin: "12px 0 8px",
        }}
      >
        DÉPART POUR DÉJEUNER
      </h2>

      {best.count > 0 ? (
        <>
          <h1
            style={{
              marginBottom: 10,
            }}
          >
            {best.time}
          </h1>

          <p
            style={{
              textAlign: "center",
              marginBottom: 30,
            }}
          >
            👥 {best.count} personne
            {best.count > 1
              ? "s"
              : ""}
          </p>
        </>
      ) : (
        <p
          style={{
            textAlign: "center",
            margin: "0 0 12px",
          }}
        >
          Aucun horaire choisi.
        </p>
      )}

      <hr />

      <h3>Répartition</h3>

      {visibleCounts.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            opacity: 0.7,
          }}
        >
          Aucun créneau sélectionné.
        </p>
      ) : (
        visibleCounts.map(
          ({ time, count }) => (
            <div
              key={time}
              style={{
                display: "flex",
                alignItems:
                  "center",
                gap: "12px",
                marginBottom: "10px",
              }}
            >
              <span
                style={{
                  width: "60px",
                  fontSize: "14px",
                }}
              >
                {time}
              </span>

              <div
                className="progress"
                style={{
                  flex: 1,
                }}
              >
                <div
                  className="progress-fill"
                  style={{
                    width: `${
                      (count /
                        max) *
                      100
                    }%`,
                  }}
                />
              </div>

              <span
                style={{
                  width: "40px",
                  textAlign:
                    "right",
                  fontWeight:
                    count ===
                      best.count &&
                    count > 0
                      ? "bold"
                      : "normal",
                }}
              >
                {count}
                {count ===
                  best.count &&
                count > 0
                  ? " ⭐"
                  : ""}
              </span>
            </div>
          )
        )
      )}
    </>
  );
}

export default LunchStats;