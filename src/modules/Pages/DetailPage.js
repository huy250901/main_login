import React, { useRef, useState } from "react";

import fb from "../../image/fb.png";
import "./detailpage.css";

const DetailPage = () => {
  const imgRef = useRef(null);
  const [image, setImage] = useState("");

  const handleImageClick = () => {
    imgRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files;
    console.log("file", file);
    setImage(event.target.files[0]);
  };

  return (
    <div className="container">
      <div className="card">
        <div
          style={{}}
          onClick={handleImageClick}
          className="profilepic"
        >
          {image ? (
            <img
              style={{ height: "100%", width: "100%" }}
              src={URL.createObjectURL(image)}
              alt=""
            />
          ) : (
            <img
              style={{ height: "100%", width: "100%" }}
              src={fb}
              alt=""
            />
          )}
          <input
            ref={imgRef}
            type="file"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>

        <div className="card-body">
          <h5 className="card-title">Email</h5>
          <p className="card-text">huy23@gmail.com</p>
          <h5 className="card-title">User Name</h5>
          <p className="card-text">Huy</p>
          <h5 className="card-title">Description</h5>
          <p className="card-text"></p>
          <h5 className="card-title">State</h5>
          <p className="card-text">1</p>
          <h5 className="card-title">Region</h5>
          <p className="card-text">1</p>
          <button className="btn btn-primary">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
