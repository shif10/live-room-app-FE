import React from "react";

import { styles } from "../pages/Dashboard/style";
import TopNav from "../components/Topnav";

const MainLayout = ({ children }: { children: React.ReactNode }) => {


  return (
    <div >
      <TopNav /> 
      <div style={styles.main}>
       
        <div style={styles.mainContent}>{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
