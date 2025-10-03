import React from "react";

const LandingLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <header>Landing Header</header>
      <main>{children}</main>
      <footer>Landing Footer</footer>
    </div>
  );
};

export default LandingLayout;
