// START HIDE NAV ITEMS OF REGULAR NAV.
// SHOW BURGER-NAV.
{
  const mainNav = document.getElementsByClassName('nav-main')[0];
  const liArr = mainNav.getElementsByTagName('li');
  const burger = document.getElementsByClassName('nav-burger')[0];

  let hideNavItems = () => {
    for (let i = 0; i < liArr.length; i++) {
      // If li not the logo.
      if (!liArr[i].classList.contains('logo')) {
        // If viewport > 900px and li-elem has hide-class.
        if (window.matchMedia('(min-width: 900px)').matches) {
          // Remove hide-class.
          liArr[i].classList.remove('hide');
        } else {
          // Add hide class.
          liArr[i].classList.add('hide');
        }
      }
    }
  };
  hideNavItems();

  window.addEventListener('resize', hideNavItems);

  // Show burger-nav.
  burger.classList.remove('hide');

} // End hide nav items of regular nav. Show burger-nav.



// SET HEADER HEIGHT.
{
  const header = document.getElementsByTagName('header')[0];

  let setHeaderHeight = () => {
    if (window.matchMedia('(min-width: 450px)').matches) {
      header.style.height = '100px';
    } else {
      header.style.height = '70px';  
    } 
  };
  setHeaderHeight();

  window.addEventListener('resize', setHeaderHeight);
} // End set header height.



// START HEADER AND OVERLAY MENU.
{
  const header = document.getElementsByTagName('header')[0];
  const headerBuffer = document.getElementsByClassName('headerBuffer')[0];
  let headerHeight = header.offsetHeight;

  window.addEventListener('resize', () => headerHeight = header.offsetHeight);

  window.addEventListener('resize', () => {
    if (header.style.position === 'fixed') {
      headerBuffer.style.height = headerHeight + 'px';
    }
  });
  


  // WHEN SCROLLED PAST CERTAIN POINT TURN STATIC HEADER INTO FIXED HEADER
  let headerPositioning_1 = () => {
    if (window.pageYOffset > 500) {
      header.style.position = 'fixed';
      headerBuffer.style.height = headerHeight + 'px';
    }
    // } else if (window.pageYOffset === 0) {
    //   header.style.position = 'static';
    //   headerBuffer.style.height = 0;
    //   header.classList.remove('js-header-transition');
    // }
  };
  window.addEventListener('scroll', headerPositioning_1);
  window.addEventListener('resize', headerPositioning_1);


  // ON LOAD, SET HEADER TO FIXED/STATIC DEPENDING ON SCROLL POSITION
  let headerPositioning_2 = () => {

    if (window.pageYOffset > 500) {
      header.style.position = 'fixed';
      headerBuffer.style.height = headerHeight + 'px';
      header.classList.add('js-header-transition');
    } else {
      header.style.position = 'static';
      headerBuffer.style.height = 0;
    }
  };
  window.addEventListener('load', headerPositioning_2);



  // SHOW/HIDE FIXED HEADER DEPENDING ON SCROLL DIRECTION
  let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

  let showHideHeader = () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (header.style.position === 'static' && scrollTop > headerHeight) {
      header.style.transform = 'translateY(-' + headerHeight + 'px)';
    } else if ((header.style.position === 'static' && scrollTop < headerHeight)) {
      header.style.transform = 'translateY(0)';
    }

    if (scrollTop > lastScrollTop && header.style.position == 'fixed' && scrollTop > headerHeight) {
      header.style.transform = 'translateY(-' + headerHeight + 'px)';
      header.classList.add('js-header-transition');
    } else if (scrollTop < lastScrollTop && header.style.position !== 'static') {
      header.style.transform = 'translateY(0)';
      header.classList.add('js-header-transition');
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }
  window.addEventListener('scroll', showHideHeader);



  // OVERLAY-MENU
  const burger = document.getElementsByClassName('nav-burger')[0];
  const overlay = document.getElementsByClassName('nav-mobile')[0];
  const body = document.body;

  let menuOverlay = () => {
    // if menu-overlay closed
    if (!overlay.classList.contains('js-nav-mobile-show')) {
      overlay.classList.add('js-nav-mobile-show');
      header.style.position = 'fixed';
      headerBuffer.style.height = headerHeight + 'px';
      header.style.transform = 'translateY(0)';
      window.removeEventListener('scroll', headerPositioning_1);
      window.removeEventListener('scroll', showHideHeader);
      burger.classList.add('js-nav-burger-expand');
    // if menu-overlay opened
    } else {
      overlay.classList.remove('js-nav-mobile-show');
      window.addEventListener('scroll', headerPositioning_1);
      window.addEventListener('scroll', showHideHeader);
      burger.classList.remove('js-nav-burger-expand');
    }

    // IF ON COCKTAILS PAGE TURN NAV-BURGER DARK BLUE
    if (body.classList.contains('cocktails') && !burger.classList.contains('js-navBurger-darkBlue')) {
      burger.classList.add('js-navBurger-darkBlue');
    } else {
      burger.classList.remove('js-navBurger-darkBlue');
    }
  };
  burger.addEventListener('click', menuOverlay);


  // CLOSE OVERLAY IF VIEWPORT > 900
  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 900px)').matches && overlay.classList.contains('js-nav-mobile-show')) {
      overlay.classList.remove('js-nav-mobile-show');
    }
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


// START ANIMATE LANDING INTRO TEXT.
{
  let animateLandingHeadings = () => {

    let h1Arr = document.querySelectorAll('.headings-wrap-landing h1'),
        h3 = document.querySelector('.headings-wrap-landing h3'),
        reservationsH4 = document.querySelector('.reservations h4'),
        reservationsLinksArr = document.querySelectorAll('.reservations a');
        hoursH4 = document.querySelector('.hours h4'),
        hoursDivsArr = document.querySelectorAll('.hours div');


    // hide elems (opacity only)
    for (let i = 0; i < h1Arr.length; i++) {
      h1Arr[i].classList.add('js-start-hide');
      // check if reservation links exists
      if (typeof reservationsLinksArr[i] !== 'undefined') {
        reservationsLinksArr[i].classList.add('js-start-hide');
        hoursDivsArr[i].classList.add('js-start-hide');
      }
    }
    h3.classList.add('js-start-hide');
    reservationsH4.classList.add('js-start-hide');
    hoursH4.classList.add('js-start-hide');


    // if first h1 in viewport
    if (isInViewport(h1Arr[0])) {

      // set start positions for animation
      for (let i = 0; i < h1Arr.length; i++) {
        h1Arr[i].classList.add('js-landing-h1-startPosition');
        // check if reservation links exists
        if (typeof reservationsLinksArr[i] !== 'undefined') {
          reservationsLinksArr[i].classList.add('js-start-hide');
          hoursDivsArr[i].classList.add('js-start-hide');
        }
      }
      h3.classList.add('js-landing-h3-startPosition');
      reservationsH4.classList.add('js-start-hide');
      hoursH4.classList.add('js-start-hide');


      // animate headings into view
      window.setTimeout(function () {
        h1Arr[0].classList.add('js-endPosition');
      }, 10)

      window.setTimeout(function () {
        h1Arr[1].classList.add('js-endPosition');
      }, 250)

      window.setTimeout(function () {
        h1Arr[2].classList.add('js-endPosition');
      }, 500)

      window.setTimeout(function () {
        h3.classList.add('js-landing-h3-endPosition');
      }, 1000)

      window.setTimeout(function () {
        reservationsH4.classList.add('js-end-show');
        reservationsLinksArr[0].classList.add('js-end-show');
        reservationsLinksArr[1].classList.add('js-end-show');
        hoursH4.classList.add('js-end-show');
        hoursDivsArr[0].classList.add('js-end-show');
        hoursDivsArr[1].classList.add('js-end-show');
      }, 1600)
    }
  };

  // if on landing fire event-listeners
  if (typeof document.getElementsByClassName('headings-wrap-landing')[0] !== 'undefined') {
    window.addEventListener('scroll', animateLandingHeadings);
    window.addEventListener('load', animateLandingHeadings);
  }

} // End animate landing intro text.




// START ANIMATE SERVICES SECTION.
{
  let heading = document.getElementsByClassName('services-heading')[0],
      eventsCard = document.getElementsByClassName('card-events')[0],
      consultingCard = document.getElementsByClassName('card-cocktail-consulting')[0],
      mocktailsCard = document.getElementsByClassName('card-mocktails')[0];


  // if services section exists
  if (typeof document.getElementsByClassName('services-heading')[0] !== 'undefined') {

    // hide elems
    heading.classList.add('js-start-hide');
    eventsCard.classList.add('js-start-hide');
    consultingCard.classList.add('js-start-hide');
    mocktailsCard.classList.add('js-start-hide');


    let animateServices = () => {

      if (isInViewport(heading)) {
        // animate into view
        heading.classList.add('js-end-show');
      }

      if (isHalfInViewport(eventsCard)) {
        // set start position
        eventsCard.classList.add('js-startPositionTop');
        // animate into view
        window.setTimeout(function () {
          eventsCard.classList.add('js-endPosition');
        }, 10)
      }

      if (isInViewport(consultingCard)) {
        // set start position
        consultingCard.classList.add('js-startPositionLeft');
        // animate into view
        window.setTimeout(function () {
          consultingCard.classList.add('js-endPosition');
        }, 10)
      }

      if (isInViewport(mocktailsCard)) {
        // set start position
        mocktailsCard.classList.add('js-startPositionLeft');
        // animate into view
        window.setTimeout(function () {
          mocktailsCard.classList.add('js-endPosition');
        }, 10)
      }
    };


    let animateServicesLargeViewport = () => {

      if (isInViewport(heading)) {
        // animate into view
        heading.classList.add('js-end-show');
      }

      // if consultingCard OR mocktailsCard in viewport
      if (isInViewport(consultingCard) || isInViewport(mocktailsCard)) {
        // staggered animations for cards

        // set start position
        consultingCard.classList.add('js-startPositionLeft_ext');
        // animate into view
        window.setTimeout(function () {
          consultingCard.classList.add('js-endPosition_ext');
        }, 10)

        // set start position
        eventsCard.classList.add('js-startPositionTop');
        // animate into view
        window.setTimeout(function () {
          eventsCard.classList.add('js-endPosition');
        }, 700)

        // set start position
        mocktailsCard.classList.add('js-startPositionLeft');
        // animate into view
        window.setTimeout(function () {
          mocktailsCard.classList.add('js-endPosition');
        }, 1300)
      }
    };

    // if vp > 900
    if (window.matchMedia('(min-width: 900px)').matches) {
      window.addEventListener('scroll', animateServicesLargeViewport);
      window.addEventListener('load', animateServicesLargeViewport);
    } else {
      window.addEventListener('scroll', animateServices);
      window.addEventListener('load', animateServices);
    }
  }
}
// End animate services section.