const modal = document.querySelector('.modal');
const overLay = document.querySelector('.overlay');
const openButtons = document.querySelectorAll('.btn--show-modal');
const closeButton = document.querySelector('.btn--close-modal');
const navButtons = document.querySelectorAll('.nav__link');
const nav = document.querySelector('.nav');
const sectionOne = document.querySelector('.section');

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
    // console.log(e.target.getAttribute('href').split('--')[1]);
    let sectionID = e.target.getAttribute('href').split('--')[1];
    // console.log(document.querySelector(`#section--${sectionID}`));
    document.querySelector(`#section--${sectionID}`).scrollIntoView({
        behavior:"smooth"
    })
  });
});
