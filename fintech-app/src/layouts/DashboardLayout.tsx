import React from "react";
import styles from './DashboardLayout.module.css'

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={styles.dashboard}>
      <aside>Sidebar</aside>
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayout;
