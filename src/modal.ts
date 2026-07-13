export const showCustomModal = (title: string, message: string): void => {
  const elModal = document.getElementById('custom-modal');
  const elTitle = document.getElementById('modal-title');
  const elBody = document.getElementById('modal-body');
  if (elModal && elTitle && elBody) {
    elTitle.textContent = title;
    elBody.textContent = message;
    elModal.classList.remove('hidden');
  }
};
