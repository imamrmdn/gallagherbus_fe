import { create } from "zustand";
import { api } from "../api";
import {
  IResponseEditProfile,
  IResponseGetProfile,
} from "../interface/response.interface";
import { IRequestEditProfile } from "../interface/request.interface";

// interface
interface IUseGetProfile {
  stateGetProfile: IResponseGetProfile;
  getProfile: (token: string | null) => Promise<void>;
}

interface IUseEditProfile {
  editProfile: (
    data: IRequestEditProfile,
    token: string | null
  ) => Promise<IResponseEditProfile>;
}

//
export const useGetProfile = create<IUseGetProfile>((set, get) => ({
  stateGetProfile: {} as IResponseGetProfile,
  getProfile: async (token) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const result = await api.get("/api/get_profile", config);
      set({ stateGetProfile: result?.data });
    } catch (error) {
      throw error;
    }
  },
}));

//
export const useEditProfile = create<IUseEditProfile>((set, get) => ({
  editProfile: async (data, token) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const result = await api.patch("/api/edit_profile", data, config);
      return result?.data;
    } catch (error) {
      throw error;
    }
  },
}));
