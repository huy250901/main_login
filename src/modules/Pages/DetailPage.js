import React, { useRef, useState } from "react";
// import Avatar from "react-avatar-edit";

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import { canvasPreview } from "./canvasPreview";
import { useDebounceEffect } from "./useDebounceEffect";
import "react-image-crop/dist/ReactCrop.css";

import fb from "../../image/fb.png";
import "./detailpage.css";

const DetailPage = () => {
  const imgRef = useRef(null);
  const [image, setImage] = useState("");
  // const [preview, setPreview] = useState("");

  // const onClose = () => {
  //   setPreview("");
  // };

  // const onCrop = (view) => {
  //   setPreview(view);
  // };

  const handleImageClick = () => {
    imgRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files;
    console.log("file", file);
    setImage(event.target.files[0]);
  };

  // const centerAspectCrop = (
  //   mediaWidth: Number,
  //   mediaHeight: Number,
  //   aspect: Number
  // ) => {};

  return (
    <div className="container">
      <div className="card">
        {/* <Avatar
          onCrop={onCrop}
          onClose={onClose}
          src={image}
          width={200}
          height={200}
        />
        {preview && <img src={preview} />} */}
        <div style={{}} onClick={handleImageClick} className="profilepic">
          {image ? (
            <img
              style={{ height: "100%", width: "100%" }}
              src={URL.createObjectURL(image)}
              alt=""
            />
          ) : (
            <img style={{ height: "100%", width: "100%" }} src={fb} alt="" />
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
          <button className="btn btn-primary">Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
