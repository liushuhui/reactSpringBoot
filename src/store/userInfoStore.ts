import { getUserInfo } from "@/api/login";
import { create } from "zustand";


interface UserInfoStore {
  userInfoData: any;
  fetchUserInfo: () => Promise<void>;
}
const userInfoStore = create<UserInfoStore>((set: any) => ({
  userInfoData: {},
  fetchUserInfo: async () => {
    const res = await getUserInfo();
    set({ userInfoData: res?.data });
  },
}));

export default userInfoStore;
