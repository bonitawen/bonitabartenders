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
