'use strict';
(function () {

  var validatePhone = function (element) {
    var imPhone = new Inputmask('+7 (999) 999-99-99');
    imPhone.mask(element);
  };

  // POPUP

  const formTemplate = document.querySelector('#popup').content.querySelector('.modal');
  const btnCallback = document.querySelector('.button--callback');

  const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

  const closePopup = (popup) => {
    popup.remove();
    document.body.style.overflow = '';
  }

  const showMessage = (form) => {
    const modal = document.querySelector('.modal');
    const btnCloseModal = modal.querySelector('.modal__btn');
    const modalInputPhone = modal.querySelector('[name="modal-phone"]');
    const btnForm = modal.querySelector('.button--modal');

    if (modal) {
      let name = modal.querySelector('#modal-first-name');
      let phone = modal.querySelector('#modal-phone-id');
      let message = modal.querySelector('#modal-question-id');
      name.focus();

      let isStorageSupport = true;
      let storageName = '';
      let storagePhone = '';
      let storageMessage = '';

      try {
        storageName = localStorage.getItem('name');
        storagePhone = localStorage.getItem('phone');
        storageMessage = localStorage.getItem('message');
      } catch (err) {
        isStorageSupport = false;
      }

      if (isStorageSupport) {
        if (storageName) {
          name.value = storageName;
        }
        if (storagePhone) {
          phone.value = storagePhone;
        }
        if (storageMessage) {
          message.innerText = storageMessage;
        }
      }

      function sendHandler(evt) {
        if (!name.value) {
          evt.preventDefault();
          name.focus();
        } else if (name.value && !phone.value) {
          evt.preventDefault();
          phone.focus();
        } else if (name.value && phone.value && !message.value) {
          evt.preventDefault();
          message.focus();
        } else {
          localStorage.setItem('name', name.value);
          localStorage.setItem('phone', phone.value);
          localStorage.setItem('message', message.value);
        }
      }
    }

    document.body.insertAdjacentElement('beforeend', form);
    document.body.style.overflow = 'hidden';

    btnForm.addEventListener('click', sendHandler);

    validatePhone(modalInputPhone);
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

  // FOOTER ACCORDION
  const footerNavigation = document.querySelector('.footer__site-nav');
  const buttonsOpenMenu = footerNavigation.querySelectorAll('.footer__btn');
  const accordions = footerNavigation.querySelectorAll('.footer__accordion');

  accordions.forEach(list => list.classList.remove('footer__accordion--no-js'));
  buttonsOpenMenu.forEach(btn => btn.classList.remove('footer__btn--no-js'));

  for (let i = 0; i < buttonsOpenMenu.length; i++) {
    buttonsOpenMenu[i].addEventListener('click', toggleItem, false)
  }

  const hideList = (list) => {
    list.classList.remove('footer__accordion-open');
    list.classList.add('footer__accordion-close');
  }

  const showList = (list) => {
    list.classList.add('footer__accordion-open');
    list.classList.remove('footer__accordion-close');
  }

  function toggleItem() {
    let item = this.parentElement;

    if (item.classList.contains('footer__accordion-close')) {
      accordions.forEach(list => hideList(list));
      showList(item);
    } else {
      hideList(item);
    }
  }

  // ANCHOR SCROLL

  const anchors = document.querySelectorAll('a[href*="#"]');  //выбираем все ссылки к якорю на странице
  const SPEED = 0.7;                                          // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
  for (let i = 0; i < anchors.length; i++) {
    anchors[i].addEventListener('click', function(evt) {
      evt.preventDefault();
      const scrollTo = window.pageYOffset;                  // производим прокрутку
      const hash = this.href.replace(/[^#]*(.*)/, '$1');    // id элемента, к которому нужно перейти
      const padding = document.querySelector(hash).getBoundingClientRect().top;  // отступ от окна браузера до id
      let start = null;
      requestAnimationFrame(step);
      function step(time) {
        if (start === null) start = time;
        const progress = time - start;
        const distance = (padding < 0 ? Math.max(scrollTo - progress/SPEED, scrollTo + padding) : Math.min(scrollTo + progress/SPEED, scrollTo + padding));
        window.scrollTo(0, distance);
        if (distance != scrollTo + padding) {
          requestAnimationFrame(step)
        } else {
          location.hash = hash;
        }
      }
    }, false);
  }
  // = = = = = = = = = = = = = = = = = = = = = = = = = = = //

  // INPUT MASK FORM



  const feedbackBlock = document.querySelector('.feedback')

  if (feedbackBlock) {
    // debugger
    const phoneInputForm = feedbackBlock.querySelector('#phone-form-field');
    validatePhone(phoneInputForm);
  }

})();


