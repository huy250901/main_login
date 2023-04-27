import React, {
  ChangeEvent,
  HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Modal, Button } from "react-bootstrap";
import { RootState, useAppDispatch } from "../../redux/store";
import { Location, useLocation, useNavigate } from "react-router-dom";
import ReactCrop from "react-image-crop";
import { useTranslation } from "react-i18next";
import { generateAvatarUpload } from "../../../src/utils/upload";

import fb from "../../image/fb.png";
import "./profile.css";
import "react-image-crop/dist/ReactCrop.css";

import { fetchInforUser, fetchLogout } from "../../redux/reducer";
import { useSelector } from "react-redux";
import { ROUTES } from "../../configs/routes";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Profile = () => {
  const { t } = useTranslation();
  const [avatarr, setAvatarr] = useState(false);
  const { user } = useSelector((state: RootState) => state.data.InforUser);

  const dispatch = useAppDispatch();
  const location = useLocation();
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<any>(null);
  const [image, setImage] = useState(user?.avatar);
  const [openModal, setOpenModal] = useState(false);
  const [crop, setCrop] = useState<any>({ unit: "%", width: 30, aspect: 1 });
  const [completedCrop, setCompletedCrop] = useState<any>(null);
  const previewCanvasRef = useRef<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchInforUser(document.cookie.split("=")[1]));
  }, [dispatch]);

  const onLogout = () => {
    Cookies.remove("token");
    toast.success("Đăng xuất thành công", {
      autoClose: 2000,
      pauseOnHover: false,
    });
    setTimeout(() => {
      navigate("/");
    }, 1000);
    // dispatch(fetchLogout);
  };

  const { email, avatar, name, description, region, state } = useSelector(
    (state: RootState) => state.data.InforUser
  );

  const changeAvatar = () => {
    if (avatarInputRef.current !== null) avatarInputRef.current.click();
  };

  const onChooseAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };

    if (files !== null && files.length) reader.readAsDataURL(files[0]);
    setOpenModal(true);
  };

  const onLoad = useCallback((img: any) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop]);

  return (
    <div className="container">
      <div
        className="card"
        style={{ margin: "auto", width: "100%", alignItems: "center" }}
      >
        <div className="profilepic">
          <img
            style={{ height: "100%", width: "100%" }}
            src={image ? image : fb}
            // src={`'https://google.com/${user?.avatar}`}
            className="card-img-top profilepic__image"
            alt="avatar_url"
          />
          {location.pathname === ROUTES.profile && (
            <div className="profilepic__content" onClick={changeAvatar}>
              <input
                ref={avatarInputRef}
                hidden
                type="file"
                onChange={onChooseAvatar}
                accept="image/*"
              />
              <span className="profilepic__text">Upload Avatar</span>
            </div>
          )}
        </div>
        <div className="card-body">
          <h5 className="card-title">{t("email")}</h5>
          <p className="card-text">{email}</p>
          <h5 className="card-title">{t("name")}</h5>
          <p className="card-text">{name}</p>
          <h5 className="card-title">{t("description")}</h5>
          <p className="card-text">{description ? "" : "noDescription"}</p>
          <h5 className="card-title">{t("region")}</h5>
          <p className="card-text">{region}</p>
          <h5 className="card-title">{t("state")}</h5>
          <p className="card-text">{state}</p>
          {location.pathname === ROUTES.profile && (
            <button className="btn btn-primary" onClick={onLogout}>
              {t("logout")}
            </button>
          )}
        </div>
      </div>
      <Modal
        show={openModal}
        onHide={() => {
          setOpenModal(false);
        }}
      >
        <Modal.Header>
          <Modal.Title>Upload</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactCrop
            src={image ? image : fb}
            crop={crop}
            onChange={(newCrop: any) => {
              console.log("====================================");
              console.log(newCrop);
              console.log("====================================");
              setCrop(newCrop);
            }}
            onImageLoaded={onLoad}
            onComplete={(c) => setCompletedCrop(c)}
          />
          <div>
            <canvas
              ref={previewCanvasRef}
              // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
              style={{
                width: Math.round(completedCrop?.width ?? 0),
                height: Math.round(completedCrop?.height ?? 0),
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setOpenModal(false);
              // uploadAvatar();
            }}
          >
            Save Image
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
