export class Modal {
  static showSuccessModal(message: string): void {
    const modalElement = document.getElementById('successModal');
    const messageElement = document.getElementById('successModalMessage');

    if (messageElement) {
      messageElement.textContent = message;
    }
    if (modalElement) {
      modalElement.style.display = 'block';
      modalElement.classList.add('show');
      modalElement.setAttribute('aria-hidden', 'false');
    }
  }

  static hideModal(modalId: string): void {
    const modalElement = document.getElementById(modalId);

    if (modalElement) {
      modalElement.style.display = 'none';
      modalElement.classList.remove('show');
      modalElement.setAttribute('aria-hidden', 'true');
    }
  }

  static showBorrowBookModal(
    bookId: string,
    onConfirm: (userId: string) => void
  ): void {
    const modalElement = document.getElementById('borrowBookModal');
    const confirmButton = document.getElementById('confirmBorrowButton');
    const userIdInput = document.getElementById(
      'borrowUserId'
    ) as HTMLInputElement;

    const handleConfirm = () => {
      const userId = userIdInput.value.trim();
      if (userId) {
        onConfirm(userId);
        this.hideModal('borrowBookModal');
      } else {
        alert('Будь ласка, введіть ID користувача');
      }
    };

    if (confirmButton) {
      confirmButton.onclick = handleConfirm;
    }

    if (modalElement) {
      modalElement.style.display = 'block';
      modalElement.classList.add('show');
      modalElement.setAttribute('aria-hidden', 'false');
    }

    userIdInput.value = '';
  }

  static showSuccessBookActionModal(action: 'borrowed' | 'returned'): void {
    const message =
      action === 'borrowed'
        ? 'Книгу успішно позичено'
        : 'Книгу успішно повернено';
    const modalElement = document.getElementById('bookActionModal');
    const messageElement = document.getElementById('bookActionModalMessage');

    if (messageElement) {
      messageElement.textContent = message;
    }

    if (modalElement) {
      modalElement.style.display = 'block';
      modalElement.classList.add('show');
      modalElement.setAttribute('aria-hidden', 'false');
    }
  }

  static showErrorModal(title: string, message: string): void {
    const modalElement = document.getElementById('errorModal');
    const titleElement = document.getElementById('errorModalTitle');
    const messageElement = document.getElementById('errorModalMessage');

    if (titleElement) {
      titleElement.textContent = title;
    }
    if (messageElement) {
      messageElement.textContent = message;
    }

    if (modalElement) {
      modalElement.style.display = 'block';
      modalElement.classList.add('show');
      modalElement.setAttribute('aria-hidden', 'false');
    }
  }
}

document.querySelectorAll('.btn-close, .btn-secondary').forEach((button) => {
  button.addEventListener('click', (event) => {
    const modalId = (event.target as HTMLElement).getAttribute('data-modal-id');
    if (modalId) {
      Modal.hideModal(modalId);
    }
  });
});
