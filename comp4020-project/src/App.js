import Card from "./components/Card";
import ListGroup from "./components/ListGroup";
import NavBar from "./components/NavBar";

function App() {
    let items = [
        'Apple',
        'Milk',
        'Bread',
        'Egg',
        'Rice'
    ];
    //limit the consol size style={{ maxWidth: '430px', maxHeight: '932px', margin: '0 auto', padding: '20px' }}
  return (
    <div  style={{ maxWidth: '430px', maxHeight: '932px', margin: '0 auto', padding: '20px' }}>
      <ListGroup items={items} title="grocery list"/>
      <NavBar/>
    </div>
  );
}

export default App;
