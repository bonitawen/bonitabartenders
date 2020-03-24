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


  window.addEventListener('resize', function () {
    hideNavItems();
  });


  // Show burger-nav.
  burger.classList.remove('hide');

} // End hide nav items of regular nav. Show burger-nav.




// START FIXED HEADER.
// INSERT DIV AFTER HEADER W/SAME HEIGHT AS HEADER.
{

  const header = document.getElementsByTagName('header')[0];
  const headerHeight = window.getComputedStyle(header).height;
  const fixedHeaderPushDown = document.createElement('div');
  const navBurger = document.getElementsByClassName('nav-burger')[0];

  fixedHeaderPushDown.classList.add('header-push-down');

  header.style.position = 'fixed';
  navBurger.classList.add('js-nav-burger');

  // Set push-down-divs height to header height.
  fixedHeaderPushDown.style.height = headerHeight;

  // Insert push-down-div after header.
  document.getElementsByTagName('body')[0].insertBefore(fixedHeaderPushDown, header.nextSibling);


  window.addEventListener('resize', function () {
    // Set push-down-divs height to header height.
    fixedHeaderPushDown.style.height = window.getComputedStyle(header).height;
  });

} // End fixed header.




// DISPLAY HEADER
// - STATIC WHEN SCROLLING DOWN,
// - FIXED WHEN SCROLLING UP.
{
  let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const header = document.getElementsByTagName('header')[0];
  let headerHeight = header.offsetHeight;
  let fixedHeaderPushDown = document.getElementsByClassName('header-push-down')[0];


  // Update header height according to screen width.
  window.addEventListener('resize', function () {
    headerHeight = header.offsetHeight;
  });


  function staticFixedHeader() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // If downscroll.
    if (scrollTop > lastScrollTop) {
      // If scroll from top less than header height.
      if (scrollTop < (8 * headerHeight + 2)) {
        header.style.position = 'static';
        fixedHeaderPushDown.style.display = 'none';
      } else {
        // Move header up.
        header.style.transform = `translateY(-${headerHeight}px)`;
      }

    // If upscroll.
    } else if (scrollTop < lastScrollTop) {
      // If scroll from top larger than header height.
      if (scrollTop > (8 * headerHeight)) {
        header.style.position = 'fixed';
        fixedHeaderPushDown.style.display = 'block';
        // Move header down
        header.style.transform = 'translateY(0px)';
      }
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
  } 

  window.addEventListener('scroll', staticFixedHeader);

} // End display header static/fixed.



// START SHOW/HIDE MOBILE-NAV.
{
  let mobNav = document.getElementsByClassName('nav-mobile')[0];
  let header = document.getElementsByTagName('header')[0];
  let fixedHeaderPushDown = document.getElementsByClassName('header-push-down')[0];
  let navBurger = document.getElementsByClassName('nav-burger')[0];
  let logo = document.getElementsByClassName('logo')[0];


  document.getElementsByClassName('nav-burger')[0].addEventListener('click', function () {
    
    if (!mobNav.classList.contains('nav-mobile-show')) {
      mobNav.classList.add('nav-mobile-show');


      window.removeEventListener('scroll', staticFixedHeader);

      navBurger.classList.add('js-navBurger-darkBlue');

    } else {
      mobNav.classList.remove('nav-mobile-show');

      window.addEventListener('scroll', staticFixedHeader);

      navBurger.classList.remove('js-navBurger-darkBlue');

    }
  });

} // End show/hide mobile-nav.