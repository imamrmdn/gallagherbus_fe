// Request auth
export interface IRequestAuthLogin {
  name: string;
  password: string;
}

export interface IRequestAuthRegister {
  name: string;
  email: string;
  alamat: string;
  tanggal_lahir?: string;
  password: string;
}

// Request edit profile
export interface IRequestEditProfile {
  nama: string;
  email?: string;
}

// Request post informasi
export interface IRequestPostInformasi {
  url: string;
  title: string;
  desc_informasi: string;
}
