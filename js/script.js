document.addEventListener('DOMContentLoaded', function () {
  const feedbackBtn = document.getElementById('feedbackBtn');
  const contactItBtn = document.getElementById('contactItBtn');
  const breakfastBtn = document.getElementById('breakfastBtn');
  const mainContent = document.getElementById('popupMain');
  const popupTwist = document.getElementById('popupTwist');
  const twistDetails = document.getElementById('twistDetails');
  const twistFinal = document.getElementById('twistFinal');
  const popup = document.getElementById('itPopup');
  const confettiContainer = document.getElementById('confetti-container');

  // Focus dans la popup + trap focus
  if (popup) {
    popup.focus();
    trapFocus(popup);
  }

  // Passage au panneau "Merci pour le feed-back" quand on clique sur "Merci pour le feed-back"
  if (feedbackBtn) {
    feedbackBtn.addEventListener('click', function () {
      mainContent.classList.add('is-hidden');
      popupTwist.classList.remove('is-hidden');
      popup.classList.add('it-popup--twist');
    });
  }

  // Animation shake quand on clique sur "Contacter le support IT"
  if (contactItBtn) {
    contactItBtn.addEventListener('click', function () {
      if (!popup.classList.contains('it-popup--shake')) {
        popup.classList.add('it-popup--shake');
        console.log('Support IT : indisponible. Merci de contacter le service Croissants.');
        setTimeout(function () {
          popup.classList.remove('it-popup--shake');
        }, 450);
      }
    });
  }

  // Quand on clique sur "J’accepte et je ramène le petit-déjeuner"
  // -> on remplace tout le texte par l'écran final + confettis
  if (breakfastBtn && confettiContainer) {
    breakfastBtn.addEventListener('click', function () {
      // cacher les détails
      if (twistDetails) {
        twistDetails.classList.add('is-hidden');
      }
      // afficher l'écran final
      if (twistFinal) {
        twistFinal.classList.remove('is-hidden');
      }
      // lancer les confettis
      launchConfetti(confettiContainer);
    });
  }

  // ───────────────────────────────────
  // Fonctions utilitaires
  // ───────────────────────────────────

  function launchConfetti(container) {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      // respect des préférences d’accessibilité : pas d’animation forte
      return;
    }

    const colors = ['#00e47c', '#08312a', '#ffffff', '#e5e3de'];
    const numPieces = 150;

    // On nettoie d'abord d'éventuels anciens confettis
    container.innerHTML = '';

    for (let i = 0; i < numPieces; i++) {
      const piece = document.createElement('div');
      piece.classList.add('confetti-piece');

      const left = Math.random() * 100; // vw
      const delay = Math.random() * 0.8; // s
      const duration = 3 + Math.random() * 2; // s
      const color = colors[Math.floor(Math.random() * colors.length)];

      piece.style.left = left + 'vw';
      piece.style.backgroundColor = color;
      piece.style.animationDelay = delay + 's';
      piece.style.animationDuration = duration + 's';

      container.appendChild(piece);
    }

    // Nettoyage après l’animation
    setTimeout(function () {
      container.innerHTML = '';
    }, 6000);
  }

  function trapFocus(element) {
    const focusableSelectors =
      'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])';
    const focusable = element.querySelectorAll(focusableSelectors);
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    element.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }
});
