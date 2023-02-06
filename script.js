const modal = document.querySelector('.modal');
const overLay = document.querySelector('.overlay');
const openButtons = document.querySelectorAll('.btn--show-modal');
const closeButton = document.querySelector('.btn--close-modal');
const navButtons = document.querySelectorAll('.nav__link');
const scrollToBtn = document.querySelector('.btn--scroll-to');
const sectionOne = document.getElementById('section--1');
const tabsButtonsContainr = document.querySelector(
  '.operations__tab-container'
);

const openModal = e => {
  e.preventDefault();
  modal.classList.remove('hidden');
  overLay.classList.remove('hidden');
};

const closeModal = () => {
  modal.classList.add('hidden');
  overLay.classList.add('hidden');
};
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

openButtons.forEach(btn => btn.addEventListener('click', openModal));
closeButton.addEventListener('click', closeModal);
overLay.addEventListener('click', closeModal);

navButtons.forEach(nv => {
  nv.addEventListener('click', e => {
    e.preventDefault();
    let sectionID = e.target.getAttribute('href').split('--')[1];
    document.querySelector(`#section--${sectionID}`).scrollIntoView({
      behavior: 'smooth',
    });
  });
});

scrollToBtn.addEventListener('click', e => {
  e.preventDefault();
  sectionOne.scrollIntoView({
    behavior: 'smooth',
  });
});

tabsButtonsContainr.addEventListener('click', e => {
  const btnEl = e.target.closest('.operations__tab');
  let contentId = btnEl.dataset.tab;
  document
    .querySelectorAll('.operations__tab')
    .forEach(btn => btn.classList.remove('operations__tab--active'));
  btnEl.classList.add('operations__tab--active');
  const operationContents = document.querySelectorAll('.operations__content');
  operationContents.forEach(opc =>
    opc.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${contentId}`)
    .classList.add('operations__content--active');
});
