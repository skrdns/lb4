import { IBook, IUser } from './models';

export class Library<T extends IBook | IUser> {
  private items: T[] = [];
  private static idKey = 'nextId';
  private nextId: number = 1;

  constructor(private storageKey: string) {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      this.items = JSON.parse(data);
    }
    const nextId = localStorage.getItem(Library.idKey);
    if (nextId) {
      this.nextId = parseInt(nextId, 10);
    }
  }

  private saveToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    localStorage.setItem(Library.idKey, this.nextId.toString());
  }

  private generateId(): string {
    return (this.nextId++).toString();
  }

  add(item: T): string {
    const id = this.generateId();

    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    (item as any).id = id;
    this.items.push(item);
    this.saveToStorage();
    return id;
  }

  remove(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);
    this.saveToStorage();
  }

  getAll(): T[] {
    return this.items;
  }

  findById(id: string): T | undefined {
    return this.items.find((item) => item.id === id);
  }

  update(item: T): void {
    const index = this.items.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      this.items[index] = item;
      this.saveToStorage();
    }
  }
}
