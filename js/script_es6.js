class ElementAnimation {
  constructor(elem) {
    this.elem = elem;
  }

  isNotUndefined() {
    return (typeof this.elem !== 'undefined' && this.elem !== null);
  }

  zeroOpacity() {
    this.elem.classList.add('js-zero-opacity');
  }

  fullOpacity(duration = 800, easing = 'ease-in-out') {
    this.elem.classList.add('js-full-opacity');
    this.elem.style.transition = `opacity ${duration}ms ${easing}`;
  }

  delay(action, delay, actionPara = 800) {
    setTimeout(() => {
      action.call(this, actionPara);
    }, delay)
  }

  isInViewport() {
    this.bounding = this.elem.getBoundingClientRect();
    return (
      this.bounding.top  >= 0 &&
      this.bounding.left >= 0 &&
      this.bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      this.bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  isHalfInViewport() {
    this.bounding = this.elem.getBoundingClientRect();
    this.computedStyle = window.getComputedStyle(this.elem);
    return (
      this.bounding.top  >= '-' + parseInt(this.computedStyle.height) / 2 &&
      this.bounding.left >= 0 &&
      this.bounding.bottom - parseInt(this.computedStyle.height) / 2 <= (window.innerHeight || document.documentElement.clientHeight) &&
      this.bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  isInVerticalViewport() {
    this.bounding = this.elem.getBoundingClientRect();
    return (
      this.bounding.top  >= 0 &&
      this.bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
  };

  animateIfInView(duration = 800, easing = 'ease-in-out') {
    if (this.isInViewport())
      this.fullOpacity(duration, easing);
  }

  animateIfHalfInView(duration = 800, easing = 'ease-in-out') {

    if (this.isHalfInViewport())
      this.fullOpacity(duration, easing);
  }

  slideDownStartPos(startPos = 10) {
    this.elem.classList.add('js-zero-opacity');
    this.elem.style.transform = `translateY(-${startPos}px)`;
  }

  slideUpStartPos(startPos = 10) {
    this.elem.classList.add('js-zero-opacity');
    this.elem.style.transform = `translateY(${startPos}px)`;
  }

  slideRightStartPos(startPos = 40) {
    this.elem.classList.add('js-zero-opacity');
    this.elem.style.transform = `translateX(-${startPos}vw)`;
  }

  slideLeftStartPos(startPos = 40) {
    this.elem.classList.add('js-zero-opacity');
    this.elem.style.transform = `translateX(${startPos}vw)`;
  }

  slideEndPos(duration = 600, easing = 'ease-in-out') {
    setTimeout(() => {
      this.elem.classList.add('js-full-opacity');
      this.elem.style.transform = `translate(0)`;
      this.elem.style.transition = `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`;
    })
  }

  slideEndPosTransparent(duration = 600, easing = 'ease-in-out') {
    setTimeout(() => {
      this.elem.classList.add('js-94-opacity');
      this.elem.style.transform = `translate(0)`;
      this.elem.style.transition = `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`;
    })
  }
}



// START REMOVE PRELOADER
{
  const preloader = document.getElementsByClassName('preloader')[0];

  const removePreloader = () => {

    // set opacity to 0
    preloader.classList.add('js-preloader-invisible');

    // set display: none
    window.setTimeout(function () {
      preloader.classList.add('js-preloader-remove');
    }, 1500); // should be same as preloader fade out length
  };

  if (typeof preloader !== 'undefined') {

    // set first time loaded var
    let firstTime = localStorage.getItem('first_time');

    // if first time loaded, remove preloader w/delay
    if (!firstTime) {

      localStorage.setItem('first_time','1');

      window.setTimeout(function () {
        removePreloader();
      }, 500);

    // if not first time loaded, remove preloader w/ shorter delay
    } else {
      window.setTimeout(function () {
        removePreloader();
      }, 100);
    }
  }

} // End remove preloader.




// START HIDE NAV ITEMS OF REGULAR NAV.
// SHOW BURGER-NAV.
{
  const mainNav = document.getElementsByClassName('nav-main')[0];
  const liArr = mainNav.getElementsByTagName('li');
  const burger = document.getElementsByClassName('nav-burger')[0];

  let hideNavItems = () => {

    for (let i = 0, j = liArr.length; i < j; i++) {
      if (liArr[i].classList.contains('logo')) continue;

      window.matchMedia('(min-width: 900px)').matches ? liArr[i].classList.remove('hide') : liArr[i].classList.add('hide');
    }
  };
  hideNavItems();

  window.addEventListener('resize', hideNavItems);

  // Show burger-nav.
  burger.classList.remove('hide');

} // End hide nav items of regular nav. Show burger-nav.




// ADD BOX-SHADOW TO HEADER
{
  document.getElementsByTagName('header')[0].classList.add('js-header-box-shadow');
}




// START SET HEADER HEIGHT.
{
  const header = document.getElementsByTagName('header')[0];

  let setHeaderHeight = () => {
    if (window.matchMedia('(min-width: 900px)').matches) return header.style.height = '100px';
    if (window.matchMedia('(min-width: 450px)').matches) return header.style.height = '80px';
    return header.style.height = '57px';
  };
  setHeaderHeight();
  window.addEventListener('resize', setHeaderHeight);
} // End set header height.




// HELPER FUNCTION TO DETECT SCROLL SPEED
var checkScrollSpeed = (function(settings){
    settings = settings || {};
  
    var lastPos, newPos, timer, delta, 
        delay = settings.delay || 50; // in "ms" (higher means lower fidelity )
  
    function clear() {
      lastPos = null;
      delta = 0;
    }
  
    clear();
    
    return function(){
      newPos = window.scrollY;
      if ( lastPos != null ){ // && newPos < maxScroll 
        delta = newPos -  lastPos;
      }
      lastPos = newPos;
      clearTimeout(timer);
      timer = setTimeout(clear, delay);
      return delta;
    };
})();




// START HEADER AND OVERLAY MENU.
{
  const header = document.getElementsByTagName('header')[0];
  const headerBuffer = document.getElementsByClassName('headerBuffer')[0];
  let headerHeight = header.offsetHeight;

  window.addEventListener('resize', () => headerHeight = header.offsetHeight);
  window.addEventListener('resize', () => headerBuffer.style.height = headerHeight + 'px');
  

  // WHEN SCROLLED PAST CERTAIN POINT TURN STATIC HEADER INTO FIXED HEADER
  let headerPositioning_1 = () => {

    // if vp < 900
    if (window.pageYOffset > 500 && window.matchMedia('(max-width: 900px)').matches) {
      header.style.position = 'fixed';
      headerBuffer.style.height = headerHeight + 'px';

    } else if (window.pageYOffset === 0 && window.matchMedia('(max-width: 900px)').matches) {
      header.style.position = 'absolute';
      headerBuffer.style.height = headerHeight + 'px';
    }
  };
  window.addEventListener('scroll', headerPositioning_1);
  window.addEventListener('resize', headerPositioning_1);


  // ON LOAD, SET HEADER TO FIXED/STATIC DEPENDING ON SCROLL POSITION
  let headerPositioning_2 = () => {

    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // if vp < 900
    if (window.pageYOffset > 500 && window.matchMedia('(max-width: 900px)').matches) {
      header.style.position = 'fixed';
      headerBuffer.style.height = headerHeight + 'px';
      header.classList.add('js-header-transition');
    } else {
      header.style.position = 'absolute';
      headerBuffer.style.height = headerHeight + 'px';
    }
  };
  window.addEventListener('load', headerPositioning_2);


  // SHOW/HIDE FIXED HEADER DEPENDING ON SCROLL DIRECTION
  let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

  let showHideHeader = () => {

    // if vp < 900
    if (window.matchMedia('(max-width: 900px)').matches) {

      let headerTransformDistance = headerHeight + 10;
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // down scroll & header === absolute
      if (scrollTop > lastScrollTop && header.style.position === 'absolute' && window.pageYOffset > 300) {
        header.classList.remove('js-header-transition');

        // move up so it won't be visible when positioned changes to fixed
        header.style.transform = 'translateY(-' + headerTransformDistance + 'px)';

      // up scroll & header === absolute
      } else if ((scrollTop < lastScrollTop && header.style.position === 'absolute'))
        header.style.transform = 'translateY(0)';
    

      // down scroll
      if (scrollTop > lastScrollTop && header.style.position === 'fixed' && scrollTop > headerHeight) {
        header.style.transform = 'translateY(-' + headerTransformDistance + 'px)';
        header.classList.add('js-header-transition');

        // if pageYOffset < 500
        if (window.pageYOffset < 500) {
          window.setTimeout(function () {
            // set header = absolute
            header.style.position = 'absolute';
          }, 400);
        }
        
      // up scroll && if past 500
      } else if (scrollTop < lastScrollTop && window.pageYOffset > 500 && checkScrollSpeed() < -15) {

        // show header
        header.style.transform = 'translateY(0)';
        header.classList.add('js-header-transition');
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

    } // end if
  } // end showHideHeader-func
  window.addEventListener('scroll', showHideHeader);



  let setHeaderPosition = () => {

    // vp < 900
    if (window.matchMedia('(max-width: 900px)').matches) return showHideHeader();

    header.style.position = 'absolute';
    header.style.transform = 'translateY(0)';
    header.classList.remove('js-header-transition');
  };
  window.addEventListener('resize', setHeaderPosition);


  // OVERLAY-MENU
  const burger = document.getElementsByClassName('nav-burger')[0];
  const overlay = document.getElementsByClassName('nav-mobile')[0];
  const body = document.body;
  let scrollPosition;

  let menuOverlay = () => {

    // if menu closed
    if (!overlay.classList.contains('js-nav-mobile-show')) {

      // if header absolute add a flag
      if (header.style.position === 'absolute')
        header.classList.add('removeFixed');

      overlay.classList.add('js-nav-mobile-show');
      header.style.position = 'fixed';
      headerBuffer.style.height = headerHeight + 'px';
      header.style.transform = 'translateY(0)';
      window.removeEventListener('scroll', headerPositioning_1);
      window.removeEventListener('scroll', showHideHeader);
      burger.classList.add('js-nav-burger-expand');


      // gets pageYOffset before setting body to fixed
      scrollPosition = window.pageYOffset;

      window.setTimeout(function () {
        document.documentElement.classList.add('noscroll');
      }, 400);

    // if menu opened
    } else {

      // remove fixed from body
      document.documentElement.classList.remove('noscroll');

      // set scroll position to where it was before opening menu
      window.setTimeout(function () {
        document.documentElement.scrollTop = scrollPosition;
      }, 50);


      // call code w/slight delay
      window.setTimeout(function () {

        // if header has a flag, set header to absolute
        if (header.classList.contains('removeFixed')) {
          header.classList.remove('removeFixed');
          header.style.position = 'absolute';

          if (window.pageYOffset > 500) {
            header.classList.remove('removeFixed');
            header.style.position = 'fixed';
          }
        } 

        overlay.classList.remove('js-nav-mobile-show');
        window.addEventListener('scroll', headerPositioning_1);
        window.addEventListener('scroll', showHideHeader);
        burger.classList.remove('js-nav-burger-expand');
      }, 100)

    }

    // IF ON COCKTAILS PAGE TURN NAV-BURGER DARK BLUE
    (body.classList.contains('cocktails') && !burger.classList.contains('js-navBurger-darkBlue')) ? burger.classList.add('js-navBurger-darkBlue') : burger.classList.remove('js-navBurger-darkBlue');

  };
  burger.addEventListener('click', menuOverlay);


  // CLOSE OVERLAY IF VIEWPORT > 900
  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 900px)').matches && overlay.classList.contains('js-nav-mobile-show'))
      overlay.classList.remove('js-nav-mobile-show');
  });

  // ON LOAD MOVE OVERLAY OFF THE PAGE
  window.addEventListener('load', () => {
    overlay.classList.add('js-nav-mobile-transition');
  });


} // End header and overlay menu.




// HELPER FUNC THAT RETURNS TRUE IF ELEM IN VIEWPORT
let isInViewport = (elem) => {
  let bounding = elem.getBoundingClientRect();

  return (
      bounding.top  >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// HELPER FUNC THAT RETURNS TRUE IF HALF OF ELEM IN VIEWPORT
let isHalfInViewport = (elem) => {
  let bounding = elem.getBoundingClientRect();
  let elemStyle = window.getComputedStyle(elem);

  return (
      bounding.top  >= '-' + parseInt(elemStyle.height) / 2 &&
      bounding.left >= 0 &&
      bounding.bottom - parseInt(elemStyle.height) / 2 <= (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// HELPER FUNC THAT RETURNS TRUE IF ELEM IN VIEWPORT
let isInVerticalViewport = (elem) => {
  let bounding = elem.getBoundingClientRect();

  return (
      bounding.top  >= 0 &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
};


// START ANIMATE LANDING INTRO TEXT AND HERO IMG.
{
  const h1NodeList = document.querySelectorAll('.headings-wrap-landing h1');
  const reservationsLinksNodeList = document.querySelectorAll('.reservations a');
  const hoursDivNodeList = document.querySelectorAll('.hours div');

  const h1ObjArr = Array.from(h1NodeList, h1 => new ElementAnimation(h1));
  const reservationsLinksObjArr = Array.from(reservationsLinksNodeList, a => new ElementAnimation(a));
  const hoursDivObjArr = Array.from(hoursDivNodeList, div => new ElementAnimation(div));

  const h3 = new ElementAnimation(document.querySelector('.headings-wrap-landing h3'));
  const reservationsH4 = new ElementAnimation(document.querySelector('.reservations h4'));
  const hoursH4 = new ElementAnimation(document.querySelector('.hours h4'));
  // const hero = new ElementAnimation(document.querySelector('.hero-section-homepage img'));  TODO: take out
  const servicesHeading = new ElementAnimation(document.querySelector('.services-heading'));
  const elemObjArr = [...h1ObjArr, ...reservationsLinksObjArr, ...hoursDivObjArr, h3, reservationsH4, hoursH4, servicesHeading];
  const contactObjects = [reservationsH4, reservationsLinksObjArr[0], reservationsLinksObjArr[1], hoursH4, hoursDivObjArr[0], hoursDivObjArr[1]];

  const animate = () => {
    if (h3.isInViewport()) {
      // hero.delay(hero.fullOpacity, 100, 1200);    TODO: take out
      h1ObjArr[0].delay(h1ObjArr[0].slideEndPos, 10, 600);
      h1ObjArr[1].delay(h1ObjArr[1].slideEndPos, 250, 600);
      h1ObjArr[2].delay(h1ObjArr[2].slideEndPos, 500, 600);
      h3.delay(h3.slideEndPos, 1000);      

      for (let obj of contactObjects)
        obj.delay(obj.fullOpacity, 1600);

      servicesHeading.delay(servicesHeading.animateIfInView, 1600);
    }

    if (reservationsH4.isInViewport() && !h1ObjArr[0].isInVerticalViewport())
      for (let obj of contactObjects)
        obj.fullOpacity();
  };

  if (h3.isNotUndefined()) {
    for (let elem of elemObjArr)
      elem.zeroOpacity();

    for (let h1 of h1ObjArr)
      h1.slideRightStartPos();
    h3.slideUpStartPos();

    animate();
    window.addEventListener('scroll', animate);
  }
} // End animate landing intro text and hero img.




// START ADD COLOR TRANSITION
{
  const reservationsLinksNl = document.querySelectorAll('.reservations a');
  const h3 = new ElementAnimation(document.querySelector('.headings-wrap-landing h3'));
  const reservationsH4 = new ElementAnimation(document.querySelector('.reservations h4'));
  const h1NodeList = document.querySelectorAll('.headings-wrap-landing h1');
  const h1ObjArr = Array.from(h1NodeList, h1 => new ElementAnimation(h1));

  if (h3.isNotUndefined())
    if (h3.isInViewport() ||  reservationsH4.isInViewport() && !h1ObjArr[0].isInVerticalViewport()) {
      //  color transition override opacity/fade-in. wait, till reservation-links are faded-in.
      window.setTimeout(function () {
        reservationsLinksNl[0].classList.add('js-color-transition');
        reservationsLinksNl[1].classList.add('js-color-transition');
      }, 2500);
    }
} // End add color transition




// START ANIMATE SERVICES SECTION.
{
  const heading = new ElementAnimation(document.getElementsByClassName('services-heading')[0]);
  const eventsCard = new ElementAnimation(document.getElementsByClassName('card-events')[0]);
  const consultingCard = new ElementAnimation(document.getElementsByClassName('card-cocktail-consulting')[0]);
  const mocktailsCard = new ElementAnimation(document.getElementsByClassName('card-mocktails')[0]);
  const h1NodeList = document.querySelectorAll('.headings-wrap-landing h1');
  const h1ObjArr = Array.from(h1NodeList, h1 => new ElementAnimation(h1));
  const elemArr = [heading, eventsCard, consultingCard, mocktailsCard];

  const animateSmViewport = () => {
    if (heading.isInViewport() && !h1ObjArr[0].isInVerticalViewport())
      heading.fullOpacity();

    if (eventsCard.isHalfInViewport())
      eventsCard.delay(eventsCard.slideEndPos, 10);

    if (consultingCard.isInVerticalViewport())
      consultingCard.delay(consultingCard.slideEndPos, 10);

    if (mocktailsCard.isInVerticalViewport())
      mocktailsCard.delay(mocktailsCard.slideEndPos, 10);
  };

  const animateLgViewport = () => {
    heading.animateIfInView();

    if (consultingCard.isHalfInViewport() || mocktailsCard.isHalfInViewport()) {
      consultingCard.delay(consultingCard.slideEndPos, 10, 700);
      eventsCard.delay(eventsCard.slideEndPos, 700);
      mocktailsCard.delay(mocktailsCard.slideEndPos, 1300);
    }
  };

  const viewportController = () => {
    if (window.matchMedia('(min-width: 900px)').matches) {
      animateLgViewport();
      window.addEventListener('scroll', animateLgViewport);
    } else {
      animateSmViewport();
      window.addEventListener('scroll', animateSmViewport);
    }
  };

  if (heading.isNotUndefined()) {
    for (elem of elemArr)
      elem.zeroOpacity();

    eventsCard.slideDownStartPos(50);
    mocktailsCard.slideRightStartPos(10);
    consultingCard.slideRightStartPos(10);

    viewportController();
    window.addEventListener('resize', viewportController);
  }
}
// End animate services section.




// START AUTOGROW TEXTAREA.
{
  // Calculate textAreas height 
  let textArea = document.getElementsByTagName('textarea')[0];

  // if textArea exists
  if (typeof textArea !== 'undefined') {

    let textAreaComputed = window.getComputedStyle(textArea);
     
    let initialHeight = parseInt(textAreaComputed.getPropertyValue('border-top-width'), 10)
                       + parseInt(textAreaComputed.getPropertyValue('padding-top'), 10)
                       + textArea.scrollHeight
                       + parseInt(textAreaComputed.getPropertyValue('padding-bottom'), 10)
                       + parseInt(textAreaComputed.getPropertyValue('border-bottom-width'), 10);


    let autoExpand = (field) => {

      // Reset field height
      field.style.height = 'inherit';

      // Get the computed styles for the element
      let computed = window.getComputedStyle(field);

      // Calculate the height
      let height = parseInt(computed.getPropertyValue('border-top-width'), 10)
                   + parseInt(computed.getPropertyValue('padding-top'), 10)
                   + field.scrollHeight
                   + parseInt(computed.getPropertyValue('padding-bottom'), 10)
                   + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

      // If initialHeight < height
      if (initialHeight < height)
        field.style.height = `${height}px`;
    };

    document.addEventListener('input', function (event) {
      if (event.target.tagName.toLowerCase() !== 'textarea') return;
      autoExpand(event.target);
    }, false);
  }
} // End autogrow textarea.




// START ANIMATE FORMS.
{
  const form = new ElementAnimation(document.getElementsByTagName('form')[0]);
  
  if (form.isNotUndefined()) {
    form.zeroOpacity();
    form.animateIfHalfInView();
    window.addEventListener('scroll', () => form.animateIfHalfInView());
  }
}
// End animate form.




// START ANIMATE FOOTER.
{
  const footerElems = {
    logo: new ElementAnimation(document.getElementsByClassName('logo-footer')[0]),
    contact: new ElementAnimation(document.getElementsByClassName('footer-contact')[0]),
    img: new ElementAnimation(document.querySelector('.footer-bottom-row img')),
    nav: new ElementAnimation(document.getElementsByClassName('nav-footer')[0]),
    liArr: [
      new ElementAnimation(document.querySelectorAll('.nav-footer li')[0]),
      new ElementAnimation(document.querySelectorAll('.nav-footer li')[1]),
      new ElementAnimation(document.querySelectorAll('.nav-footer li')[2]),
      new ElementAnimation(document.querySelectorAll('.nav-footer li')[3])
    ]
  };

  const animateFooter = () => {
    for (let key in footerElems) {
      if (!Array.isArray(footerElems[key])) {
        footerElems[key].zeroOpacity();
        footerElems[key].animateIfInView();
      }
      else {
        let delay = 100;
        for (let li of footerElems[key]) {
          li.zeroOpacity();
          li.delay(li.animateIfInView, delay);
          delay += 200;
        }
      }
    }
  };

  if (footerElems.logo.isNotUndefined()) {
    animateFooter();
    window.addEventListener('scroll', () => animateFooter());
  }
}
// End animate footer.




// START ANIMATION FOR HERO SECTION ON ABOUT & COCKTAILS PAGE
{
  const introElems = {
    img: new ElementAnimation(document.querySelector('.hero-section-aboutAndCocktails .hero-image-wrap')),
    heading: new ElementAnimation(document.querySelector('.hero-section-aboutAndCocktails h2'))
  };

  const animateIntroSection = () => {
    if (introElems.heading.isInViewport()) {
      introElems.img.fullOpacity();
      introElems.heading.delay(introElems.heading.slideEndPos, 300);
    }
  };

  if (introElems.img.isNotUndefined()) {
    introElems.img.zeroOpacity();
    introElems.heading.zeroOpacity();
    introElems.heading.slideDownStartPos(20);

    animateIntroSection();
    window.addEventListener('scroll', () => animateIntroSection());
  }
} // End animation for hero section on about & cocktails page.




// START ANIMATE ABOUT US SECTION.
{
  const aboutUs = new ElementAnimation(document.querySelector('.about-us-section p'));
  
  if (aboutUs.isNotUndefined()) {
    aboutUs.zeroOpacity();
    aboutUs.delay(aboutUs.animateIfInView, 500);
    window.addEventListener('scroll', () => aboutUs.delay(aboutUs.animateIfInView, 500));
  }
}




// START ANIMATE TESTIMONIALS HEADINGS.
{
  const headingsWrap = new ElementAnimation(document.getElementsByClassName('headings-testimonials')[0]);
  const heading = new ElementAnimation(document.querySelector('.headings-testimonials h2'));
  const aboutUs = new ElementAnimation(document.querySelector('.about-us-section p'));

  const animate = () => {
    if (heading.isInViewport() && !aboutUs.isInViewport())
      return headingsWrap.fullOpacity();
    if (heading.isInViewport() && aboutUs.isInViewport())
      return headingsWrap.delay(headingsWrap.fullOpacity, 700);
  };

  if (aboutUs.isNotUndefined()) {
    headingsWrap.zeroOpacity();
    animate();
    window.addEventListener('scroll', animate);
  }
} // End animate testimonials headings.




// START TESTIMONIAL SLIDER.
{
  // if testimonial section exists
  if (typeof document.getElementsByClassName('testimonials-section')[0] !== 'undefined') {

    const belt = document.getElementsByClassName('testimonials-container')[0];

    let testimonialSlider = () => {

      // if browser supports grid && vp > 900
      if (typeof document.createElement('div').style.grid !== 'undefined'
          && window.matchMedia('(min-width: 900px)').matches) {

        const sliderWindow = document.getElementsByClassName('slider-window')[0];
        // const belt = document.getElementsByClassName('testimonials-container')[0];
        const beltItem1 = document.getElementsByClassName('testimonials-grid')[0];
        const beltItem2 = document.getElementsByClassName('testimonials-grid')[1];
        let clickCounter = 0;
        let shiftCounter = 0;
        const beltItemArr = document.getElementsByClassName('testimonials-grid');

        // set css
        const cssSetup = () => {
          if (typeof document.createElement('div').style.grid !== 'undefined'
              && window.matchMedia('(min-width: 900px)').matches) {

            sliderWindow.classList.add('js-slider-window');
            belt.classList.add('js-testimonials-container');
            beltItem1.style.marginBottom = '0';
            beltItem1.style.width = '50%';
            beltItem2.style.marginBottom = '0';
            beltItem2.style.width = '50%';

            beltItem1.style.border = '1px solid transparent';
            beltItem2.style.border = '1px solid transparent';

          // no grid OR vp < 900
          } else {

            sliderWindow.classList.remove('js-slider-window');
            belt.classList.remove('js-testimonials-container');
            beltItem1.style.marginBottom = 'inherit';
            beltItem1.style.width = '100%';
            beltItem2.style.marginBottom = 'inherit';
            beltItem2.style.width = '100%';

          }
        };
        cssSetup();
        window.addEventListener('resize', cssSetup);


        // set slider-window height === testimonials-container height
        const setSliderWindowHeight = () => {
          belt.classList.remove('js-belt-transition');
          window.setTimeout(function () {
              const testimContComputed = window.getComputedStyle(belt);
              let beltHeight = parseInt(testimContComputed.height);

              sliderWindow.style.height = beltHeight + 'px';
          }, 100); 
        };
        setSliderWindowHeight();
        window.addEventListener('resize', setSliderWindowHeight);


        // function that slides belt left or right
        const slideLeftRight = (e) => {

          if (typeof document.createElement('div').style.grid !== 'undefined'
              && window.matchMedia('(min-width: 900px)').matches) {

            const clickTarget = e.target;
            const xCoordInClickTarget = e.clientX - clickTarget.getBoundingClientRect().left;

            const beltWidth = belt.offsetWidth;
            let beltRemainder = beltWidth + shiftCounter;
            const clickTargetWidth = beltWidth / beltItemArr.length;

            belt.classList.add('js-belt-transition');

            // note: 2 self additions: "&& xCoordInClickTarget > 0", if omitted there may be a little glitch on very right edge of element
            //                         "clickTarget.classList.contains('testimonials-grid')", ensures that we click on belt item, so belt won't shift if clicked on belt insted of belt item.
            if (clickTargetWidth / 2 > xCoordInClickTarget && xCoordInClickTarget > 0 && clickTarget.classList.contains('testimonials-grid')) { 
              // clicked left

              // if belt if is not in start position
              // or "only shift belt right, if shiftCounter is negative"
              if (shiftCounter < -10) { // note: -10 is just a safety buffer for borders etc (can be zero, but it may cause glitches)

                // increase counter
                clickCounter += 1;
                shiftCounter = clickCounter * clickTargetWidth;

                // shift belt right
                belt.style.transform = `translateX(${shiftCounter}px)`;
                belt.classList.add('js-belt-moved');
              }

            } else {
              // clicked right

              // note: 2 self additions: "&& xCoordInClickTarget > 0", if omitted there may be a little glitch on very right edge of element
              //                         "clickTarget.classList.contains('testimonials-grid')", ensures that we click on belt item, so belt won't shift if clicked on belt insted of belt item.
              if (xCoordInClickTarget > 0 && clickTarget.classList.contains('testimonials-grid')) {

                // if beltRemainder > width of viewing window + couple extra px for e.g. borders (can be omitted if not borders etc)
                if (beltRemainder > clickTargetWidth + 10) {

                  // decrease counter
                  clickCounter -= 1;
                  shiftCounter = clickCounter * clickTargetWidth;

                  // shift belt left
                  belt.style.transform = `translateX(${shiftCounter}px)`;
                  belt.classList.add('js-belt-moved');
                }
              }
            }
          } // End if.
        }; // End slideLeftRight-function.

        sliderWindow.addEventListener('click', function (e) {
          slideLeftRight(e);
        });


        // needed so belt-position is adjusted properly on resize
        let adjustXpositionOfBelt = () => {

          if (window.matchMedia('(min-width: 900px)').matches) {
            let beltComputed = window.getComputedStyle(belt);
            let beltWidth = parseInt(beltComputed.width);

            let itemWidth = beltWidth / beltItemArr.length;   // NOTE:  depends on how many item on belt; possibly automate

            belt.classList.remove('js-belt-transition');

            shiftCounter = clickCounter * itemWidth;

            belt.style.transform = `translateX(${shiftCounter}px)`;
          } else {
            belt.style.transform = `translateX(0)`;
          }
        };

        window.addEventListener('resize', adjustXpositionOfBelt);

      } // end if
    } // End testimonialSlider-function.

    testimonialSlider();

    window.addEventListener('resize', function () {
      // if belt hasn't been moved yet (e.g. if mobile view on load and then enlarged to desktop)
      if (!belt.classList.contains('js-belt-moved')) {
        testimonialSlider();
      }
    });

  } // End of if testimonials section exists.

} // End testimonial slider.




// START NAV-ARROW LOGIC FOR TESTIMONIALS SECTION
{
  // if testimonial section exists
  if (typeof document.getElementsByClassName('testimonials-section')[0] !== 'undefined') {

    const sliderWindow = document.getElementsByClassName('slider-window')[0];

    let navArrows = () => {

      // if browser supports grid && vp > 900
      if (typeof document.createElement('div').style.grid !== 'undefined'
          && window.matchMedia('(min-width: 900px)').matches) {

        // function displaying left right arrows on hover
        const showNavArrows = (e) => {

          const clickTarget = e.target;
          const clickTargetWidth = clickTarget.offsetWidth;
          const xCoordInClickTarget = e.clientX - clickTarget.getBoundingClientRect().left;
          if (clickTargetWidth / 2 > xCoordInClickTarget && xCoordInClickTarget > 0 && clickTarget.classList.contains('testimonials-grid')) {  // note: self addition: "&& xCoordInClickTarget > 0", if omitted there may be a little glitch on very right edge of element
            // clicked left
            clickTarget.classList.remove('js-arrow-next');
            clickTarget.classList.add('js-arrow-back');

          } else if (xCoordInClickTarget > 0 && clickTarget.classList.contains('testimonials-grid')) {
            // clicked right
            clickTarget.classList.remove('js-arrow-back');
            clickTarget.classList.add('js-arrow-next');

          }  else {
            clickTarget.classList.remove('js-arrow-back');
            clickTarget.classList.remove('js-arrow-next');
          }
        };

        sliderWindow.addEventListener('mousemove', function (e) {
          showNavArrows(e);
        });


      } else if (typeof document.createElement('div').style.grid === 'undefined'
                 || window.matchMedia('(max-width: 900px)').matches) {

          const sliderWindow = document.getElementsByClassName('slider-window')[0];

          // function hiding left right arrows
          const hideNavArrows = (e) => {

            const clickTarget = e.target;
            const clickTargetWidth = clickTarget.offsetWidth;
            const xCoordInClickTarget = e.clientX - clickTarget.getBoundingClientRect().left;
            if (clickTargetWidth / 2 > xCoordInClickTarget && xCoordInClickTarget > 0 && clickTarget.classList.contains('testimonials-grid')) {  // note: self addition: "&& xCoordInClickTarget > 0", if omitted there may be a little glitch on very right edge of element
              // clicked left
              clickTarget.classList.remove('js-arrow-back');
              clickTarget.classList.remove('js-arrow-next');

            } else {
              // clicked right

              if (xCoordInClickTarget > 0 && clickTarget.classList.contains('testimonials-grid')) {  // note: self addition: "&& xCoordInClickTarget > 0", if omitted there may be a little glitch on very right edge of element
                clickTarget.classList.remove('js-arrow-back');
                clickTarget.classList.remove('js-arrow-next');
              }
            }  
          };

          sliderWindow.addEventListener('mousemove', function (e) {
            hideNavArrows(e);
          });

      } // End else-if.

    } // End navArrows-function.

    navArrows();
    window.addEventListener('resize', navArrows);

  } // End if testimonials section exists.
} // End nav-arrow logic for testimonials section.




// START ANIMATE TESTIMONIAL SECTION.
{
  const sliderWindow = new ElementAnimation(document.getElementsByClassName('slider-window')[0]);
  const testimonialsNl = document.getElementsByClassName('testimonial-box');
  const testimonialsArr = Array.from(testimonialsNl, testimonial => new ElementAnimation(testimonial));

  const animateGrid = () => {
    if (sliderWindow.isHalfInViewport()) {
      for (let testimonial of testimonialsArr)
        testimonial.fullOpacity(0);

      sliderWindow.fullOpacity();
    }
  };

  const animateNoGrid = () => {
    for (let testimonial of testimonialsArr)
      if (testimonial.isHalfInViewport()) {
        sliderWindow.fullOpacity(0);
        testimonial.fullOpacity();
      }
  };

  const viewportController = () => {

    // grid ok AND vp > 900
    if (typeof document.createElement('div').style.grid !== 'undefined'
        && window.matchMedia('(min-width: 900px)').matches) {

      animateGrid();
      window.addEventListener('scroll', animateGrid);
      window.addEventListener('resize', animateGrid);

    // no grid OR vp < 900
    } else if (typeof document.createElement('div').style.grid === 'undefined'
               || window.matchMedia('(max-width: 900px)').matches) {

      animateNoGrid();
      window.addEventListener('scroll', animateNoGrid);
      window.addEventListener('resize', animateNoGrid);
    }
  }

  // if testimonial section exists
  if (typeof testimonialsArr[0] !== 'undefined' && testimonialsArr[0] !== null) {
    sliderWindow.zeroOpacity();

    for (let testimonial of testimonialsArr)
      testimonial.zeroOpacity();

    viewportController();
    window.addEventListener('resize', viewportController);
  }
} // End animate testimonial section.




// START ANIMATE ABOUT WENDY SECTION.
{
  const h2 = new ElementAnimation(document.querySelector('.about-wendy-section h2'));
  const p = new ElementAnimation(document.querySelector('.about-wendy-text p'));
  const smImg = new ElementAnimation(document.querySelector('.wendy-img-box .img-wrap'));
  const lgImg = new ElementAnimation(document.querySelector('.wendy-img-box img'));
  const elemArr = [h2, p, smImg, lgImg];
  let smFlag = false; // inidcates if section was animated in on mobile
  let lgFlag = false; // inidcates if section was animated in on desktop
  let lgStartPosSet = false;
  let smStartPosSet = false;

  const animateSmViewport = () => {
    if (window.matchMedia('(max-width: 450px)').matches)
      for (let elem of elemArr)
        if (elem.isInViewport()) {
          elem.fullOpacity();
          smFlag = true;
        }
  };

  const animateLgViewport = () => {
    if (window.matchMedia('(min-width: 450px)').matches) {
      h2.animateIfInView(600);
      p.animateIfInView(600);

      if (smImg.isInViewport()) {
        lgImg.slideEndPos(800);
        smImg.delay(smImg.slideEndPos, 400, 800);
        lgFlag = true;
      }
    }
  };

  const setLgStartPos = () => {
    smImg.slideLeftStartPos(10);
    lgImg.slideDownStartPos(50);
    lgStartPosSet = true;
    smStartPosSet = false;
  };

  const setSmStartPos = () => {
    smImg.slideLeftStartPos(0);
    lgImg.slideDownStartPos(0);
    smStartPosSet = true;
    lgStartPosSet = false;
  };

  const viewportController = () => {
    if (window.matchMedia('(min-width: 450px)').matches && !smFlag) {
      setTimeout(function () {
        if (!lgStartPosSet) setLgStartPos();
        animateLgViewport();
        window.addEventListener('scroll', animateLgViewport);
      }, 300)
    }

    if (window.matchMedia('(max-width: 450px)').matches && !lgFlag) {
      setTimeout(function () {
        if (!smStartPosSet) setSmStartPos();
        animateSmViewport();
        window.addEventListener('scroll', animateSmViewport);
      })
    }
  };

  if (h2.isNotUndefined()) {
    for (let elem of elemArr)
      elem.zeroOpacity();

    viewportController();
    window.addEventListener('resize', viewportController);
  }
} // End animate about wendy section.




// START SHOW JS-ALCOHOL-HEADINGS, HIDE INDIVIDUAL HEADINGS.
{
  if (typeof document.getElementsByClassName('menu-section')[0] !== 'undefined') {
    const headingsGroup = document.getElementsByClassName('js-alcohol-headings')[0],
          individualHeadingsArr = document.getElementsByClassName('alcohol-heading');

    headingsGroup.classList.remove('hide');

    for (let i = 0, j = individualHeadingsArr.length; i < j; i++)
      individualHeadingsArr[i].classList.add('hide');
  }
} // End show js-alcohol-headings, hide individual headings.




// START SET CSS FOR MENU SECTION.
{
  if (typeof document.getElementsByClassName('menu-section')[0] !== 'undefined') {

    const beltArr = document.getElementsByClassName('belt'),
          sliderWindow = document.getElementsByClassName('window')[0],
          drinksGridArr = document.getElementsByClassName('drinks-grid'),
          optionsContainer = document.getElementsByClassName('js-alcohol-headings')[0],
          h4Arr = optionsContainer.getElementsByTagName('h4');

    sliderWindow.style.position = 'relative';
    sliderWindow.style.overflow = 'hidden';
    optionsContainer.style.display = 'flex';

    for (let i = 0, j = h4Arr.length; i < j; i++) {
      h4Arr[i].classList.add('js-h4');
      h4Arr[i].addEventListener('mouseenter', function() {
        h4Arr[i].classList.add('js-h4-hover');
      })
      h4Arr[i].addEventListener('mouseleave', function() {
        h4Arr[i].classList.remove('js-h4-hover');
      })
    }


    let menuCss = () => {

      // grid + vp > 900
      if (typeof document.createElement('div').style.grid !== 'undefined'
          && window.matchMedia('(min-width: 900px)').matches) {


        for (let i = 0, j = beltArr.length; i < j; i++) {

          let gridsOnBeltArr = beltArr[i].getElementsByClassName('drinks-grid');

          // belt styling
          beltArr[i].classList.add('belt-slider');
          beltArr[i].style.width = 100 * gridsOnBeltArr.length + '%';

          if (i !== 3)
            beltArr[i].classList.add('belt-slider-absolute');

          // set grid width
          for (let j = 0, arrLength = gridsOnBeltArr.length; j < arrLength; j++) {
            let width = 100 / arrLength;

            gridsOnBeltArr[j].style.width = width + '%';
            gridsOnBeltArr[j].style.marginBottom = '0';
            gridsOnBeltArr[j].style.border = '1px solid transparent';
          }
        }

      // no grid OR vp < 900
      } else {

        for (let i = 0, j = beltArr.length; i < j; i++) {
          beltArr[i].style.width = '100%';
          beltArr[i].classList.remove('belt-slider');

          // set belts to absolute w/delay to prevent page jump on load
          window.setTimeout(function () {
            beltArr[i].style.position = 'absolute';
          }, 100);
        }

        for (let j = 0, arrLength = drinksGridArr.length; j < arrLength; j++)
          drinksGridArr[j].style.width = '100%';
      }
    } // End menuCss-func.

    menuCss();

    window.addEventListener('resize', menuCss);

  } // End if menu-section exists.
} // End set css for menu section.




// START BELT CONSTRUCTOR
let Belt = function (belt) {

  this.belt = belt;
  this.clickCounter = 0;
  this.shiftCounter = 0;
  this.itemArr = this.belt.getElementsByClassName('drinks-grid');

  this.beltSlider = function (e) {

    if (this.itemArr.length > 1
        && typeof document.createElement('div').style.grid !== 'undefined'
        && window.matchMedia('(min-width: 900px)').matches) {

      this.clickTarget = e.currentTarget;
      this.xCoordInClickTarget = e.clientX - this.clickTarget.getBoundingClientRect().left;
      this.beltWidth = this.belt.offsetWidth;
      this.beltRemainder = this.beltWidth + this.shiftCounter;
      this.clickTargetWidth = this.beltWidth / this.itemArr.length;

      this.belt.classList.add('js-belt-transition');


      if (this.clickTargetWidth / 2 > this.xCoordInClickTarget && this.xCoordInClickTarget > 0) {
        // clicked left

        if (this.shiftCounter < -10) {

          this.clickCounter += 1;
          this.shiftCounter = this.clickCounter * this.clickTargetWidth;

          // shift belt right
          this.belt.style.transform = `translateX(${this.shiftCounter}px)`;
        }
      } else {
        // clicked right

        if (this.xCoordInClickTarget > 0) {

          if (this.beltRemainder > this.clickTargetWidth + 10) {

            this.clickCounter -= 1;
            this.shiftCounter = this.clickCounter * this.clickTargetWidth;

            // shift belt left
            this.belt.style.transform = `translateX(${this.shiftCounter}px)`;
          }
        }
      } // end clicked left/right
    } // end if
  } // end beltSlider-func

  this.adjustXpositionOfBeltOnResize = function () {

    if (window.matchMedia('(min-width: 900px)').matches) {
      this.beltComputed = window.getComputedStyle(this.belt);
      this.beltWidth = parseInt(this.beltComputed.width);
      this.itemWidth = this.beltWidth / this.itemArr.length;   // depends on how many item on belt
      this.belt.classList.remove('js-belt-transition');
      this.shiftCounter = this.clickCounter * this.itemWidth;
      this.belt.style.transform = `translateX(${this.shiftCounter}px)`;

    } else
      belt.style.transform = `translateX(0)`;

  } // end adjustXpositionOfBeltOnResize-func
}; // End belt-constructor.




// START ALCOHOL OPTIONS MARKER & ADD/REMOVE ACTIVE BELT FLAG & SET WINDOW HEIGHT === ACTIVE BELT HEIGHT.
// note: the XXX indicates the belt-logic (showing/hiding belt && adding/removing click-handler to belt)
if (typeof document.getElementsByClassName('js-alcohol-headings')[0] !== 'undefined') {
  
  const optionsContainer = document.getElementsByClassName('js-alcohol-headings')[0],
        optionsArr = optionsContainer.getElementsByTagName('h4'), // # of options
        beltArr = document.getElementsByClassName('belt'), // # of belts (same amount as # of options)
        sliderWindow = document.getElementsByClassName('window')[0],
        belt1 = beltArr[0],
        belt2 = beltArr[1],
        belt3 = beltArr[2],
        belt4 = beltArr[3],

        myBelt1 = new Belt(belt1),
        myBelt2 = new Belt(belt2),
        myBelt3 = new Belt(belt3),
        myBelt4 = new Belt(belt4),

        callBelt1 = function (e) {
          myBelt1.beltSlider(e);
        },
        callBelt2 = function (e) {
          myBelt2.beltSlider(e);
        },
        callBelt3 = function (e) {
          myBelt3.beltSlider(e);
        },
        callBelt4 = function (e) {
          myBelt4.beltSlider(e);
        },
        callBeltArr = [callBelt1, callBelt2, callBelt3, callBelt4];


  // does 3 things: 1) mark alcohol option, 2) switch belt, 3) set window height to belt height
  const optionsSetup = (e) => { // note: beltSwitcher parts marked with XXX

    let target = e.target;

    // if target doesn't have selected-class AND target is an actual option
    if (!target.classList.contains('js-selected') && optionsContainer.contains(target) && target.tagName === 'H4') { // TODO: verify that 2nd condition works

      // loop over all options
      for (let i = 0; i < optionsArr.length; i++) {

        // if option has selected-class
        if (optionsArr[i].classList.contains('js-selected')) {

          // remove selected-class
          optionsArr[i].classList.remove('js-selected');

          // XXX add js-hide-v2
          beltArr[i].classList.add('js-hide-v2');
          sliderWindow.removeEventListener('click', callBeltArr[i]);
        }

        // XXX if clicked item same as current optionsArr-item in loop, then give corresponding beltArr-item 'js-belt-show'-class
        if (target === optionsArr[i]) {

          // remove js-hide-v2 from belt
          beltArr[i].classList.remove('js-hide-v2');
          sliderWindow.addEventListener('click', callBeltArr[i]);

          // set window-height === current-belt-height
          setWindowHeight(beltArr[i]);
          window.addEventListener('resize', function () {
            setWindowHeight(beltArr[i]);
          });
        }

        // add selected class to target
        target.classList.add('js-selected');
      }
    }
  }; // End optionsSetup-function.


  const setWindowHeight = (belt) => {
    belt.classList.remove('js-belt-transition'); // TODO: check if needed
    window.setTimeout(function () {
        const testimContComputed = window.getComputedStyle(belt);
        let beltHeight = parseInt(testimContComputed.height);

        sliderWindow.style.height = beltHeight + 'px';
    }, 10); 
  } // End setWindowHeight-function.


  if (typeof optionsContainer !== 'undefined') {

    optionsArr[0].classList.add('js-selected'); // 1st option selected on load
    // on load: hide all belts except 1st belt
    for (let i = 1, j = beltArr.length; i < j; i++)
      beltArr[i].classList.add('js-hide-v2');

    sliderWindow.addEventListener('click', callBeltArr[0]); // XXX 1st belt gets click-handler on load

    optionsContainer.addEventListener('click', function (e) {
      optionsSetup(e);
    });

    // on load: set window-height to 1st belt height. also w/timeout for vp > 900. to prevent slightly off window height when reloading. used to occur around vp 948px.
    setWindowHeight(beltArr[0]);

    if (window.matchMedia('(min-width: 900px)').matches) {
      window.setTimeout(function () {
        setWindowHeight(beltArr[0]);
      }, 100);
    }

    window.addEventListener('resize', function () {
      setWindowHeight(beltArr[0]);
    });

    window.addEventListener('resize', function () {
      myBelt1.adjustXpositionOfBeltOnResize();
      myBelt2.adjustXpositionOfBeltOnResize();
      myBelt3.adjustXpositionOfBeltOnResize();
      myBelt4.adjustXpositionOfBeltOnResize();
    });
  }
} // End alcohol options marker & add/remove active belt flag & set window height === active belt height.




// START NAV-ARROW LOGIC FOR MENU SECTION
{
  // if testimonial section exists
  if (typeof document.getElementsByClassName('menu-section')[0] !== 'undefined') {

    const sliderWindow = document.getElementsByClassName('window')[0];
    const beltArr = document.getElementsByClassName('belt');
    const optionsContainer = document.getElementsByClassName('js-alcohol-headings')[0];

    // helper function.
    let activeBeltHasMoreThan2Items = () => {

      for (let i = 0, j = beltArr.length; i < j; i++) {
        if (!beltArr[i].classList.contains('js-hide-v2')) {
          // active belt
          
          let gridArr = beltArr[i].getElementsByClassName('drinks-grid');

          return gridArr.length >= 2;
        }
      }
    };

    let navArrows = () => {

      // if browser supports grid && vp > 900 && active belt has more than 2 items on it
      if (typeof document.createElement('div').style.grid !== 'undefined'
          && window.matchMedia('(min-width: 900px)').matches
          && activeBeltHasMoreThan2Items() === true) {

        // function displaying left right arrows on hover
        const showNavArrows = (e) => {

          const clickTarget = e.currentTarget;
          const clickTargetWidth = clickTarget.offsetWidth;
          const xCoordInClickTarget = e.clientX - clickTarget.getBoundingClientRect().left;
          if (clickTargetWidth / 2 > xCoordInClickTarget && xCoordInClickTarget > 0) {  // note: self addition: "&& xCoordInClickTarget > 0", if omitted there may be a little glitch on very right edge of element
            // clicked left

            clickTarget.classList.remove('js-arrow-next');
            clickTarget.classList.add('js-arrow-back');

          } else if (xCoordInClickTarget > 0) {
            // clicked right

            clickTarget.classList.remove('js-arrow-back');
            clickTarget.classList.add('js-arrow-next');
          }  else {
            // clickTarget.style.cursor = 'auto';
            clickTarget.classList.remove('js-arrow-back');
            clickTarget.classList.remove('js-arrow-next');
          }
        };

        sliderWindow.addEventListener('mousemove', function (e) {
          showNavArrows(e);
        });


      } else if (typeof document.createElement('div').style.grid === 'undefined'
                 || window.matchMedia('(max-width: 900px)').matches
                 || activeBeltHasMoreThan2Items() === false) {

          const sliderWindow = document.getElementsByClassName('window')[0];

          // function hiding left right arrows
          const hideNavArrows = (e) => {

            const clickTarget = e.currentTarget;
            const clickTargetWidth = clickTarget.offsetWidth;
            const xCoordInClickTarget = e.clientX - clickTarget.getBoundingClientRect().left;
            if (clickTargetWidth / 2 > xCoordInClickTarget && xCoordInClickTarget > 0) {  // note: self addition: "&& xCoordInClickTarget > 0", if omitted there may be a little glitch on very right edge of element
              // clicked left
              clickTarget.classList.remove('js-arrow-back');
              clickTarget.classList.remove('js-arrow-next');

            } else {
              // clicked right

              if (xCoordInClickTarget > 0) {  // note: self addition: "&& xCoordInClickTarget > 0", if omitted there may be a little glitch on very right edge of element
                clickTarget.classList.remove('js-arrow-back');
                clickTarget.classList.remove('js-arrow-next');
              }
            }  
          };

          sliderWindow.addEventListener('mousemove', function (e) {
            hideNavArrows(e);
          });

      } // End else-if.

    } // End navArrows-function.

    navArrows();
    window.addEventListener('resize', navArrows);
    optionsContainer.addEventListener('click', navArrows);

  } // End if menu section exists.
} // End nav-arrow logic for menu section.




// START ANIMATE MENU SECTION.
{
  const para = new ElementAnimation(document.querySelector('.menu-section p'));
  const headings = new ElementAnimation(document.getElementsByClassName('js-alcohol-headings')[0]);
  const drinksWindow = new ElementAnimation(document.getElementsByClassName('window')[0]);
  const menuBg = new ElementAnimation(document.getElementsByClassName('menu-background')[0]);
  const drinkBoxArr = document.getElementsByClassName('drink-box');
  const animate = () => {
    if (para.isInViewport()) {
      para.delay(para.fullOpacity, 500);
      headings.delay(headings.fullOpacity, 500);
      drinksWindow.delay(drinksWindow.fullOpacity, 500);
      menuBg.delay(menuBg.fullOpacity, 400);
    } else {
      for (let i = 0, j = drinkBoxArr.length; i < j; i++) {
        if (isInViewport(drinkBoxArr[i])) {
          headings.fullOpacity();
          drinksWindow.fullOpacity();
          menuBg.fullOpacity();
        }
      }
    }
  };

  if (para.isNotUndefined()) {
    para.zeroOpacity();
    headings.zeroOpacity();
    drinksWindow.zeroOpacity();
    menuBg.zeroOpacity();
    animate();
    window.addEventListener('scroll', animate);
  }
}
// End animate menu section.




// START ANIMATE FAQ PAGE.
{
  const introSection = new ElementAnimation(document.querySelector('.intro-section-faq'));
  const h2 = new ElementAnimation(document.querySelector('.intro-section-faq h2'));
  const heroSection = new ElementAnimation(document.getElementsByClassName('hero-section-faq')[0]);
  const qaContainer = new ElementAnimation(document.getElementsByClassName('qa-container')[0]);
  const qaArr = document.getElementsByClassName('qa');

  const animate = () => {
    if (h2.isInViewport()) 
      introSection.fullOpacity();

    if (heroSection.isInViewport() || h2.isInViewport())
      heroSection.fullOpacity();

    for (let i = 0, j = qaArr.length; i < j; i++) {
      if (isInViewport(qaArr[i]))
        qaContainer.fullOpacity();
    }
  };

  if (introSection.isNotUndefined()) {
    introSection.zeroOpacity();
    heroSection.zeroOpacity();
    qaContainer.zeroOpacity();

    animate();
    window.addEventListener('scroll', animate);
  }
} // End animate faq page.




// START ANIMATE CONTACE PAGE.
{
  const h2 = new ElementAnimation(document.querySelector('.contact-info-wrap h2'));
  const emailSection = new ElementAnimation(document.getElementsByClassName('email-section')[0]);
  const phoneSection = new ElementAnimation(document.getElementsByClassName('phone-section')[0]);
  const contactSection = new ElementAnimation(document.querySelector('.contact-section'));
  const elems = [h2, emailSection, phoneSection];

  const animate = () => {
    for (let elem of elems)
      elem.animateIfInView();
  };

  if (contactSection.isNotUndefined()) {
    for (let elem of elems)
      elem.zeroOpacity();

    animate();
    window.addEventListener('scroll', animate);
  }
} // End animate contact page.




// UN-HIDE COCKTAIL-FINDER-SECTION ON LOAD
{
  let cocktailFinderSection = document.getElementsByClassName('cocktail-finder-section')[0];

  if (typeof cocktailFinderSection !== 'undefined')
    cocktailFinderSection.classList.remove('hide');
}



// START COCKTAIL-FINDER LOGIC.
// ***************************

{
  // Constructor setting and getting ajax return object.
  function InputOutput() {
      var inputs; //This will contain key-value pairs.

      this.setResponseObject = function (obj) {
          inputs = obj;
      };

      this.getResponseObject = function () {
          return inputs;
      }
  }


  // Prevent default.
  // Hides drinks-details-container.
  // Establishes connection to server. 
  // Converts JSON response into an object.
  // Passes response-object and ingredient to processDrinks-function for processing.
  // Sets ajax-return-object in inputOutput, so it can be accessed by other functions.
  let getDrinks = (e) => {

    e.preventDefault();

    // hide drinks details-container
    document.getElementsByClassName('beverage-details-container')[0].classList.remove('js-end-show');


    let ingredient = document.getElementsByClassName('ingredient-input')[0].value,
        inputErrorDiv = document.getElementsByClassName('error-message-input')[0],
        serverErrorDiv = document.getElementsByClassName('error-message-server')[0],
        drinksDiv = document.getElementsByClassName('drinks-slide')[0];


    let xhr = new XMLHttpRequest();


    xhr.open('GET', 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + ingredient, true);


    xhr.onload = function () {

      // hide error-messages
      inputErrorDiv.classList.add('hide');
      serverErrorDiv.classList.add('hide');

      if (this.readyState == 4 && this.status == 200) {

        // if user typed in correct search term
        if (this.responseText !== '') {

          // get JSON response and turn into an object
          let drinksObj = JSON.parse(this.responseText);

          // set response object, so other functions can access it
          inputOutput.setResponseObject(drinksObj);

          // call processDrinks-function with object as para
          processDrinks(drinksObj, ingredient);

        } else {

          // show error-message
          inputErrorDiv.classList.remove('hide');
        }
      }
    }; // end onload


    // if server couldn't be reached
    xhr.onerror = function () {

      // show error-message
      serverErrorDiv.classList.remove('hide');
    };

    xhr.send();

  }; // end getDrinks-function


  // if cocktailfinder form exists
  if (typeof document.getElementsByClassName('cocktail-finder-section')[0] !== 'undefined') {

    // call getDrinks-function on submit
    document.getElementsByClassName('cocktail-finder-section')[0].addEventListener('submit', function (e) {
      getDrinks(e);
    });
  }


  // new-up inputOutput object
  let inputOutput = new InputOutput();


  // Animates drinks-list-container into view.
  // Removes activated-flag from beverage-details-container.
  // Calls printHeading- and counter-function.
  let processDrinks = (drinksObj, ingredient) => {

    let beverageListContainer = document.getElementsByClassName('beverage-list-container')[0];

    // animate drinks-list-container into view
    if (!beverageListContainer.classList.contains('js-zero-opacity')) {
      beverageListContainer.classList.add('js-zero-opacity');
      beverageListContainer.classList.remove('hide-beverage-container');
      window.setTimeout(function () {
        beverageListContainer.classList.add('js-end-show');
      }, 10);
    }

    // remove activated class from margin-container for beverage section
    // part of logic, that helps fade drinks details when a new drink is selected
    document.querySelector('.beverage-details-container .card-margin-container').classList.remove('activated');

    printHeading(ingredient);
    counter(5, 1);
  }; // end processDrinks-function



  // Converts users search input into first capital word, then prints it.
  let printHeading = (ingredient) => {

    let drinksListHeading = document.querySelector('.heading-container h3'),
        smallCapIngredient = ingredient.toLowerCase(),
        firstCapIngredient = smallCapIngredient.charAt(0).toUpperCase() + smallCapIngredient.slice(1);

    drinksListHeading.textContent =  `${firstCapIngredient} Beverages`;
  };



  let [i, j] = [-5, -1],
      prev = document.getElementsByClassName('btn_back')[0],
      next = document.getElementsByClassName('btn_forward')[0];

  // Increments (next arrow) or decrements (previous arrow) or doesn't change counter, or resets counter if a new search was issued.
  // Shows/hides next & previous arrows.
  // Calls printList-function.
  let counter = (upDown, reset = 0) => {

    let drinksObj = inputOutput.getResponseObject(),
        drinksArr = drinksObj['drinks'];

    if (reset === 1)
      [i, j] = [-5, -1]

    i += upDown;
    j += upDown;

    // if i <= 0, hide previous button, else show it.
    (i <= 0) ? prev.classList.add('js-hide-v2') : prev.classList.remove('js-hide-v2');

    // if j >= number of drinks, hide next button, else show it.
    (j >= drinksArr.length - 1) ? next.classList.add('js-hide-v2') : next.classList.remove('js-hide-v2');

    printList(i, j);
  };


  if (typeof next !== 'undefined' && next !== null) {
    next.addEventListener('click', function () {
      counter(5);
    });

    prev.addEventListener('click', function () {
      counter(-5);
    });
  }


  // Removes previous ul.
  // Loops over 5 items. If item exist, print it.
  let printList = (i, j) => {

    let drinksObj = inputOutput.getResponseObject(),
        drinksArr = drinksObj['drinks'],
        drinksDiv = document.getElementsByClassName('drinks-slide')[0];

    // if ul exists, remove it
    if (drinksDiv.contains(drinksDiv.getElementsByTagName('ul')[0]))
      drinksDiv.removeChild(drinksDiv.getElementsByTagName('ul')[0]);

    // create ul
    let ul = document.createElement('ul');

    // runs from 0 to 4
    let liCounter = 0;  // TODO: liCounter needed?

    for (i; i <= j; i++ ) {

      if (typeof drinksArr[i] !== 'undefined') {

        // create li elem
        let li = document.createElement('li');

        // add text content to li
        li.textContent = drinksArr[i]['strDrink'];

        // append li to ul
        ul.appendChild(li);
      }

      liCounter += 1;

    } // end for-loop

    // append ul to drinks-list-div
    drinksDiv.appendChild(ul);

  }; // end printList-function






  // Gets matching drink name, then calls next function.
  let getDrinkName = (e) => {
    let clickedElem = e.target;

    if (clickedElem.tagName === 'LI' ) {

      // get clicked li-elems text-content
      let strDrink = clickedElem.textContent;

      let marginContainerBeverageDetails = document.querySelector('.beverage-details-container .card-margin-container');


      // if a new ingredient search is triggered 
      if (!marginContainerBeverageDetails.classList.contains('activated')) {

        // make ajax call right away
        getDrinkDetails(strDrink);
        marginContainerBeverageDetails.classList.add('activated');

      // make ajax call after current drinks-details are faded-out
      } else {

        // fade out drinks-details
        marginContainerBeverageDetails.classList.add('quick-fader-hide');
        marginContainerBeverageDetails.classList.remove('quick-fader-show');

        // then call getDrinkDetails-func w/ delay (delay equal css transition time .1s)
        window.setTimeout(function () {
          getDrinkDetails(strDrink);
        }, 100);
      }
    }
  };


  if (typeof document.getElementsByClassName('beverage-list-container')[0] !== 'undefined') {
    document.getElementsByClassName('beverage-list-container')[0].addEventListener('click', function (e) {
      getDrinkName(e);
    });
  }



  // Makes ajax call, returns object with details about one drink.
  // Calls displayDrinkDetails with return-object as parameter.
  let getDrinkDetails = (drinkName) => {

    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + drinkName, true);

    xhr.onload = function () {

      if (this.readyState == 4 && this.status == 200) {

        // get JSON response and turn into an object
        let drinkObj = JSON.parse(this.responseText);

        // call displayDrinkDetails-function with object as para
        displayDrinkDetails(drinkObj);
      }
    }; // end onload

    xhr.send();
  };




  // Displays drink name, image, ingredients, amounts, instructions.
  let displayDrinkDetails = (obj) => {

    let drinksDetailsDiv = document.getElementsByClassName('beverage-details-container')[0],
        h3 = drinksDetailsDiv.getElementsByTagName('h3')[0],
        // imgElem = drinksDetailsDiv.getElementsByTagName('img')[0],
        p = drinksDetailsDiv.getElementsByTagName('p')[0],
        ul = document.createElement('ul'),
        ingredientsListWrap = document.getElementsByClassName('ingredients-list-wrap')[0],
        marginContainer = document.getElementsByClassName('js-margin-container-beverages')[0],
        beverageImageWrap = document.getElementsByClassName('beverage-image-wrap')[0];



    // animate margin-container width & beverage-details-container
    if (!marginContainer.classList.contains('js-max-width')) {
      marginContainer.classList.add('js-max-width');
      drinksDetailsDiv.classList.add('js-zero-opacity');
      drinksDetailsDiv.classList.remove('hide-beverage-container');

      // if vp > 900 add a delay to fade-in
      if (window.matchMedia('(min-width: 900px)').matches) {
        window.setTimeout(function () {
          drinksDetailsDiv.classList.add('js-end-show');
        }, 400);
      } else {
        window.setTimeout(function () {
          drinksDetailsDiv.classList.add('js-end-show');
        }, 10);
      }

    } else
      drinksDetailsDiv.classList.add('js-end-show');



    // extract drink object
    let drinkObject = obj['drinks'][0];

    // get drink name
    let name = drinkObject['strDrink'];

    // get drink image
    let imgSrc = drinkObject['strDrinkThumb'];

    // get ingredients and amounts.
    // two dimensional array. holds ingredients and amount for each drink.
    let ingredientsArr = [];

    let maxIngredients = 16;

    for (let i = 1; i < maxIngredients; i++) {

      // if ingredient not null AND not empty string
      if (drinkObject['strIngredient' + i] !== null && drinkObject['strIngredient' + i] !== '') {

        // array to hold ingredient & amount for one drink.
        let ingredientAndAmountArr = [];

        // add ingredient and amount to array.
        ingredientAndAmountArr.push(drinkObject['strIngredient' + i]);
        ingredientAndAmountArr.push(drinkObject['strMeasure' + i]);
        
        // add array for one drink to array holding all drinks
        ingredientsArr.push(ingredientAndAmountArr);

      } else
        break;
    }
  // console.log(ingredientsArr[0][0]);   -- ingredient
  // console.log(ingredientsArr[0][1]);   -- amount

    // get directions
    let directions = drinkObject['strInstructions'];



    // if ul exists, remove it
    if (ingredientsListWrap.contains(ingredientsListWrap.getElementsByTagName('ul')[0]))
      ingredientsListWrap.removeChild(ingredientsListWrap.getElementsByTagName('ul')[0]);


    // display name, image, ingredients, amounts, directions

    // if img exists, update it's source
    if (beverageImageWrap.contains(beverageImageWrap.getElementsByTagName('img')[0])) {
      beverageImageWrap.getElementsByTagName('img')[0].src = imgSrc;

    // if no img exists yet, new-up one, attach source and attach to dom
    } else {
      let imgElem = new Image();
      imgElem.src = imgSrc;
      beverageImageWrap.appendChild(imgElem);
    }


    h3.textContent = name;


    ingredientsArr.forEach((ingredient) => {
      let li = document.createElement('li');
      li.textContent = `${ingredient[0]}`; // 0 represents ingredient; 1 represents amount

      // add amounts if they're not null or empty string
      if (ingredient[1] !== null && ingredient[1] !== '')
        li.textContent += ` --- ${ingredient[1]}`;

      ul.appendChild(li);

      ingredientsListWrap.appendChild(ul);
    });

    p.textContent = directions;

    // fade-in wrapper div w/ delay
    window.setTimeout(function () {
      document.querySelector('.beverage-details-container .card-margin-container').classList.add('quick-fader-show');
      document.querySelector('.beverage-details-container .card-margin-container').classList.remove('quick-fader-hide');
    }, 600);


  }; // End displayDrinkDetails-function.
}

// End cocktail-finder logic.
// ***************************




// START ANIMATE COCKTAIL-FINDER HEADING, PARAGRAPH AND BACKGROUND.
{
  const cocktailFinderSection = new ElementAnimation(document.querySelector('.cocktail-finder-section'));
  const h2 = new ElementAnimation(document.querySelector('.cocktail-finder-search-container h2'));
  const p = new ElementAnimation(document.querySelector('.cocktail-finder-search-container p'));
  const bg = new ElementAnimation(document.querySelector('.cocktail-finder-search-background'));

  const animate = () => {
    h2.animateIfInView();
    p.animateIfInView();
    bg.animateIfHalfInView();
  };

  if (cocktailFinderSection.isNotUndefined()) {
    h2.zeroOpacity();
    p.zeroOpacity();
    bg.zeroOpacity();
    animate();
    window.addEventListener('scroll', animate);
  }
} // End animate cocktail-finder heading, paragraph and background.
