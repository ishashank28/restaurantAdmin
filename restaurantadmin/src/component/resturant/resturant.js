import React, { useCallback, useReducer, useState } from "react";
import Button from "react-bootstrap/Button";
import AddResturant from "./addResturant";
import ResturantList from "./resturantList";

export const ResturantContext = React.createContext({});

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

function reducer(state, action) {
  switch (action.type) {
    case "add-resturant":
      const updatedList = [
        { ...action.value, id: state.resturentList.length+1 },
        ...state.resturentList,
      ];
      console.log('updatedList',updatedList)
      return {
        ...state,
        resturentList: updatedList,
        filteredList: updatedList,
      };

    case "delete-resturent": {
      const updatedList = state.resturentList.filter(
        (res) => res.id !== action.value.id
      );

      console.log('updatedList',updatedList)
      return {
        ...state,
        resturentList: updatedList,
        filteredList: updatedList,
      };
    }

    case "edit-resturant":
      return state.reduce((value, data) => {
        //use slice
        if (data.id === action.value.id) {
          value.push(action.value);
        } else {
          value.push(data);
        }
        return value;
      }, []);
    case "filter":
      if (action.value !== "") {
        const updatedListData = state.resturentList.filter((resturent) =>
          resturent.resturantName.includes(action.value)
        );
        return { ...state, filteredList: updatedListData };
      }

      return { ...state, filteredList: state.resturentList };
  }
}

const Resturant = () => {
  let initialArg = { resturentList: [], filteredList: [] };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [state, dispatch] = useReducer(reducer, initialArg);

  const handleChange = (e) => {
    const { value } = e.target;

    debouncedSearch(value); // Call the debounced search function
  };

  const debouncedSearch = useCallback(
    debounce((query) => dispatch({ type: "filter", value: query }), 300),
    []
  );

  return (
    <ResturantContext.Provider value={{ state, dispatch, resturentList: [] }}>
      <div>
        <div className="d-flex justify-content-between align-items-center p-2 bg-dark">
          <h5 className="text-white">Resturant</h5>

          <input
            type="text"
            className="col-6 p-1 rounded"
            placeholder="Search..."
            onChange={handleChange}
          />
          <Button variant="outline-light" onClick={handleShow}>
            Add Resturant
          </Button>
        </div>

        <AddResturant show={show} handleClose={handleClose} />
        <ResturantList />
      </div>
    </ResturantContext.Provider>
  );
};

export default Resturant;
