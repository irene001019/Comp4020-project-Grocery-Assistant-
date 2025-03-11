import Card from "./components/Card";
import ListGroup from "./components/ListGroup";
import NavBar from "./components/NavBar";
import { RiBarcodeFill } from "react-icons/ri";
import { RiFileList3Line } from "react-icons/ri";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { RiTimeLine } from "react-icons/ri";
import { RiSettings4Line } from "react-icons/ri";






function App() {
  //home page icon name
    let items = [
        'Scanner',
        'Shopping List',
        'Budget',
        'Expire List',
        'Settings'
    ];
    //home page icon
    let icon =[
      <RiBarcodeFill/>,
      <RiFileList3Line/>,
      <RiMoneyDollarCircleLine/>,
      <RiTimeLine/>,
      <RiSettings4Line/>
    ];

    let homePageEle = [
      ['Scanner',<RiBarcodeFill/>],
      ['Shopping List',<RiFileList3Line/>],
      ['Budget',<RiMoneyDollarCircleLine/>],
      ['Expire List', <RiTimeLine/>],
      ['Settings',<RiSettings4Line/>]
    ];

    
    //limit the consol size style={{ maxWidth: '430px', maxHeight: '932px', margin: '0 auto', padding: '20px' }}
  return (
    <div  style={{ maxWidth: '430px', maxHeight: '932px', margin: '0 auto', padding: '20px' }}>
      <div className="container text-center" >
        <div className="row justify-content-end">
          {homePageEle.map((name)=> <div className="col-6 mb-3 mb-sm-5"><Card text = {name[0]} icon = {name[1]}/></div>)}
        </div>
    </div>
      <NavBar/>
    </div>
  );
}

export default App;
