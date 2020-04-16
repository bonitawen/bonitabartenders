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

      if (isInViewport(heading)) {
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
  let aboutUs = document.querySelector('.about-us-section p');

  // if aboutUS exists
  if (typeof aboutUs !== 'undefined' 
      && aboutUs !== null) {

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




// START ANIMATE TESTIMONIALS HEADINGS.
{
  let section = document.getElementsByClassName('headings-testimonials')[0],
      heading = document.querySelector('.headings-testimonials h3'),
      aboutUs = document.querySelector('.about-us-section p');


  // if aboutUS exists
  if (typeof aboutUs !== 'undefined'
      && aboutUs !== null) {

    // hide elems
    section.classList.add('js-start-hide');


    let animate = () => {

      // if speech bubble section in view but not previous para
      if (isInViewport(heading) && !isInViewport(aboutUs)) {
        
        // animate into view
        section.classList.add('js-end-show');

      } else if (isInViewport(heading) && isInViewport(aboutUs)) {

        // animate w/ delay
        window.setTimeout(function() {
          section.classList.add('js-end-show');
        }, 700);
      }
    };

    window.addEventListener('scroll', animate);
    window.addEventListener('load', animate);
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

// console.log('grid');

        const sliderWindow = document.getElementsByClassName('slider-window')[0];
        // const belt = document.getElementsByClassName('testimonials-container')[0];
        const beltItem1 = document.getElementsByClassName('testimonials-grid')[0];
        const beltItem2 = document.getElementsByClassName('testimonials-grid')[1];
        let clickCounter = 0;
        let shiftCounter = 0;
        const beltItemArr = document.getElementsByClassName('testimonials-grid');


        // set css
        const cssSetup = () => {
          sliderWindow.classList.add('js-slider-window');
          belt.classList.add('js-testimonials-container');
          beltItem1.style.marginBottom = '0';
          beltItem1.style.width = '49.9%';
          beltItem2.style.marginBottom = '0';
          beltItem2.style.width = '49.9%';

        };
        cssSetup();


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


      // browser doesn't support grid  OR  vp < 900
      } else if (typeof document.createElement('div').style.grid === 'undefined'  // TODO: not needed..?
                 || window.matchMedia('(max-width: 900px)').matches) {

// console.log('no grid');


      } // End else-if.

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
            clickTarget.style.cursor = 'url(img/back.png) 15 18, auto';

          } else if (xCoordInClickTarget > 0 && clickTarget.classList.contains('testimonials-grid')) {
            // clicked right
            clickTarget.style.cursor = 'url(img/next.png) 20 18, auto';
          }  else {
            clickTarget.style.cursor = 'auto';
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
              clickTarget.style.cursor = 'auto';

            } else {
              // clicked right

              if (xCoordInClickTarget > 0 && clickTarget.classList.contains('testimonials-grid')) {  // note: self addition: "&& xCoordInClickTarget > 0", if omitted there may be a little glitch on very right edge of element
                clickTarget.style.cursor = 'auto';
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
  const sliderWindow = document.getElementsByClassName('slider-window')[0];
  const testimonialBoxArr = document.getElementsByClassName('testimonial-box');

  const animateTestimonials = () => {

    // if browser supports grid && vp > 900 && visible-flag not present
    if (typeof document.createElement('div').style.grid !== 'undefined'
        && window.matchMedia('(min-width: 900px)').matches
        && !sliderWindow.classList.contains('visible-flag')) {

      // hide slider-window
      sliderWindow.classList.add('js-start-hide');

      const animate = () => {

        // if half of sliderWindow in view
        if (isHalfInViewport(sliderWindow)) { // TODO: possibly change to isInViewport
          
          // animate into view and add visible-flag
          sliderWindow.classList.add('js-end-show');
          sliderWindow.classList.add('visible-flag');
        }
      };

      window.addEventListener('scroll', animate);
      window.addEventListener('load', animate);
      window.addEventListener('resize', animate);


    // if no grid OR vp < 900 && visible-flag not present
    } else if (typeof document.createElement('div').style.grid === 'undefined'
               || window.matchMedia('(max-width: 900px)').matches
               && !sliderWindow.classList.contains('visible-flag')) {

      // hide cards
      for (let i = 0; i < testimonialBoxArr.length; i++) {
        testimonialBoxArr[i].classList.add('js-start-hide');
      }

      // show slider-window
      sliderWindow.classList.remove('js-start-hide');

      const animate = () => {

        for (let i = 0; i < testimonialBoxArr.length; i++) {
          // if card in view
          if (isInViewport(testimonialBoxArr[i])) {
            
            // animate into view and add visible-flag
            testimonialBoxArr[i].classList.add('js-end-show');
            sliderWindow.classList.add('visible-flag');
          }
        }
      };

      window.addEventListener('scroll', animate);
      window.addEventListener('load', animate);
      window.addEventListener('resize', animate);

    // else-if browser supports grid && vp > 900 && visible-flag present
    } else if (typeof document.createElement('div').style.grid !== 'undefined'
               && window.matchMedia('(min-width: 900px)').matches
               && sliderWindow.classList.contains('visible-flag')) {

      // show cards
      for (let i = 0; i < testimonialBoxArr.length; i++) {
        testimonialBoxArr[i].classList.remove('js-start-hide');
      }

    // else-if no grid && vp < 900 && visible-flag present
    } else if (typeof document.createElement('div').style.grid === 'undefined'
               && window.matchMedia('(max-width: 900px)').matches
               && sliderWindow.classList.contains('visible-flag')) {

      // show slider-window
      sliderWindow.classList.remove('js-start-hide');
    }

  }; // End animateTestimonials-function.



  // if testimonial section exists
  if (typeof document.getElementsByClassName('testimonials-section')[0] !== 'undefined') {

    animateTestimonials();
    window.addEventListener('resize', animateTestimonials);

  }
} // End animate testimonial section.




// START ANIMATE ABOUT WENDY SECTION.
{
  // if about-wendy section exists
  if (typeof document.getElementsByClassName('about-wendy-section')[0] !== 'undefined') {

    const h2 = document.querySelector('.about-wendy-section h2'),
          p = document.querySelector('.about-wendy-text p'),
          smImg = document.querySelector('.wendy-img-box .img-wrap'),
          lgImg = document.querySelector('.wendy-img-box img');

    h2.classList.add('js-start-hide');
    p.classList.add('js-start-hide');
    smImg.classList.add('js-start-hide');
    lgImg.classList.add('js-start-hide');

    let animate = () => {

      if (isInViewport(h2)) {
        // animate into view
        h2.classList.add('js-endPosition');
      }

      if (isInViewport(p)) {
        // animate into view
        p.classList.add('js-endPosition');
      }

      // if vp > 450
      if (window.matchMedia('(min-width: 450px)').matches) {
        if (isInViewport(smImg)) {
          // set start position
          lgImg.classList.add('js-startPositionTop');
          // animate into view
          window.setTimeout(function () {
            lgImg.classList.add('js-endPosition');
          }, 10)
        }

        if (isInViewport(smImg)) {
          // set start position
          smImg.classList.add('js-startPositionRight');
          // animate into view
          window.setTimeout(function () {
            smImg.classList.add('js-endPosition');
          }, 400)
        }

      // vp < 450
      } else {
        if (isInViewport(lgImg)) {
          // animate into view
          lgImg.classList.add('js-endPosition');
        }

        if (isInViewport(smImg)) {
          // animate into view
          smImg.classList.add('js-endPosition');
        }
      } // End if else
    }; // End animate-function

    animate();
    window.addEventListener('scroll', animate);

  } // End if about-wendy section exists
} // End animate about wendy section.




// START SHOW JS-ALCOHOL-HEADINGS, HIDE INDIVIDUAL HEADINGS.
{
  if (typeof document.getElementsByClassName('menu-section')[0] !== 'undefined') {
    const headingsGroup = document.getElementsByClassName('js-alcohol-headings')[0],
          individualHeadingsArr = document.getElementsByClassName('alcohol-heading');

    headingsGroup.classList.remove('hide');

    for (let i = 0; i < individualHeadingsArr.length; i++) {
      individualHeadingsArr[i].classList.add('hide');
    }
  }
} // End show js-alcohol-headings, hide individual headings.