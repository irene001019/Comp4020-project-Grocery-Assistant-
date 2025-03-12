import { Outlet,Link } from "react-router-dom";
//icon import
import { useState } from "react";
import { RiBarChartGroupedFill } from "react-icons/ri";//analytics
import { RiFridgeLine } from "react-icons/ri";//storage
import { RiHome2Line } from "react-icons/ri";//home
import { RiNotification2Line } from "react-icons/ri";//notification
import { RiUser5Line } from "react-icons/ri";

function NavBar(){
    let menuList = [
    ['/analytics',<RiBarChartGroupedFill/>, 'Analytics'], 
    ['/storageList',<RiFridgeLine/>,'Storage'],
    ['/',<RiHome2Line/>,'Home'],
    ['*',<RiNotification2Line/>,'Notice'], 
    ['*',<RiUser5Line/>,'Profile']];

    const [selectedItem, setSelectedItem] = useState(-1);

    return(
        <nav className="nav nav-pills text-center"  style={{position: 'fixed',  bottom: '0',marginBottom:'25px'}}>
            {menuList.map((item, index) => 
                <Link to={item[0]}
                className={selectedItem === index ? 'fs-1 nav-link active' : 'fs-2 nav-link'} 
                onClick = {()=>{setSelectedItem(index);}}>
                    {item[1]}
                    <p className="h6">{item[2]}</p>
                </Link>
            )}
            
      </nav>
    );
}
export default NavBar;
