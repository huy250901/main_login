export interface LoginFormValues {
  username: string;
  password: string;
}

export interface ISignUpParams {
  email: string;
  password: string;
  repeatPassword: string;
  name: string;
  gender: string;
  region: string;
  state: string;
}

export interface IGenderParams {
  label: string;
  value: string;
}

export interface ILocationParams {
  id: string | number;
  pid: number | null;
  name: string;
  createdAt: number;
}

export interface ICity {
  id: number;
  name: string;
}

<<<<<<< HEAD
interface ImageCropProps {
  src: string;
  aspectRatio: number;
  setCropData: (cropData: string) => void;
=======
export interface GetUser {
  id: number;
  name: string;
  email: string;
  error?: null;
>>>>>>> e4f475addb9a527375ec095478a92594e96bb175
}
