import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  RootState,
  useAppDispatch,
} from "../../redux/store";
import ReactCrop from "react-image-crop";

import fb from "../../image/fb.png";
import "./profile.css";
import { GetUser } from "../../models/auth";
import { fetchInforUser } from "../../redux/reducer";
import { useSelector } from "react-redux";
// import { RootState } from '../../redux/store';

const Profile = () => {
  const [avatarr, setAvatarr] = useState(false);

  const { user } = useSelector(
    (state: RootState) => state.data.InforUser
  );

  const dispatch = useAppDispatch();
  const imgRef = useRef<any>(null);

  const [image, setImage] = useState(user?.avatar);
  const [openModal, setOpenModal] = useState(false);
  const [completedCrop, setCompletedCrop] =
    useState<any>(null);

  useEffect(() => {
    dispatch(fetchInforUser(document.cookie.split("=")[1]));
  }, [dispatch]);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [crop, setCrop] = useState<any>({
    unit: "%",
    width: 30,
    aspect: 1,
  });

  const {
    email,
    avatar,
    name,
    description,
    region,
    state,
  } = useSelector(
    (state: RootState) => state.data.InforUser
  );

  const changeAvatar = () => {
    if (avatarInputRef.current !== null)
      avatarInputRef.current.click();
  };

  const onChooseAvatar = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    const files = e.target.files;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };

    if (files !== null && files.length)
      reader.readAsDataURL(files[0]);
    setOpenModal(true);
  };

  const onLoad = useCallback((img: any) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    const image = imgRef.current;
  });

  return (
    <div className="container">
      <div className="card">
        <div className="profilepic">
          <img
            style={{ height: "100%", width: "100%" }}
            src={
              avatarr
                ? `http://api.training.div3.pgtest.co/${avatar}`
                : fb
            }
            alt=""
          />
        </div>
        {/* {
          <img
            src={`http://api.training.div3.pgtest.co/${avatar}`}
            alt=""
          />
        } */}
        {/* <div
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
        </div> */}
        <div className="card-body">
          <h5 className="card-title">{name}:NAME</h5>
          <p className="card-text">{email}:EMAIL</p>
          <h5 className="card-title">User Name</h5>
          <p className="card-text">Huy</p>
          <h5 className="card-title">{description}DES</h5>
          <p className="card-text">{description}</p>
          <h5 className="card-title">State</h5>
          <p className="card-text">{state}</p>
          <h5 className="card-title">Region</h5>
          <p className="card-text">{region}</p>
          <button className="btn btn-primary">
            Log Out
          </button>
        </div>

        <header>
          <title>Upload</title>
          <div className="profilepic">
            <img
              src={`'https://google.com/${user?.avatar}`}
              className="card-img-top profilepic__image"
              alt="avatar_url"
            />
            {location.pathname === ROUTES.profile && (
              <div
                className="profilepic__content"
                onClick={changeAvatar}
              >
                <input
                  ref={avatarInputRef}
                  hidden
                  type="file"
                  onChange={onChooseAvatar}
                  accept="image/*"
                />
                <span className="profilepic__text">
                  Upload Avatar
                </span>
              </div>
            )}
          </div>
        </header>
        <div className="body">
          <ReactCrop
            src={image ? image : { fb }}
            crop={crop}
            onChange={(newCrop: any) => {
              console.log(
                "===================================="
              );
              console.log(newCrop);
              console.log(
                "===================================="
              );
              setCrop(newCrop);
            }}
            onImageLoaded={onLoad}
            onComplete={(c) => setCompletedCrop(c)}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
