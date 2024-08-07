import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ResturantContext } from "./resturant";

const initialFormState = {
  resturantName: "",
  location: "",
  description: "",
};

function AddResturant({ show, handleClose }) {
  const context = useContext(ResturantContext);

  const [formData, setFormData] = useState(
    context.editData ? context.editData : initialFormState
  );
  const [errors, setErrors] = useState({});

  const closeModal = () => {
    context.updateEditData({});
    setFormData(initialFormState);
    setErrors({});
    handleClose();
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.resturantName || formData.resturantName.trim() === "") {
      newErrors.resturantName = "Restaurant Name is required.";
    }
    if (!formData.location || formData.location.trim() === "") {
      newErrors.location = "Location is required.";
    }
    return newErrors;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      if (Object.keys(context.editData).length > 0) {
        context.dispatch({ type: "edit-resturant", value: formData });
        context.updateEditData({});
      } else {
        context.dispatch({ type: "add-resturant", value: formData });
      }
      handleClose();
      setFormData(initialFormState);
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{Object.keys(context.editData).length > 0 ? "Edit" : "Add"} Restaurant Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label htmlFor="InputName" className="form-label">
              Restaurant Name
            </label>
            <input
              type="text"
              className={`form-control ${errors.resturantName ? 'is-invalid' : ''}`}
              id="InputName"
              value={formData.resturantName || ""}
              onChange={(e) =>
                setFormData((values) => ({
                  ...values,
                  resturantName: e.target.value,
                }))
              }
            />
            {errors.resturantName && (
              <div className="invalid-feedback">{errors.resturantName}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="InputLocation" className="form-label">
              Location
            </label>
            <input
              type="text"
              className={`form-control ${errors.location ? 'is-invalid' : ''}`}
              id="InputLocation"
              value={formData.location || ""}
              onChange={(e) =>
                setFormData((values) => ({
                  ...values,
                  location: e.target.value,
                }))
              }
            />
            {errors.location && (
              <div className="invalid-feedback">{errors.location}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="FormControlTextarea1" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="FormControlTextarea1"
              rows="3"
              value={formData.description || ""}
              onChange={(e) =>
                setFormData((values) => ({
                  ...values,
                  description: e.target.value,
                }))
              }
            ></textarea>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={closeModal}>
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
