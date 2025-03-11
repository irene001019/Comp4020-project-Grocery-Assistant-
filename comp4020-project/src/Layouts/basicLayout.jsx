import { Outlet, Link } from "react-router-dom";

const basicLayout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shoppingList">Shopping List</Link>
          </li>
          <li>
            <Link to="/expireList">Exprie List</Link>
          </li>
          <li>
            <Link to="/Analytics">Analytics</Link>
          </li>
          <li>
            <Link to="/storageList">Home</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  )
};

export default basicLayout;