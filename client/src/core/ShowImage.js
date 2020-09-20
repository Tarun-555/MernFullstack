import React from "react";
import { Img } from "react-image";

const ShowImage = ({ item, url }) => {
  return (
    <div className="text">
      <Img
        alt={item.name}
        className="mb"
        style={{height:"200px",width:"100%",borderRadius:"5px"}}
        src={`/api/${url}/photo/${item._id}`}
        // loader={
        //   <div className="ui placeholder">
        //     <div className="image"></div>
        //   </div>
        // }
      />
    </div>
  );
};

export default ShowImage;
