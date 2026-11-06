import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.actions}></div>
    </header>
  );
}

export default Header;
