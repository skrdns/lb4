export class Storage {
  static clear(): void {
    localStorage.clear();
  }

  static remove(key: string): void {
    localStorage.removeItem(key);
  }
}
