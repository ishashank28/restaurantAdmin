import React, { useContext } from "react";
import "./resturantList.css";
import { ResturantContext } from "./resturant";
import { MdDelete, MdEdit } from "react-icons/md";

const ResturantList = (props) => {
  const context = useContext(ResturantContext);

  const handleDelete = (value) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this restaurant?");
    if (isConfirmed) {
      context.dispatch({ type: "delete-resturent", value: value });
    }
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Restaurant Name</th>
            <th>Location</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {context.state.filteredList.map((value) => (
            <tr key={value.id}>
              <td data-label="Restaurant">{value.resturantName}</td>
              <td data-label="Location">{value.location}</td>
              <td data-label="Description">{value.description}</td>
              <td data-label="Edit">
                <MdEdit
                  size={18}
                  color="#4c4c69"
                  className="pointer"
                  onClick={() => {
                    context.updateEditData(value);
                    context.handleShow();
                  }}
                />
              </td>
              <td data-label="Delete">
                <MdDelete
                  size={18}
                  color="#b11e1e"
                  className="pointer"
                  onClick={() => handleDelete(value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResturantList;
