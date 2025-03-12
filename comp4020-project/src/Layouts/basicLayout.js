import { Outlet, Link } from "react-router-dom";
import NavBar from "../components/NavBar";
const basicLayout = () => {
  return (
    //limit the consol size style={{ maxWidth: '430px', maxHeight: '932px', margin: '0 auto', padding: '20px' }}
   <div  style={{ maxWidth: '430px', maxHeight: '932px', margin: '0 auto', padding: '20px' }}> 
      <NavBar/>
      <Outlet />
      </div>
  )
};

export default basicLayout;