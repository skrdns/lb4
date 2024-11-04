import { Book, IBook, IUser, User } from '../src/models';
import assert from 'assert';

export class Library<T extends IBook | IUser> {
  private items: T[] = [];
  private static idKey = 'nextId';
  private nextId: number = 1;

  private inMemoryStorage: Record<string, any> = {};

  constructor(
    private storageKey: string,
    useInMemoryStorage = false
  ) {
    if (useInMemoryStorage) {
      this.inMemoryStorage = {};
    } else {
      this.loadFromStorage();
    }
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
    (item as any).id = id;
    this.items.push(item);
    if (this.inMemoryStorage) {
      this.inMemoryStorage[this.storageKey] = this.items;
      this.inMemoryStorage[Library.idKey] = this.nextId;
    } else {
      this.saveToStorage();
    }
    return id;
  }

  remove(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);
    if (this.inMemoryStorage) {
      this.inMemoryStorage[this.storageKey] = this.items;
    } else {
      this.saveToStorage();
    }
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
      if (this.inMemoryStorage) {
        this.inMemoryStorage[this.storageKey] = this.items;
      } else {
        this.saveToStorage();
      }
    }
  }
}

describe('Library with In-Memory Storage', function () {
  let bookLibrary: Library<IBook>;
  let userLibrary: Library<IUser>;

  beforeEach(function () {
    // Initialize libraries with in-memory storage
    bookLibrary = new Library<IBook>('books', true);
    userLibrary = new Library<IUser>('users', true);
  });

  it('should add and retrieve a book', function () {
    const book = new Book('Test Book', 'Test Author', 2023);
    const id = bookLibrary.add(book);
    const addedBook = bookLibrary.findById(id);

    assert.strictEqual(addedBook?.title, 'Test Book');
    assert.strictEqual(addedBook?.author, 'Test Author');
    assert.strictEqual(addedBook?.year, 2023);
    assert.strictEqual(addedBook?.isBorrowed, false);
  });

  it('should add and retrieve a user', function () {
    const user = new User('Test User', 'test@example.com');
    const id = userLibrary.add(user);
    const addedUser = userLibrary.findById(id);

    assert.strictEqual(addedUser?.name, 'Test User');
    assert.strictEqual(addedUser?.email, 'test@example.com');
    assert.deepStrictEqual(addedUser?.borrowedBooks, []);
  });

  it('should remove a book', function () {
    const book = new Book('Book to Remove', 'Test Author', 2023);
    const id = bookLibrary.add(book);
    bookLibrary.remove(id);
    const removedBook = bookLibrary.findById(id);

    assert.strictEqual(removedBook, undefined);
  });

  it('should remove a user', function () {
    const user = new User('User to Remove', 'test@example.com');
    const id = userLibrary.add(user);
    userLibrary.remove(id);
    const removedUser = userLibrary.findById(id);

    assert.strictEqual(removedUser, undefined);
  });

  it('should update a book', function () {
    const book = new Book('Old Title', 'Test Author', 2023);
    const id = bookLibrary.add(book);
    const updatedBook: IBook = { ...book, title: 'Updated Title', id };
    bookLibrary.update(updatedBook);
    const foundBook = bookLibrary.findById(id);

    assert.strictEqual(foundBook?.title, 'Updated Title');
  });

  it('should update a user', function () {
    const user = new User('Old Name', 'test@example.com');
    const id = userLibrary.add(user);
    const updatedUser: IUser = { ...user, name: 'Updated Name', id };
    userLibrary.update(updatedUser);
    const foundUser = userLibrary.findById(id);

    assert.strictEqual(foundUser?.name, 'Updated Name');
  });

  it('should get all books', function () {
    const id1 = bookLibrary.add(new Book('Book 1', 'Author 1', 2023));
    const id2 = bookLibrary.add(new Book('Book 2', 'Author 2', 2024));

    const allBooks = bookLibrary.getAll();

    assert.strictEqual(allBooks.length, 2);
    assert.strictEqual(allBooks.find((b) => b.id === id1)?.title, 'Book 1');
    assert.strictEqual(allBooks.find((b) => b.id === id2)?.title, 'Book 2');
  });

  it('should get all users', function () {
    const id1 = userLibrary.add(new User('User 1', 'user1@example.com'));
    const id2 = userLibrary.add(new User('User 2', 'user2@example.com'));

    const allUsers = userLibrary.getAll();

    assert.strictEqual(allUsers.length, 2);
    assert.strictEqual(allUsers.find((u) => u.id === id1)?.name, 'User 1');
    assert.strictEqual(allUsers.find((u) => u.id === id2)?.name, 'User 2');
  });
});
