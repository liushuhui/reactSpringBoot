import { getMenuTree } from "@/api/menu";
import { create } from "zustand";

interface IMenuStore {
  menuData: any;
  fetchMenu: () => Promise<void>;
}
const menuStore = create<IMenuStore>((set: any) => ({
  menuData: [],
  fetchMenu: async () => {
    const res = await getMenuTree();
    set({ menuData: res });
  },
}));

export default menuStore;


