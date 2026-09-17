import TeamTable from "../team/TeamTable";
import LunchStats from "../team/LunchStats";
import AfterworkList from "../team/AfterworkList";

function RightPanel() {
  return (
    <section className="right-panel">
      <h2>La team 42 chill&snack</h2>

      <TeamTable />

      <LunchStats />

      <AfterworkList />
    </section>
  );
}

export default RightPanel;