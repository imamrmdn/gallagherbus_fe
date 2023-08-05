import { create } from "zustand";
import { api } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
//
import { IRequestAuthLogin, IRequestAuthRegister } from "../interface/request.interface";
import { IDataUser, IResponseLoginError, TResponseAuthLogin, TResponseAuthRegister } from "../interface/response.interface";

// interface
interface IUseRegister {
  erroRegister: boolean;
  registerUser: (data: IRequestAuthRegister) => Promise<TResponseAuthRegister>;
}

interface IUseLogin {
    user: Record<string, string>
    token: string | null
    isLoad: boolean
    errorLogin?: boolean
    errorMessageLogin?: string
    loginUser: (data: IRequestAuthLogin) => Promise<TResponseAuthLogin>
    setLogin: () => Promise<void>
    setData: () => Promise<void>
    logoutUser: () => Promise<void>
}

//
export const useRegister = create<IUseRegister>((set, get) => ({
  erroRegister: false,
  registerUser: async (data) => {
    try {
      const result = await api.post("/api/register", data);
      return result?.data;
    } catch (error) {
      set({ erroRegister: true });
      throw error;
    }
  },
}));

export const useLogin = create<IUseLogin>((set, get) => ({
    token: '',
    user: {},
    isLoad: true,
    errorLogin: false,
    errorMessageLogin: '',
    loginUser: async (data) => {
        try {
            const result = await api.post('/api/login', data)

            const dataUser = result?.data?.data?.user
            const dataToken = result?.data?.data?.token

            await AsyncStorage.setItem('dataToken', dataToken); //<-- save token to local storage

            const newDataUser = JSON.stringify(dataUser); //<-- parse to object
            await AsyncStorage.setItem('dataUser', newDataUser); //<-- save response object to local storage

            const token = await AsyncStorage.getItem('dataToken'); //<-- get token when user sign in
            set({ token });
            set({ isLoad: false });   

            return result?.data
        
        } catch (error) {
            throw error;
        }
    },
    setData: async () => {
        const response: any = await AsyncStorage.getItem('dataUser') //<-- get response data user
        const data = JSON.parse(response); //<-- parse response
        set({ user: data });
    },
    setLogin:  async () => {
        const token = await AsyncStorage.getItem('dataToken'); //<-- get user token
        set({ token });
    },
    logoutUser: async () => {
        await AsyncStorage.removeItem('dataToken'); //<-- remove user token
        await AsyncStorage.removeItem('dataUser'); //<-- remove response data user
        set({ token: null });
        set({ user: {} });
    }
}))
