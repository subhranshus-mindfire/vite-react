export function loadFromStorage<T = any>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) as T : null;
  } catch (error) {
    console.error(`Error loading "${key}" from storage:`, error);
    return null;
  }
}

export function saveToStorage<T = any>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving "${key}" to storage:`, error);
  }
}
