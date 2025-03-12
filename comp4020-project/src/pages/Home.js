import React from "react";
import Card from "../components/Card";
//improt icon
import { RiBarcodeFill } from "react-icons/ri";
import { RiFileList3Line } from "react-icons/ri";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { RiTimeLine } from "react-icons/ri";
import { RiSettings4Line } from "react-icons/ri";


const Home = () => {
   //home page icon name
    let homePageEle = [
      ['*',"Scanner", <RiBarcodeFill />],
      ['/shoppingList',"Shopping List", <RiFileList3Line />],
      ['*',"Budget", <RiMoneyDollarCircleLine />],
      ['/expireList',"Expire List", <RiTimeLine />],
      ['*',"Settings", <RiSettings4Line />],
    ];
  return (
    
      <div className="container text-center" >
        <div className="row justify-content-end">
            {homePageEle.map((name)=> 
            <div className="col-6 mb-3 mb-sm-3">
              <Card className="card text-center" to={name[0]} text = {name[1]} icon = {name[2]} style = {{width:'11rem',height:'11rem'}}/>
            </div>
          )}
          </div>
        </div>
  );
};

export default Home;
