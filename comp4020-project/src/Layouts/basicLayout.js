import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import MobileStatusBar from "../components/MobileStatusBar";

const basicLayout = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        
        
      }}
    >
      <div
        style={{
          maxWidth: "450px",
          width: "100%",
          maxHeight: "932px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          border: "3px solid #000000",
          borderRadius: "25px",
          overflow: "hidden",
          backgroundColor: "white",
        }}
      >
        <MobileStatusBar />
        <div
          style={{
            flex: 1,
            overflow: "auto",
            padding: "20px",
            scrollbarWidth: "none",
         
          }}
        >
          <Outlet />
        </div>
        <NavBar />
      </div>
    </div>
  );
};

export default basicLayout;
