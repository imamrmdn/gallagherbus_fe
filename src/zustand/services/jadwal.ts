import { create } from "zustand";
import { api } from "../api";
import {
  Koridor,
  TResponseGetKoridor,
  TResponseGetKoridorName,
} from "../interface/response.interface";

// interface
interface IUseGetJadwalKoridor {
  stateGetJadwalKoridor: Koridor;
  getJadwalKoridor: (koridor_name: string, all: number) => void;
}

interface IUseGetKoridorName {
  stateGetKoridorName: TResponseGetKoridorName;
  getKoridorName: () => void;
}

//
export const useGetJadwalKoridor = create<IUseGetJadwalKoridor>((set, get) => ({

  stateGetJadwalKoridor: {} as Koridor,
  getJadwalKoridor: async (koridor_name, all) => {
    try {
      const result = await api.get("/api/jadwal/get_koridor", {
        params: { koridor_name, all },
      });
      set({ stateGetJadwalKoridor: result?.data?.data[0] });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
}));

//
export const useGetKoridorName = create<IUseGetKoridorName>((set, get) => ({
  stateGetKoridorName: {} as TResponseGetKoridorName,
  getKoridorName: async () => {
    try {
      const result = await api.get("/api/jadwal/get_all_koridor_name");

      set({ stateGetKoridorName: result?.data });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
}));
