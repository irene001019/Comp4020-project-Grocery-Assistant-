import { useState } from "react";
import { RiBarChartGroupedFill } from "react-icons/ri";//analytics
import { RiFridgeLine } from "react-icons/ri";//storage
import { RiHome2Line } from "react-icons/ri";//home
import { RiNotification2Line } from "react-icons/ri";//notification
import { RiUser5Line } from "react-icons/ri";

function NavBar(){
    let menuList = [<RiBarChartGroupedFill/>, <RiFridgeLine/>, <RiHome2Line/>, <RiNotification2Line/>, <RiUser5Line/>];
    const [selectedItem, setSelectedItem] = useState(-1);

    return(
        <nav className="nav nav-pills justify-content-center"  style={{position: 'fixed',  bottom: '0', marginLeft: '15px',padding: '25px'}}>
            {menuList.map((item, index) => 
            <a className={selectedItem === index ? 'fs-1 nav-link active' : 'fs-2 nav-link'} 
            onClick = {()=>{setSelectedItem(index);}}
            aria-current="page" href="#">
                {item}
            </a>)}
      </nav>
    );
}
export default NavBar;
