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
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const sections = document.querySelectorAll('.section');
const images = document.querySelectorAll('.lazy-img');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const slides = document.querySelectorAll('.slide');
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

const navHeight = nav.getBoundingClientRect().height;
const navCallBack = entries => {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const navOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};
const navObserver = new IntersectionObserver(navCallBack, navOptions);
navObserver.observe(header);

const revealSectionCall = entries => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  else entry.target.classList.remove('section--hidden');
};
const sectionObserver = new IntersectionObserver(revealSectionCall, {
  root: null,
  threshold: 0.15,
});
sections.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});
const imgCallBack = entries => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });
};
const imgObserver = new IntersectionObserver(imgCallBack, {
  root: null,
  threshold: 0.4,
});

images.forEach(img => imgObserver.observe(img));

const maxSlides = slides.length;
let currentSlide = 0;
const goToSlide = s => {
  slides.forEach((sl, i) => {
    sl.style.transform = `translateX(${100 * (i - s)}%)`;
    console.log('CURRENT SLIDE: ' + s);
    console.log(i, sl);
  });
};
goToSlide(0);
const nextSlider = () => {
  console.log('right Button clicked');
  if (currentSlide === maxSlides - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
};
const prevSlider = () => {
  console.log(currentSlide);
  if (currentSlide === 0) {
    currentSlide == maxSlides - 1;
    console.log(currentSlide);
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
};

btnRight.addEventListener('click', nextSlider);
btnLeft.addEventListener('click', prevSlider);

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') nextSlider();
  e.key === 'ArrowLeft' && prevSlider();
});
