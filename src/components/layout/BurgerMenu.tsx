type BurgerMenuProps = {
  open: boolean;
  onToggle: () => void;
};

function BurgerMenu({
  open,
  onToggle,
}: BurgerMenuProps) {
  return (
    <button
      className="burger-button"
      onClick={onToggle}
      aria-label={
        open
          ? "Fermer le menu"
          : "Ouvrir le menu"
      }
    >
      {open ? "✕" : "☰"}
    </button>
  );
}

export default BurgerMenu;