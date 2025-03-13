import React from "react";
import ShoppingListInputGroup from "../components/ShoppingListInputGroup";
import ButtonGroup from "../components/ButtonGroup";
import SimpleInputGroup from "../components/SimpleInputGroup";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ShoppingList = () => {
  let simpleInputList = ["Total", "Budget", "Total-Budget"];
  let ButtonList = ["Upload", "Search", "Edit"];

  // Initial input group
  const [inputGroups, setInputGroups] = useState([1]);

  // Track prices and budget
  const [prices, setPrices] = useState({});
  const [budget, setBudget] = useState("");

  // Values to display in SimpleInputGroup
  const [calculatedValues, setCalculatedValues] = useState(["0.00", "", ""]);

  const navigate = useNavigate();

  // Function to add more input groups
  const addInputGroup = () => {
    setInputGroups([...inputGroups, inputGroups.length + 1]);
  };

  // Calculate totals whenever prices or budget changes
  useEffect(() => {
    const total = Object.values(prices).reduce(
      (sum, price) => sum + (parseFloat(price) || 0),
      0
    );
    const totalFormatted = total.toFixed(2);
    const diff = budget ? (parseFloat(budget) - total).toFixed(2) : "";
    setCalculatedValues([totalFormatted, budget, diff]);
  }, [prices, budget]);

  // Handle button clicks
  const handleButtonClick = (index, buttonName) => {
    if (buttonName === "Search") {
      navigate("/search"); // Navigate to Search page
    } else if (buttonName === "Edit") {
      navigate("/edit"); // Navigate to Edit page
    }
  };

  return (
    <div className="container text-center">
      <h1>Shopping List</h1>
      <ButtonGroup items={ButtonList} onButtonClick={handleButtonClick} />

      {/* increace input space scroll-able*/}
      <div
        className="flex-grow-1 overflow-auto mt-3 "
        style={{ maxHeight: "40vh" }}
      >
        {inputGroups.map((id) => (
          <ShoppingListInputGroup
            key={id}
            onPriceChange={(price) => {
              setPrices((prev) => ({ ...prev, [id]: price }));
            }}
          />
        ))}
      </div>
      {/* button for add more input space */}
      <button
        className="btn btn-primary btn-lg "
        onClick={addInputGroup}
        style={{ marginTop: "10px", marginBottom: "10px" }}
      >
        +
      </button>
      {/* total and budget */}
      <SimpleInputGroup
        items={simpleInputList}
        values={calculatedValues}
        onValueChange={(index, value) => {
          if (index === 1) setBudget(value);
        }}
      />
    </div>
  );
};

export default ShoppingList;
