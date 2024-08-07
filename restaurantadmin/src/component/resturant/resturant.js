import React, { useCallback, useReducer, useState } from "react";
import Button from "react-bootstrap/Button";
import AddResturant from "./addResturant";
import ResturantList from "./resturantList";
import useVisibility from "../costom-hooks/useVisibility";

export const ResturantContext = React.createContext({});

const initialArg = { resturentList: [], filteredList: [] };

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
        { ...action.value, id: state.resturentList.length + 1 },
        ...state.resturentList,
      ];
      return {
        ...state,
        resturentList: updatedList,
        filteredList: updatedList,
      };

    case "delete-resturent": {
      const updatedList = state.resturentList.filter(
        (res) => res.id !== action.value.id
      );
      return {
        ...state,
        resturentList: updatedList,
        filteredList: updatedList,
      };
    }
    case "edit-resturant": {
      const updatedList = state.resturentList.reduce((value, data) => {
        if (data.id === action.value.id) {
          value.push(action.value);
        } else {
          value.push(data);
        }
        return value;
      }, []);
      return {
        ...state,
        resturentList: updatedList,
        filteredList: updatedList,
      };
    }
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
  const [show, handleShow, handleClose] = useVisibility(false);
  const [editData, updateEditData] = useState({});
  const [state, dispatch] = useReducer(reducer, initialArg);

  const handleChange = ({ target: { value } }) => {
    debouncedSearch(value);
  };

  const debouncedSearch = useCallback(
    debounce((query) => dispatch({ type: "filter", value: query }), 300),
    []
  );

  const providerValues = {
    state,
    dispatch,
    resturentList: [],
    editData,
    updateEditData,
    handleShow,
  };

  return (
    <ResturantContext.Provider value={providerValues}>
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

        {show && <AddResturant show={show} handleClose={handleClose} />}
        <ResturantList />
      </div>
    </ResturantContext.Provider>
  );
};

export default Resturant;
