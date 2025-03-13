import React from "react";
import CardWithPopover from "../components/CardWithPopover";
import CardWithLink from "../components/CardWithLink";
import Card from "../components/Card";

//improt icon
import { RiBarcodeFill } from "react-icons/ri";
import { RiNotification2Line } from "react-icons/ri"; //notification
import { RiUser5Line } from "react-icons/ri";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { RiSettings4Line } from "react-icons/ri";

const Home = () => {
  //home page icon name
  let homePageEle = [
    ["Profile", <RiUser5Line />],
    ["Budget", <RiMoneyDollarCircleLine />],
    ["Notification", <RiNotification2Line />],
    ["Settings", <RiSettings4Line />],
  ];

  return (
    <div className="container text-center">
      <div className="row justify-content-center">
        <div className="col-6 mb-3 mb-sm-3">
          <CardWithLink
            className=" card text-center"
            to="/scanning"
            text="Scanner"
            icon={<RiBarcodeFill />}
            cardStyle={{ width: "11rem", height: "10rem" }}
            bodyStyle={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          />
        </div>
        {homePageEle.map((name) => (
          <div className="col-6 mb-3 mb-sm-3">
            <CardWithPopover
              className=" card text-center"
              text={name[0]}
              icon={name[1]}
              popoverContext={
                <Card
                  className="card border-danger"
                  text="Sorry current page is not avaiable"
                />
              }
              cardStyle={{ width: "11rem", height: "10rem" }}
              bodyStyle={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
