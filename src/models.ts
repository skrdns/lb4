export interface IBook {
  id: string;
  title: string;
  author: string;
  year: number;
  isBorrowed: boolean;
}

export class Book implements IBook {
  id: string;
  title: string;
  author: string;
  year: number;
  isBorrowed: boolean;

  constructor(title: string, author: string, year: number) {
    this.id = Date.now().toString();
    this.title = title;
    this.author = author;
    this.year = year;
    this.isBorrowed = false;
  }
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  borrowedBooks: string[];
}

export class User implements IUser {
  id: string;
  name: string;
  email: string;
  borrowedBooks: string[];

  constructor(name: string, email: string) {
    this.id = Date.now().toString();
    this.name = name;
    this.email = email;
    this.borrowedBooks = [];
  }
}
