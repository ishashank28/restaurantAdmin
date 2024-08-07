import React, { useContext, useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ResturantContext } from "./resturant";

const initialFormState = {
    resturantName: "",
    location: "",
    description: "",
  }

function AddResturant({ show, handleClose }) {
  console.log("check::::", show, handleClose);
  //   let formData = null;

  //   const [name, setName] = useState("");
  //   const [location, setLocation] = useState("");
  //   const [description, setDescription] = useState("");
  //   const [mergedData, setMergedData] = useState([]);

  //   const onChangeName = (e) => {
  //     setName(e.target.value);
  //     console.log(name, "name");
  //   };

  //   const onChangeLocation = (e) => {
  //     setLocation(e.target.value);
  //     console.log(location, "location");
  //   };

  //   const onChangeDescription = (e) => {
  //     setDescription(e.target.value);
  //     console.log(description, "description");
  //   }

  const [formData, setFormData] = useState(initialFormState);

  const onSubmit = (e) => {
    e.preventDefault();
    // // const formData = {
    // //   name: name,
    // //   location:location,
    // //   description:description
    // // }
    // const formData = {
    //   name,
    //   location,
    //   description,
    // };
    // setMergedData((prevData) => [...prevData, formData]);
    // setName("");
    // setLocation("");
    // setDescription("");
    context.dispatch({ type: "add-resturant", value:formData });
    handleClose();
    setFormData(initialFormState)
  };

  const context = useContext(ResturantContext);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Restro Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <form>
            <div className="mb-3">
              <label htmlFor="InputName" className="form-label">
                Restaurant Name
              </label>
              <input
                type="text"
                className="form-control"
                id="InputName"
                aria-describedby="emailHelp"
                value={formData.resturantName}
                onChange={(e) =>
                  setFormData((values) => {
                    return { ...values, resturantName: e.target.value };
                  })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="InputLocation" className="form-label">
                Location
              </label>
              <input
                type="text"
                className="form-control"
                id="InputLocation"
                value={formData.location}
                onChange={(e) =>
                  setFormData((values) => {
                    return { ...values, location: e.target.value };
                  })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="FormControlTextarea1" className="form-label" />
              Description
              <textarea
                className="form-control"
                id="FormControlTextarea1"
                rows="3"
                value={formData.description}
                onChange={(e) =>
                  setFormData((values) => {
                    return { ...values, description: e.target.value };
                  })
                }
              ></textarea>
            </div>
          </form>

          {/* <button
                type="submit"
                className="btn btn-primary"
                onClick={onSubmit}
              >
                Submit
              </button>
            <Card mergedData={mergedData} /> */}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={handleClose}>
          Close
        </Button>
        <Button variant="outline-primary" onClick={onSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddResturant;
