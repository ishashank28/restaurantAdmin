import React, { useContext } from "react";
import "./Card.css";
import { ResturantContext } from "./resturant";
import { MdDelete, MdEdit } from "react-icons/md";

const ResturantList = (props) => {
  const context = useContext(ResturantContext);

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
          {context.state.filteredList.map((value, index) => (
            <tr key={index}>
              <td data-label="Company">{value.resturantName}</td>
              <td data-label="Contact">{value.location}</td>
              <td data-label="Country">{value.description}</td>
              <td data-label="Edit"><MdEdit size={18} color="#4c4c69" onClick={()=>context.dispatch({type:'filter', value:value })}/></td>
              <td data-label="Delete"><MdDelete size={18} color="#b11e1e" onClick={()=>context.dispatch({type:'delete-resturent', value:value })}/> </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResturantList;
