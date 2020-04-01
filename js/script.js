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




// START ANIMATE LANDING INTRO TEXT.
{
  let landingHeadings = () => {

    let h1Arr = document.querySelectorAll('.headings-wrap-landing h1'),
        h3 = document.querySelector('.headings-wrap-landing h3');

    // hide headings on load
    for (let i = 0; i < h1Arr.length; i++) {
      h1Arr[i].classList.add('js-startPositionLeft');
    }
    h3.classList.add('js-landing-h3-startPosition');

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
  };
  window.addEventListener('load', landingHeadings);
} // End animate landing intro text.
