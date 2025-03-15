import {Link } from "react-router-dom";
//icon import
import { useState, useEffect } from "react";
import { RiBarChartGroupedFill } from "react-icons/ri";//analytics
import { RiFridgeLine } from "react-icons/ri";//storage
import { RiHome2Line } from "react-icons/ri";//home
import { RiFileList3Line } from "react-icons/ri";
import { RiTimeLine } from "react-icons/ri";

function NavBar(){
    let menuList = [
    ['/analytics', 'Analytics',<RiBarChartGroupedFill/>], 
    ['/storageList','Storage',<RiFridgeLine/>],
    ['/','Home',<RiHome2Line/>],
    ['/shoppingList',"Shopping", <RiFileList3Line />],
    ['/expireList',"Expire", <RiTimeLine />]
];

    const [selectedItem, setSelectedItem] = useState(-1);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return(
        <nav className={`nav nav-pills ${isMobile ? 'd-flex justify-content-around' : 'text-center'}`}>
            {menuList.map((item, index) => 
                <Link 
                    key={index}
                    to={item[0]}
                    className={selectedItem === index ? 'fs-1 nav-link active' : 'fs-2 nav-link'} 
                    onClick = {()=>{setSelectedItem(index);}}
                    style={isMobile ? {width: 'auto', padding: '0.15rem'} : {width: '5.5rem'}}>
                    {item[2]}
                    <p className={`${isMobile ? 'fs-6 mb-0' : 'fs-6'}`}>{item[1]}</p>
                </Link>
            )}
            
      </nav>
    );
}
export default NavBar;
