import { getDict } from "@/api/common";
import { create } from "zustand";

interface DictStore {
    dictData: any;
    fetchDict: () => Promise<void>;
  }
  const dictStore = create<DictStore>((set: any) => ({
    dictData: [],
    fetchDict: async () => {
      const res = await getDict();
      set({ dictData: res?.data });
    },
  }));
  
  export default dictStore;