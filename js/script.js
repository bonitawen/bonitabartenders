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


// START ANIMATE LANDING INTRO TEXT AND HERO IMG.
{
  let animateLandingHeadings = () => {

    let h1Arr = document.querySelectorAll('.headings-wrap-landing h1'),
        h3 = document.querySelector('.headings-wrap-landing h3'),
        reservationsH4 = document.querySelector('.reservations h4'),
        reservationsLinksArr = document.querySelectorAll('.reservations a'),
        hoursH4 = document.querySelector('.hours h4'),
        hoursDivsArr = document.querySelectorAll('.hours div'),
        hero = document.querySelector('.hero-section-homepage img');


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
    hero.classList.add('js-start-hide');


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


      // animate hero into view
      window.setTimeout(function () {
        hero.classList.add('js-landing-hero-show');
      }, 100)

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

} // End animate landing intro text and hero img.




// // START ANIMATE LANDING HERO.
// {
//   let hero = document.querySelector('.hero-section-homepage img');


//   // if form exists
//   if (typeof hero !== 'undefined') {

//     // hide elems
//     hero.classList.add('js-start-hide');


//     let animateHeroLanding = () => {

//       if (isInViewport(hero)) {
//         // animate into view
//         form.classList.add('js-end-show');
// console.log('puuh');
//       }
//     };

//     window.addEventListener('scroll', animateHeroLanding);
//     window.addEventListener('load', animateHeroLanding);
    
//   }
// }
// // End animate landing hero.




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
                   + parseInt(computed.getPropertyValue('border-bottom-width'), 10)
                   + 5;

      // If initialHeight < height
      if (initialHeight < height) {
        field.style.height = `${height}px`;
      }
    };

    document.addEventListener('input', function (event) {
      if (event.target.tagName.toLowerCase() !== 'textarea') return;
      autoExpand(event.target);
    }, false);
  }
} // End autogrow textarea.




// START ANIMATE FORMS.
{
  let form = document.getElementsByTagName('form')[0];


  // if form exists
  if (typeof form !== 'undefined') {

    // hide elems
    form.classList.add('js-start-hide');


    let animateForm = () => {

      if (isInViewport(form)) {
        // animate into view
        form.classList.add('js-end-show');
      }
    };

    window.addEventListener('scroll', animateForm);
    window.addEventListener('load', animateForm);
    
  }
}
// End animate form.




// START ANIMATE FOOTER.
{
  let logo = document.getElementsByClassName('logo-footer')[0],
      contact = document.getElementsByClassName('footer-contact')[0],
      nav = document.getElementsByClassName('nav-footer')[0],
      liArr = nav.getElementsByTagName('li');


  // hide elems
  logo.classList.add('js-start-hide');
  contact.classList.add('js-start-hide');
  liArr[0].classList.add('js-start-hide');
  liArr[1].classList.add('js-start-hide');
  liArr[2].classList.add('js-start-hide');
  liArr[3].classList.add('js-start-hide');


  let animateFooter = () => {

    if (isInViewport(logo)) {
      // animate into view
      logo.classList.add('js-end-show');
    }

    if (isInViewport(contact)) {
      // animate into view
      contact.classList.add('js-end-show');
    }

    if (isInViewport(liArr[0])) {
      // animate into view
      liArr[0].classList.add('js-end-show');

      window.setTimeout(function () {
        liArr[1].classList.add('js-end-show');
      }, 100);

      window.setTimeout(function () {
        liArr[2].classList.add('js-end-show');
      }, 200);

      window.setTimeout(function () {
        liArr[3].classList.add('js-end-show');
      }, 300);
    }
  };

  window.addEventListener('scroll', animateFooter);
  window.addEventListener('load', animateFooter);

}
// End animate footer.




// START ANIMATION FOR HERO SECTION ON ABOUT & COCKTAILS PAGE
{
  let section = document.getElementsByClassName('hero-section-about&cocktails')[0];

  // if about or cocktails hero section exists
  if (typeof section !== 'undefined') {

    let img = section.getElementsByClassName('hero-image-wrap')[0],
        heading = section.getElementsByTagName('h2')[0];

    // hide elems
    img.classList.add('js-start-hide');
    heading.classList.add('js-start-hide');

    let animateHeroSection = () => {

      if (isInViewport(section)) {
        // set start position
        heading.classList.add('js-about-h2-startPosition');

        // animate into view
        img.classList.add('js-end-show');

        window.setTimeout(function () {
          heading.classList.add('js-endPosition');
        }, 300);
      }
    };

    window.addEventListener('scroll', animateHeroSection);
    window.addEventListener('load', animateHeroSection);
    
  }
}
// End animation for hero section on about & cocktails page.




// START ANIMATE ABOUT US SECTION.
{
  let aboutUs = document.getElementsByClassName('about-us-section')[0];


  // if form exists
  if (typeof aboutUs !== 'undefined') {

    // hide elems
    aboutUs.classList.add('js-start-hide');


    let animate = () => {

      if (isInViewport(aboutUs)) {
        // animate into view

        window.setTimeout(function() {
          aboutUs.classList.add('js-end-show');
        }, 500);
        
      }
    };

    window.addEventListener('scroll', animate);
    window.addEventListener('load', animate);
    
  }
}
// End animate about us section.