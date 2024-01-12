import { create } from 'zustand';
const useModalStore = create((set) => ({
  isOpen: false, // Modal açık mı kapalı mı?
  errorMessage: '', // Hata mesajları
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  displayErrorMessage: (message) => set({ errorMessage: message }),
}));
export default useModalStore;
