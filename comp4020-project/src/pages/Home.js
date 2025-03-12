import React from "react";
import Card from "../components/Card";
//improt icon
import { RiBarcodeFill } from "react-icons/ri";
import { RiNotification2Line } from "react-icons/ri";//notification
import { RiUser5Line } from "react-icons/ri";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { RiSettings4Line } from "react-icons/ri";


const Home = () => {
   //home page icon name
    let homePageEle = [
      ['*',"Scanner", <RiBarcodeFill />],
      ['*','Profile',<RiUser5Line/>],
      ['*',"Budget", <RiMoneyDollarCircleLine />],
      ['*','Notification',<RiNotification2Line/>],
      [],
      ['*',"Settings", <RiSettings4Line />],
    ];

  return (
      <div className="container text-center" >
        <div className="row justify-content-end">
            {homePageEle.map((name)=> 
            <div className="col-6 mb-3 mb-sm-3">
              <Card className="card text-center" to={name[0]} text = {name[1]} icon = {name[2]} cardStyle = {{width:'11rem',height:'10rem'}} bodyStyle={{marginTop:'20%'}}/>
            </div>
          )}
          </div>
        </div>
  );
};

export default Home;
