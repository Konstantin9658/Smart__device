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
  const navigationsLists =  footerNavigation.querySelectorAll('.footer__list-show');

  navigationsLists.forEach((list) => {
    if(list.classList.contains('footer__list-show')) {
      list.classList.remove('footer__list-show');
    }
  })

  buttonsOpenMenu.forEach(btn => btn.classList.remove('footer__btn--no-js'))

  const hideList = (list, btn) => {
    list.classList.remove('footer__list-show');
    btn.classList.add('footer__btn--open');
    btn.classList.remove('footer__btn--close');
  }

  const showList = (list, btn) => {
    list.classList.add('footer__list-show');
    btn.classList.remove('footer__btn--open');
    btn.classList.add('footer__btn--close');
  }

  for (let btn of buttonsOpenMenu) {
    btn.addEventListener('click', (evt) => {
      const element = evt.target;
      const list = element.parentElement.querySelector('ul');

      navigationsLists.forEach(item => item.classList.remove('footer__list-show'));

      if (element.classList.contains('footer__btn--open')) {
        showList(list, element);
      } else {
        hideList(list, element);
      }
    })
  }
})();


