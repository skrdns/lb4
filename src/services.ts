import { Book, User, IBook, IUser } from './models';
import { Library } from './library';

export class BookService {
  private library: Library<IBook>;

  constructor() {
    this.library = new Library<IBook>('books');
  }

  addBook(title: string, author: string, year: number): boolean {
    try {
      const book = new Book(title, author, year);
      this.library.add(book);
      return true;
    } catch (error) {
      console.error('Error adding book:', error);
      return false;
    }
  }

  removeBook(id: string): void {
    this.library.remove(id);
  }

  getAllBooks(): IBook[] {
    return this.library.getAll();
  }

  borrowBook(bookId: string): void {
    const book = this.library.findById(bookId);
    if (book && !book.isBorrowed) {
      book.isBorrowed = true;
      this.library.update(book);
    }
  }

  returnBook(bookId: string): void {
    const book = this.library.findById(bookId);
    if (book && book.isBorrowed) {
      book.isBorrowed = false;
      this.library.update(book);
    }
  }
}

export class UserService {
  private library: Library<IUser>;

  constructor() {
    this.library = new Library<IUser>('users');
  }

  addUser(name: string, email: string): boolean {
    try {
      const user = new User(name, email);
      this.library.add(user);
      return true;
    } catch (error) {
      console.error('Error adding user:', error);
      return false;
    }
  }

  removeUser(id: string): void {
    this.library.remove(id);
  }

  getAllUsers(): IUser[] {
    return this.library.getAll();
  }

  borrowBook(userId: string, bookId: string): void {
    const user = this.library.findById(userId);
    if (user) {
      if (user.borrowedBooks.length >= 3) {
        throw new Error('Користувач не може позичити більше 3-х книг');
      }
      user.borrowedBooks.push(bookId);
      this.library.update(user);
    }
  }

  returnBook(userId: string, bookId: string): void {
    const user = this.library.findById(userId);
    if (user) {
      user.borrowedBooks = user.borrowedBooks.filter((id) => id !== bookId);
      this.library.update(user);
    }
  }

  getUserByBookId(bookId: string): IUser | undefined {
    return this.getAllUsers().find((user) =>
      user.borrowedBooks.includes(bookId)
    );
  }
}
