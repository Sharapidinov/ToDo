import { ReactNode } from "react";
import { Header } from "./header";
import styles from "./layout.module.scss";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <Header />
      {children}
    </div>
  );
};
