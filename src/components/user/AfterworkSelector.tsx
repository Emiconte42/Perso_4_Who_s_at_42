import { useEffect, useState } from "react";

import { setAfterwork } from "../../services/users";

type AfterworkSelectorProps = {
  userId: string;
  afterwork: boolean;
};

function AfterworkSelector({
  userId,
  afterwork,
}: AfterworkSelectorProps) {
  const [checked, setChecked] =
    useState(afterwork);

  useEffect(() => {
    setChecked(afterwork);
  }, [afterwork]);

  async function handleChange() {
    const value = !checked;

    setChecked(value);

    await setAfterwork(
      userId,
      value
    );
  }

  return (
    <div
      style={{
        marginTop: "18px",
        paddingTop: "12px",
        borderTop:
          "1px dashed rgba(0,255,136,.3)",
        fontSize: "13px",
        fontStyle: "italic",
        color: "#8fbfa5",
      }}
    >
      <p
        style={{
          margin: "0 0 8px",
        }}
      >
        Qui est partant pour un verre ce soir ?
      </p>

      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        />

        Moi
      </label>
    </div>
  );
}

export default AfterworkSelector;