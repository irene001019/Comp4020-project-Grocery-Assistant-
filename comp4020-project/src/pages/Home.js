import React from "react";
import CardWithLink from "../components/CardWithLink";
import Card from "../components/Card";
import PopOver from "../components/PopOver";

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
  // need for pop up
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
            <Card
              className=" card text-center"
              text={name[0]}
              title={name[1]}
              cardStyle={{ width: "11rem", height: "10rem" }}
              bodyStyle={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
              popId={id}
              popVariant="contained"
              popOnClick={handleClick}
              additional={
                <PopOver
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  popoverContext={
                    <Card
                      className="card border-danger"
                      style={{ width: "9rem" }}
                      text="Sorry current page is not avaiable"
                    />
                  }
                />
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
