import { IRequestPostInformasi } from "./request.interface";

// global response
export interface IGlobalResponse<T> {
  success?: boolean;
  status?: number;
  message?: string;
  data: T;
}

// Response auth
export type TResponseAuthLogin = IGlobalResponse<IDataUser>;

export type TResponseAuthRegister = {
  success: boolean;
  message: string;
};

export interface IDataUser {
  user: IUser;
  token: string;
}

export interface IUser {
  nama: string;
  email: string;
  alamat: string;
  tanggal_lahir: string;
}

export interface IResponseLoginError {
  status: number;
  message: string;
  error: string
}

// Response get profile
export interface IResponseGetProfile {
  id: number
  name: string
  email: string
  email_verified_at: any | string
  alamat: string
  tanggal_lahir: string
  created_at: string
  updated_at: string
}

// Response edit profile
export interface IResponseEditProfile {
  success: boolean;
  message: string;
}

// Response informasi
export type TResponsePostInformasi = IGlobalResponse<IResponsePostInformasi>;

export interface IResponsePostInformasi extends IRequestPostInformasi {
  id: string | number;
  updated_at: string;
  created_at: string;
}

export type TResponseGetInformasi = IGlobalResponse<IResponsePostInformasi[]>;

// Response get koridor
export type TResponseGetKoridor = IGlobalResponse<Koridor>;

export interface Koridor {
  id: string;
  koridor_name: string;
  halte: Halte[];
}

export interface Halte {
  id: string;
  koridor_id: string;
  halte_name: string;
  arrival_time_in_halte: string;
  departure_time_in_halte: string;
  deleted_at: any;
  created_at: string;
  updated_at: string;
  halte_schedule: HalteSchedule[];
}

export interface HalteSchedule {
  id: string;
  halte_id: string;
  bus_queue: string;
  bus_name: string;
  arrival_time_bus: string;
  departure_time_bus: string;
  deleted_at: any;
  created_at: string;
  updated_at: string;
}

export type TResponseGetKoridorName = IGlobalResponse<
  IResponseGetKoridorName[]
>;

export interface IResponseGetKoridorName {
  id: string;
  koridor_name: string;
}
