import "./Card.css";

const card = (props) => {
  return (
    <div className="">
      {
        props.mergedData.map((value,index)=> {
          return (
            <div className="container_card text-center my-3 col-12">
              <div className="row">
                <div className="name_restro col-3">
                  <p>{value.name}</p>
                </div>
                <div className="name_restro col-3">
                  <p>{value.location}</p>
                </div>
                <div className="name_restro col-3">
                  <p>{value.description}</p>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  );
};

export default card;
