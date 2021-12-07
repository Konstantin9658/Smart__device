'use strict';
(function () {
  // POPUP

  const formTemplate = document.querySelector('#popup').content.querySelector('.modal');
  const btnCallback = document.querySelector('.button--callback');


  const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

  const closePopup = (popup) => popup.remove();

  const showMessage = (form) => {
    document.body.insertAdjacentElement('beforeend', form);
    const modal = document.querySelector('.modal');
    const btnCloseModal = modal.querySelector('.modal__btn');
    btnCloseModal.addEventListener('click', () => closePopup(form));
    document.addEventListener('keydown', (evt) => {
      if (isEscEvent(evt)) {
        evt.preventDefault();
        closePopup(form);
      }
    }, {once: true});
  };

  const showPopup = () => showMessage(formTemplate.cloneNode(true));
  btnCallback.addEventListener('click', showPopup);
  // = = = = = = = = = = = = = = = = = = = = = = = = = = = //

  // FOOTER MENU
  const footerNavigation = document.querySelector('.footer__site-nav');
  const buttonsOpenMenu = footerNavigation.querySelectorAll('.footer__btn');
  const accordions = footerNavigation.querySelectorAll('.footer__accordion');

  accordions.forEach(list => list.classList.remove('footer__accordion--no-js'));
  buttonsOpenMenu.forEach(btn => btn.classList.remove('footer__btn--no-js'));

  for (let i = 0; i < buttonsOpenMenu.length; i++) {
    buttonsOpenMenu[i].addEventListener('click', toggleItem, false)
  }

  function toggleItem() {debugger
    const item = this.parentElement;

    accordions.forEach(item => item.classList.remove('footer__accordion-open'))

    // accordions.forEach(item => item.classList.add('footer__accordion-close'))

    if (item.classList.contains('footer__accordion-close')) {
      item.classList.remove('footer__accordion-close');
      item.classList.add('footer__accordion-open');
    } else {
      item.classList.add('footer__accordion-close');
    }
  }
})();


