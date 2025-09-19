import { STORAGE_KEY } from "../../core/constants/storage.constants";
import { StorageState } from "../../core/services/storage.store";

export const saveToLocalStorage = (state: StorageState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    console.warn('Failed to save to localStorage');
  }
}

export const loadFromLocalStorage = (): StorageState | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.users) || !Array.isArray(parsed.tasks)) return null;
    return parsed as StorageState;
  } catch {
    return null;
  }
}