import Card from "./components/Card";
import NavBar from "./components/NavBar";
import { RiBarcodeFill } from "react-icons/ri";
import { RiFileList3Line } from "react-icons/ri";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { RiTimeLine } from "react-icons/ri";
import { RiSettings4Line } from "react-icons/ri";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//improt pages
import ExpireList from "./pages/ExpireList";
import Home from "./pages/Home";
import Analytics from "./pages/Analytics";
import ShoppingList from "./pages/ShoppingList";
import StorageList from "./pages/StorageList";
import NoPage from "./pages/NoPage";
import basicLayout from "./Layouts/basicLayout";

function App() {
  //home page icon name
  let homePageEle = [
    ["Scanner", <RiBarcodeFill />],
    ["Shopping List", <RiFileList3Line />],
    ["Budget", <RiMoneyDollarCircleLine />],
    ["Expire List", <RiTimeLine />],
    ["Settings", <RiSettings4Line />],
  ];

  //limit the consol size style={{ maxWidth: '430px', maxHeight: '932px', margin: '0 auto', padding: '20px' }}
  return (
    <Routes>
      <Route path="/" element={<basicLayout />}>
        <Route index element={<Home />} />
        <Route path="expireList" element={<ExpireList />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="shoppingList" element={<ShoppingList />} />
        <Route path="storageList" element={<StorageList />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
    // <div  style={{ maxWidth: '430px', maxHeight: '932px', margin: '0 auto', padding: '20px' }}>
    //   <div className="container-fluid">
    //     <div className="container text-center" >
    //       <div className="row justify-content-end">
    //         {homePageEle.map((name)=> <div className="col-6 mb-3 mb-sm-5"><Card text = {name[0]} icon = {name[1]}/></div>)}
    //       </div>
    //     </div>
    //   </div>
    //   <NavBar/>
    // </div>
  );
}

export default App;
