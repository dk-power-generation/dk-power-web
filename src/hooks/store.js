import { create } from 'zustand';

const useStore = create((set) => ({
  files: [],
  equipment: [],
  permits: [],
  setFiles: (files) => set({ files }),
  setEquipment: (equipment) => set({ equipment }),
  setPermits: (permits) => set({ permits }),
}));

export default useStore;