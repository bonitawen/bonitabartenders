// START HIDE NAV ITEMS OF REGULAR NAV.
// SHOW BURGER-NAV.
{
  const mainNav = document.getElementsByClassName('nav-main')[0];
  const liArr = mainNav.getElementsByTagName('li');
  const burger = mainNav.getElementsByClassName('nav-burger')[0];

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


  window.addEventListener('resize', function () {
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

  fixedHeaderPushDown.classList.add('header-push-down');

  header.style.position = 'fixed';


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


  window.addEventListener('scroll', function () {

    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      // Downscroll code
      // Set header to static and don't display pushdown div.
      header.style.position = 'static';
      fixedHeaderPushDown.style.display = 'none';
    } else if (scrollTop < lastScrollTop) {
      // Upscroll code
      // If scrolled past header height.
      if (scrollTop > (6 * headerHeight)) {

        // Set header to fixed and display pushdown div.
        header.style.position = 'fixed';
        fixedHeaderPushDown.style.display = 'block';
      }

    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
  }, false);

} // End display header static/fixed.

