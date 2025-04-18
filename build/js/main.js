//-----vars---------------------------------------
const windowEl = window;
const documentEl = document;
const htmlEl = document.documentElement;
const bodyEl = document.body;
const activeClass = 'active';
const activeClassMode = 'mode';
const header = document.querySelector('header');
const footer = document.querySelector('footer');

const burger = document.querySelectorAll('.burger');
const mobileMenu = document.querySelector('.mobile');
const mobileMenuCloseBtn = document.querySelectorAll('.mobile__close');

const latestSliders = document.querySelectorAll('.latest-section__wrapp');

//------------------------------------------------

//----customFunction------------------------------
const toggleCustomClass = (item, customClass = "active") => {
  item.classList.toggle(customClass);
};

const toggleClassInArray = (arr, customClass = "active") => {
  arr.forEach((item) => {
    item.classList.toggle(customClass);
  });
};

const removeClassInArray = (arr, customClass = "active") => {
  arr.forEach((item) => {
    item.classList.remove(customClass);
  });
};

const addCustomClass = (item, customClass = "active") => {
  item.classList.add(customClass);
};

const addClassInArray = (arr, customClass) => {
  arr.forEach((item) => {
    item.classList.add(customClass);
  });
}

const removeCustomClass = (item, customClass = "active") => {
  item.classList.remove(customClass);
};

const disableScroll = () => {
  const fixBlocks = document?.querySelectorAll(".fixed-block");
  const pagePosition = window.scrollY;
  const paddingOffset = `${window.innerWidth - bodyEl.offsetWidth}px`;

  htmlEl.style.scrollBehavior = "none";
  fixBlocks.forEach((el) => {
    el.style.paddingRight = paddingOffset;
  });
  bodyEl.style.paddingRight = paddingOffset;
  bodyEl.classList.add("dis-scroll");
  bodyEl.dataset.position = pagePosition;
  bodyEl.style.top = `-${pagePosition}px`;
};

const enableScroll = () => {
  const fixBlocks = document?.querySelectorAll(".fixed-block");
  const body = document.body;
  const pagePosition = parseInt(bodyEl.dataset.position, 10);
  fixBlocks.forEach((el) => {
    el.style.paddingRight = "0px";
  });
  bodyEl.style.paddingRight = "0px";

  bodyEl.style.top = "auto";
  bodyEl.classList.remove("dis-scroll");
  window.scroll({
    top: pagePosition,
    left: 0,
  });
};

const elementHeight = (el, variableName) => {
  if(el) {
    function initListener(){
      const elementHeight = el.offsetHeight;
      document.querySelector(':root').style.setProperty(`--${variableName}`, `${elementHeight}px`);
    }
    window.addEventListener('DOMContentLoaded', initListener)
    window.addEventListener('resize', initListener)
  }
}

//----burger------------------------------------
const mobileMenuHandler = function (mobileMenu, burger) {
  burger.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      toggleCustomClass(mobileMenu, activeClass);
      toggleClassInArray(burger, activeClass);

      if (mobileMenu.classList.contains(activeClass)) {
        disableScroll();
        addCustomClass(header, "open-menu");
      } else {
        enableScroll();
        removeCustomClass(header, "open-menu");
      }
    });
  });
};

const hideMenuHandler = function ( mobileMenu, burger) {
  enableScroll();
  removeCustomClass(mobileMenu, activeClass);
  removeClassInArray(burger, activeClass);

  if (mobileMenu.classList.contains(activeClass)) {
    disableScroll();
    addCustomClass(header, "open-menu");
  } else {
    enableScroll();
    removeCustomClass(header, "open-menu");
  }
};

document.addEventListener("DOMContentLoaded", function () {
  mobileMenuHandler(mobileMenu, burger);

  if (mobileMenu) {
    mobileMenu.querySelectorAll("a").forEach(function (item) {
      item.addEventListener("click", function () {
          hideMenuHandler(mobileMenu, burger);
      });
    });
  }

  if (mobileMenuCloseBtn) {
    mobileMenuCloseBtn.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        hideMenuHandler(mobileMenu, burger);
      });
    });
  }
});

//----Sliders----------------------------------
document.addEventListener("DOMContentLoaded", function () {
  if(latestSliders){
    latestSliders.forEach(function (slider) {
      const container = slider.querySelector(".swiper-container");
      const nextBtn = slider.querySelector(".swiper-button-next");
      const prevBtn = slider.querySelector(".swiper-button-prev");
  
      const latestSwiper = new Swiper(container, {
        speed: 1800,
        watchOverflow: true,
        loop:true,
        observer: true,
        observeParents: true,
        navigation: {
          nextEl: nextBtn,
          prevEl: prevBtn,
        },
        breakpoints: {
          320: {
            spaceBetween: 10,
            slidesPerView: 1,
          },
          768: {
            spaceBetween: 20,
            slidesPerView: 2,
          },
          1024: {
            spaceBetween: 45,
            slidesPerView: 3,
          },
        },
      });
    });
  }
});




