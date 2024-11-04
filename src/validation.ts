export class Validation {
  static validateBook(
    title: string,
    author: string,
    year: string
  ): { [key: string]: string } {
    const errors: { [key: string]: string } = {};

    if (!title.trim()) {
      errors['bookTitle'] = 'Назва книги не може бути пустою';
    }
    if (!author.trim()) {
      errors['bookAuthor'] = 'Автор не може бути пустим';
    }
    if (!year.trim() || isNaN(Number(year))) {
      errors['bookYear'] = 'Рік видання повинен бути числом';
    }

    return errors;
  }

  static validateUser(name: string, email: string): { [key: string]: string } {
    const errors: { [key: string]: string } = {};

    if (!name.trim()) {
      errors['userName'] = "Ім'я не може бути пустим";
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors['userEmail'] = 'Email не є дійсним';
    }

    return errors;
  }

  static displayErrors(errors: { [key: string]: string }): void {
    document.querySelectorAll('.form-control').forEach((input) => {
      input.classList.remove('border', 'border-danger');
    });
    document.querySelectorAll('.text-danger').forEach((el) => {
      el.textContent = '';
    });

    Object.keys(errors).forEach((key) => {
      const field = document.getElementById(key) as HTMLInputElement;
      if (field) {
        field.classList.add('border', 'border-danger');
        const errorElement = document.createElement('div');
        errorElement.classList.add('text-danger');
        errorElement.textContent = errors[key];
        field.parentElement?.appendChild(errorElement);
      }
    });
  }
}
