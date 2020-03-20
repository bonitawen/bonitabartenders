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


  window.onresize = function () {

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

  // Show burger-nav.
  burger.classList.remove('hide');

} // End hide nav items of regular nav. Show burger-nav.
