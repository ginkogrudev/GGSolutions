// GG SOLUTIONS - INTERACTION ENGINE 2026

/**
 * Предизвиква кратка вибрация за тактилно потвърждение.
 * Работи на Android устройства.
 */
function hapticFeedback() {
  if (window.navigator && window.navigator.vibrate) {
    // 50ms е златният стандарт за "клик" усещане
    window.navigator.vibrate(50);
  }
}

/**
 * Инициализира автоматично тактилната обратна връзка
 * за всички важни бутони в приложението.
 */
document.addEventListener('DOMContentLoaded', () => {
  // Селектираме всички големи бутони и навигационни линкове
  const interactiveElements = document.querySelectorAll('.btn-primary, .btn-secondary, .nav-link, button');

  interactiveElements.forEach((el) => {
    el.addEventListener('click', () => {
      hapticFeedback();
    });
  });
});
