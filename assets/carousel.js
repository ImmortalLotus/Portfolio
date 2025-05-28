class SlideCarousel extends HTMLElement {
  constructor() {
    super();
    this.slider = null;
    this.bullet = null;
    this.startX = 0;
    this.isDragging = false;
    this.hasSlid = false;
  }

  connectedCallback() {
    this.slider = this.querySelector(".track");
    this.btn1=this.querySelector('.btn-net')
    this.btn2=this.querySelector('.btn-python')
    this.btn3=this.querySelector('.btn-js')
    this.initFirstSlide();
    this.setupDrag();
  }

  get currentIndex() {
    return parseInt(this.slider.dataset.currentIndex || 0, 10);
  }

  set currentIndex(index) {
    this.slider.dataset.currentIndex = index;
  }

  initFirstSlide() {
    this.currentIndex = 0;
    const firstSlide = this.slider?.children[0];
    firstSlide?.classList.add("active");
  }

  setupDrag() {
    const getX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);
    const threshold = this.slider.children[0].clientWidth * 0.25;

    const handleStart = (e) => {
      e.stopPropagation();
      this.startX = getX(e);
      this.isDragging = true;
      this.hasSlid = false;
      this.slider.style.transition = "none";
    };

    const handleMove = (e) => {
      e.stopPropagation();
      if (!this.isDragging) return;

      const deltaX = getX(e) - this.startX;
      const index = this.currentIndex;

      if (index === 0 && deltaX > 0) return;
      if (index === this.slider.children.length - 1 && deltaX < 0) return;

      this.slider.style.transform = `translateX(calc(-${100 * index}% - ${
        16 * index
      }px + ${deltaX}px))`;

      if (!this.hasSlid && deltaX > threshold) {
        this.slidePrev();
        this.isDragging = false;
        this.hasSlid = true;
      } else if (!this.hasSlid && deltaX < -threshold) {
        this.slideNext();
        this.isDragging = false;
        this.hasSlid = true;
      }
    };

    const handleEnd = (e) => {
      e.stopPropagation();
      if (!this.hasSlid) {
        this.animateSlider(null, this.currentIndex);
      }
      this.isDragging = false;
    };

    // Souris
    this.btn1.addEventListener("click", ()=>{
        this.goToSlide(0);
        this.btn1.classList.add('bg-white', 'text-black');
        this.btn2.classList.remove('bg-white', 'text-black');
        this.btn3.classList.remove('bg-white', 'text-black');
    });
    this.btn2.addEventListener("click", ()=>{
        this.goToSlide(1);
        this.btn1.classList.remove('bg-white', 'text-black');
        this.btn2.classList.add('bg-white', 'text-black');
        this.btn3.classList.remove('bg-white', 'text-black');
    });
    this.btn3.addEventListener("click", ()=>{
        this.goToSlide(2);
        this.btn1.classList.remove('bg-white', 'text-black');
        this.btn2.classList.remove('bg-white', 'text-black');
        this.btn3.classList.add('bg-white', 'text-black');
    });
  }

  goToSlide(index) {
  const slides = [...this.slider.children];
  if (index < 0 || index >= slides.length || index === this.currentIndex) return;

  slides[this.currentIndex].classList.remove("active");
  slides[index].classList.add("active");
  this.currentIndex = index;
  this.animateSlider(null, index);
}

  slideNext() {
    const slides = [...this.slider.children];
    const index = this.currentIndex;
    if (index < slides.length - 1) {
      slides[index].classList.remove("active");
      slides[index + 1].classList.add("active");
      this.currentIndex = index + 1;
      this.animateSlider("next", index + 1);
    }
  }

  slidePrev() {
    const slides = [...this.slider.children];
    const index = this.currentIndex;
    if (index > 0) {
      slides[index].classList.remove("active");
      slides[index - 1].classList.add("active");
      this.currentIndex = index - 1;
      this.animateSlider("prev", index - 1);
    }
  }

  animateSlider(direction, index) {
    const gap = parseFloat(getComputedStyle(this.slider).gap) || 0;
    const translate = `translateX(calc(-${100 * index}% - ${gap * index}px))`;

    this.slider.style.transform = translate;
    this.slider.style.transition = "transform 0.5s ease-in";

    if (this.bullet) {
      this.bullet.style.transform = `translateX(calc(100% * ${index}))`;
    }
  }
}

customElements.define("slide-carousel", SlideCarousel);
