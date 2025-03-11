import { useState } from "react";

function NavBar(){
    let menuList = ['Analytics', 'Storage', 'Home', 'Notice', 'Profile'];
    const [selectedItem, setSelectedItem] = useState(-1);

    return(
        <nav className="nav nav-pills "  style={{position: 'fixed',  bottom: '0', width: '100%', padding: '20px'}}>
            {menuList.map((item, index) => 
            <a className={selectedItem === index ? 'nav-link active' : 'nav-link'} 
            onClick = {()=>{setSelectedItem(index);}}
            aria-current="page" href="#">
                {item}
            </a>)}
      </nav>
    );
}
export default NavBar;
