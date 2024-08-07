import React,{useState} from 'react';
import Card from './Card'

const Form = () => {

    let formData = null;

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [mergedData, setMergedData] = useState([])

    const onChangeName = (e) => {
        setName(e.target.value)
        console.log(name,"name")
    }

    const onChangeLocation = (e) => {
        setLocation(e.target.value)
        console.log(location,"location")
    }

    const onChangeDescription = (e) => {
        setDescription(e.target.value)
        console.log(description,"description")
    }

    const onSubmit = (e) => {
      e.preventDefault()
      // const formData = { 
      //   name: name,
      //   location:location,
      //   description:description
      // }
      const formData = {
        name,
        location,
        description
      }
      setMergedData((prevData) => [...prevData, formData]);
      setName('')
      setLocation('')
      setDescription('')
    }

  return (
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
            value={name}
            onChange={onChangeName}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="InputLocation" className="form-label">
            Location
          </label>
          <input type="text" className="form-control" id="InputLocation" value={location} onChange={onChangeLocation}/>
        </div>
        <div className="mb-3">
          <label htmlFor="FormControlTextarea1" className="form-label"/>
            Description
          <textarea
            className="form-control"
            id="FormControlTextarea1"
            rows="3"
            value={description}
            onChange={onChangeDescription}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary" onClick={onSubmit}>
          Submit
        </button>
      </form>
      <Card mergedData={mergedData}/>
    </div>
  );
};

export default Form;
