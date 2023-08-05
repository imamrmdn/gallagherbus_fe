import { create } from "zustand";
import { api } from "../api";
import { TResponseGetInformasi } from "../interface/response.interface";

// interface
interface IUseGetInformasi {
  stateGetInformasi: TResponseGetInformasi;
  getInformasi: () => void;
}

//
export const useGetInformasi = create<IUseGetInformasi>((set, get) => ({
  stateGetInformasi: {} as TResponseGetInformasi,
  getInformasi: async () => {
    try {
      const result = await api.get("/api/get_informasi");

      set({ stateGetInformasi: result?.data });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
}));
