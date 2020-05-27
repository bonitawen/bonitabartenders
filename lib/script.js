"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// START REMOVE PRELOADER
{
  var preloader = document.getElementsByClassName('preloader')[0];

  var removePreloader = function removePreloader() {
    // set opacity to 0
    preloader.classList.add('js-preloader-invisible'); // set display: none

    window.setTimeout(function () {
      preloader.classList.add('js-preloader-remove');
    }, 1500); // should be same as preloader fade out length
  };

  if (typeof preloader !== 'undefined') {
    // set first time loaded var
    var firstTime = localStorage.getItem('first_time'); // if first time loaded, remove preloader w/delay

    if (!firstTime) {
      localStorage.setItem('first_time', '1');
      window.setTimeout(function () {
        removePreloader();
      }, 500); // if not first time loaded, remove preloader w/ shorter delay
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
  var mainNav = document.getElementsByClassName('nav-main')[0];
  var liArr = mainNav.getElementsByTagName('li');
  var burger = document.getElementsByClassName('nav-burger')[0];

  var hideNavItems = function hideNavItems() {
    for (var i = 0, j = liArr.length; i < j; i++) {
      if (liArr[i].classList.contains('logo')) continue;
      window.matchMedia('(min-width: 900px)').matches ? liArr[i].classList.remove('hide') : liArr[i].classList.add('hide');
    } // TODO: take out
    // for (let i = 0; i < liArr.length; i++) {
    //   // If li not the logo.
    //   if (!liArr[i].classList.contains('logo')) {
    //     // If viewport > 900px and li-elem has hide-class.
    //     if (window.matchMedia('(min-width: 900px)').matches) {
    //       // Remove hide-class.
    //       liArr[i].classList.remove('hide');
    //     } else {
    //       // Add hide class.
    //       liArr[i].classList.add('hide');
    //     }
    //   }
    // }

  };

  hideNavItems();
  window.addEventListener('resize', hideNavItems); // Show burger-nav.

  burger.classList.remove('hide');
} // End hide nav items of regular nav. Show burger-nav.
// ADD BOX-SHADOW TO HEADER

{
  document.getElementsByTagName('header')[0].classList.add('js-header-box-shadow');
} // START SET HEADER HEIGHT.

{
  var header = document.getElementsByTagName('header')[0];

  var setHeaderHeight = function setHeaderHeight() {
    if (window.matchMedia('(min-width: 900px)').matches) return header.style.height = '100px';
    if (window.matchMedia('(min-width: 450px)').matches) return header.style.height = '80px';
    return header.style.height = '57px';
  };

  setHeaderHeight();
  window.addEventListener('resize', setHeaderHeight);
} // End set header height.
// HELPER FUNCTION TO DETECT SCROLL SPEED

var checkScrollSpeed = function (settings) {
  settings = settings || {};
  var lastPos,
      newPos,
      timer,
      delta,
      delay = settings.delay || 50; // in "ms" (higher means lower fidelity )

  function clear() {
    lastPos = null;
    delta = 0;
  }

  clear();
  return function () {
    newPos = window.scrollY;

    if (lastPos != null) {
      // && newPos < maxScroll 
      delta = newPos - lastPos;
    }

    lastPos = newPos;
    clearTimeout(timer);
    timer = setTimeout(clear, delay);
    return delta;
  };
}(); // START HEADER AND OVERLAY MENU.


{
  var _header = document.getElementsByTagName('header')[0];
  var headerBuffer = document.getElementsByClassName('headerBuffer')[0];
  var headerHeight = _header.offsetHeight;
  window.addEventListener('resize', function () {
    return headerHeight = _header.offsetHeight;
  });
  window.addEventListener('resize', function () {
    return headerBuffer.style.height = headerHeight + 'px';
  }); // WHEN SCROLLED PAST CERTAIN POINT TURN STATIC HEADER INTO FIXED HEADER

  var headerPositioning_1 = function headerPositioning_1() {
    // if vp < 900
    if (window.pageYOffset > 500 && window.matchMedia('(max-width: 900px)').matches) {
      _header.style.position = 'fixed';
      headerBuffer.style.height = headerHeight + 'px';
    } else if (window.pageYOffset === 0 && window.matchMedia('(max-width: 900px)').matches) {
      _header.style.position = 'absolute';
      headerBuffer.style.height = headerHeight + 'px';
    }
  };

  window.addEventListener('scroll', headerPositioning_1);
  window.addEventListener('resize', headerPositioning_1); // ON LOAD, SET HEADER TO FIXED/STATIC DEPENDING ON SCROLL POSITION

  var headerPositioning_2 = function headerPositioning_2() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop; // if vp < 900

    if (window.pageYOffset > 500 && window.matchMedia('(max-width: 900px)').matches) {
      _header.style.position = 'fixed';
      headerBuffer.style.height = headerHeight + 'px';

      _header.classList.add('js-header-transition');
    } else {
      _header.style.position = 'absolute';
      headerBuffer.style.height = headerHeight + 'px';
    }
  };

  window.addEventListener('load', headerPositioning_2); // SHOW/HIDE FIXED HEADER DEPENDING ON SCROLL DIRECTION

  var lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

  var showHideHeader = function showHideHeader() {
    // if vp < 900
    if (window.matchMedia('(max-width: 900px)').matches) {
      var headerTransformDistance = headerHeight + 10;
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop; // down scroll & header === absolute

      if (scrollTop > lastScrollTop && _header.style.position === 'absolute' && window.pageYOffset > 300) {
        _header.classList.remove('js-header-transition'); // move up so it won't be visible when positioned changes to fixed


        _header.style.transform = 'translateY(-' + headerTransformDistance + 'px)'; // up scroll & header === absolute
      } else if (scrollTop < lastScrollTop && _header.style.position === 'absolute') _header.style.transform = 'translateY(0)'; // down scroll


      if (scrollTop > lastScrollTop && _header.style.position === 'fixed' && scrollTop > headerHeight) {
        _header.style.transform = 'translateY(-' + headerTransformDistance + 'px)';

        _header.classList.add('js-header-transition'); // if pageYOffset < 500


        if (window.pageYOffset < 500) {
          window.setTimeout(function () {
            // set header = absolute
            _header.style.position = 'absolute';
          }, 400);
        } // up scroll && if past 500

      } else if (scrollTop < lastScrollTop && window.pageYOffset > 500 && checkScrollSpeed() < -15) {
        // show header
        _header.style.transform = 'translateY(0)';

        _header.classList.add('js-header-transition');
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    } // end if

  }; // end showHideHeader-func


  window.addEventListener('scroll', showHideHeader);

  var setHeaderPosition = function setHeaderPosition() {
    // vp < 900
    if (window.matchMedia('(max-width: 900px)').matches) return showHideHeader();
    _header.style.position = 'absolute';
    _header.style.transform = 'translateY(0)';

    _header.classList.remove('js-header-transition');
  };

  window.addEventListener('resize', setHeaderPosition); // OVERLAY-MENU

  var _burger = document.getElementsByClassName('nav-burger')[0];
  var overlay = document.getElementsByClassName('nav-mobile')[0];
  var body = document.body;
  var scrollPosition;

  var menuOverlay = function menuOverlay() {
    // if menu closed
    if (!overlay.classList.contains('js-nav-mobile-show')) {
      // if header absolute add a flag
      if (_header.style.position === 'absolute') _header.classList.add('removeFixed');
      overlay.classList.add('js-nav-mobile-show');
      _header.style.position = 'fixed';
      headerBuffer.style.height = headerHeight + 'px';
      _header.style.transform = 'translateY(0)';
      window.removeEventListener('scroll', headerPositioning_1);
      window.removeEventListener('scroll', showHideHeader);

      _burger.classList.add('js-nav-burger-expand'); // gets pageYOffset before setting body to fixed


      scrollPosition = window.pageYOffset;
      window.setTimeout(function () {
        document.documentElement.classList.add('noscroll');
      }, 400); // if menu opened
    } else {
      // remove fixed from body
      document.documentElement.classList.remove('noscroll'); // set scroll position to where it was before opening menu

      window.setTimeout(function () {
        document.documentElement.scrollTop = scrollPosition;
      }, 50); // call code w/slight delay

      window.setTimeout(function () {
        // if header has a flag, set header to absolute
        if (_header.classList.contains('removeFixed')) {
          _header.classList.remove('removeFixed');

          _header.style.position = 'absolute';

          if (window.pageYOffset > 500) {
            _header.classList.remove('removeFixed');

            _header.style.position = 'fixed';
          }
        } // TODO: remove??
        // header was fixed before opening
        //else if (window.pageYOffset < 200) {
        //   window.setTimeout(function () {
        //     header.style.position = 'absolute';
        //   }, 400); // length of transitioning mobile-overlay
        // }


        overlay.classList.remove('js-nav-mobile-show');
        window.addEventListener('scroll', headerPositioning_1);
        window.addEventListener('scroll', showHideHeader);

        _burger.classList.remove('js-nav-burger-expand');
      }, 100);
    } // IF ON COCKTAILS PAGE TURN NAV-BURGER DARK BLUE


    body.classList.contains('cocktails') && !_burger.classList.contains('js-navBurger-darkBlue') ? _burger.classList.add('js-navBurger-darkBlue') : _burger.classList.remove('js-navBurger-darkBlue');
  };

  _burger.addEventListener('click', menuOverlay); // CLOSE OVERLAY IF VIEWPORT > 900


  window.addEventListener('resize', function () {
    if (window.matchMedia('(min-width: 900px)').matches && overlay.classList.contains('js-nav-mobile-show')) overlay.classList.remove('js-nav-mobile-show');
  }); // ON LOAD MOVE OVERLAY OFF THE PAGE

  window.addEventListener('load', function () {
    overlay.classList.add('js-nav-mobile-transition');
  });
} // End header and overlay menu.
// HELPER FUNC THAT RETURNS TRUE IF ELEM IN VIEWPORT

var isInViewport = function isInViewport(elem) {
  var bounding = elem.getBoundingClientRect();
  return bounding.top >= 0 && bounding.left >= 0 && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) && bounding.right <= (window.innerWidth || document.documentElement.clientWidth);
}; // HELPER FUNC THAT RETURNS TRUE IF HALF OF ELEM IN VIEWPORT


var isHalfInViewport = function isHalfInViewport(elem) {
  var bounding = elem.getBoundingClientRect();
  var elemStyle = window.getComputedStyle(elem);
  return bounding.top >= '-' + parseInt(elemStyle.height) / 2 && bounding.left >= 0 && bounding.bottom - parseInt(elemStyle.height) / 2 <= (window.innerHeight || document.documentElement.clientHeight) && bounding.right <= (window.innerWidth || document.documentElement.clientWidth);
}; // HELPER FUNC THAT RETURNS TRUE IF ELEM IN VIEWPORT


var isInVerticalViewport = function isInVerticalViewport(elem) {
  var bounding = elem.getBoundingClientRect();
  return bounding.top >= 0 && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight);
}; // START ANIMATE LANDING INTRO TEXT AND HERO IMG.


{
  var h1NodeList = document.querySelectorAll('.headings-wrap-landing h1');
  var reservationsLinksNodeList = document.querySelectorAll('.reservations a');
  var hoursDivNodeList = document.querySelectorAll('.hours div');
  var h1ObjArr = Array.from(h1NodeList, function (h1) {
    return new ElementAnimation(h1);
  });
  var reservationsLinksObjArr = Array.from(reservationsLinksNodeList, function (a) {
    return new ElementAnimation(a);
  });
  var hoursDivObjArr = Array.from(hoursDivNodeList, function (div) {
    return new ElementAnimation(div);
  });
  var h3 = new ElementAnimation(document.querySelector('.headings-wrap-landing h3'));
  var reservationsH4 = new ElementAnimation(document.querySelector('.reservations h4'));
  var hoursH4 = new ElementAnimation(document.querySelector('.hours h4'));
  var hero = new ElementAnimation(document.querySelector('.hero-section-homepage img'));
  var servicesHeading = new ElementAnimation(document.querySelector('.services-heading'));
  var elemObjArr = [].concat(_toConsumableArray(h1ObjArr), _toConsumableArray(reservationsLinksObjArr), _toConsumableArray(hoursDivObjArr), [h3, reservationsH4, hoursH4, hero, servicesHeading]);
  var contactObjects = [reservationsH4, reservationsLinksObjArr[0], reservationsLinksObjArr[1], hoursH4, hoursDivObjArr[0], hoursDivObjArr[1]];

  var animate = function animate() {
    if (h3.isInViewport()) {
      hero.delay(hero.fullOpacity, 100, 1200);
      h1ObjArr[0].delay(h1ObjArr[0].slideEndPos, 10, 600);
      h1ObjArr[1].delay(h1ObjArr[1].slideEndPos, 250, 600);
      h1ObjArr[2].delay(h1ObjArr[2].slideEndPos, 500, 600);
      h3.delay(h3.slideEndPos, 1000);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = contactObjects[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var obj = _step.value;
          obj.delay(obj.fullOpacity, 1600);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      servicesHeading.delay(servicesHeading.animateIfInView, 1600);
    }

    if (reservationsH4.isInViewport() && !h1ObjArr[0].isInVerticalViewport()) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = contactObjects[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _obj = _step2.value;

          _obj.fullOpacity();
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  };

  if (h3.isNotUndefined()) {
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = elemObjArr[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _elem = _step3.value;

        _elem.zeroOpacity();
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
          _iterator3["return"]();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = h1ObjArr[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var h1 = _step4.value;
        h1.slideRightStartPos();
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
          _iterator4["return"]();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }

    h3.slideUpStartPos();
    animate();
    window.addEventListener('scroll', animate);
  }
} // End animate landing intro text and hero img.
// START ADD COLOR TRANSITION

{
  var reservationsLinksNl = document.querySelectorAll('.reservations a');

  var _h = new ElementAnimation(document.querySelector('.headings-wrap-landing h3'));

  var _reservationsH = new ElementAnimation(document.querySelector('.reservations h4'));

  var _h1NodeList = document.querySelectorAll('.headings-wrap-landing h1');

  var _h1ObjArr = Array.from(_h1NodeList, function (h1) {
    return new ElementAnimation(h1);
  });

  if (_h.isNotUndefined()) if (_h.isInViewport() || _reservationsH.isInViewport() && !_h1ObjArr[0].isInVerticalViewport()) {
    //  color transition override opacity/fade-in. wait, till reservation-links are faded-in.
    window.setTimeout(function () {
      reservationsLinksNl[0].classList.add('js-color-transition');
      reservationsLinksNl[1].classList.add('js-color-transition');
    }, 2500);
  }
} // End add color transition
// START ANIMATE SERVICES SECTION.

{
  var heading = new ElementAnimation(document.getElementsByClassName('services-heading')[0]);
  var eventsCard = new ElementAnimation(document.getElementsByClassName('card-events')[0]);
  var consultingCard = new ElementAnimation(document.getElementsByClassName('card-cocktail-consulting')[0]);
  var mocktailsCard = new ElementAnimation(document.getElementsByClassName('card-mocktails')[0]);

  var _h1NodeList2 = document.querySelectorAll('.headings-wrap-landing h1');

  var _h1ObjArr2 = Array.from(_h1NodeList2, function (h1) {
    return new ElementAnimation(h1);
  });

  var elemArr = [heading, eventsCard, consultingCard, mocktailsCard];

  var animateSmViewport = function animateSmViewport() {
    if (heading.isInViewport() && !_h1ObjArr2[0].isInVerticalViewport()) heading.fullOpacity();
    if (eventsCard.isHalfInViewport()) eventsCard.delay(eventsCard.slideEndPos, 10);
    if (consultingCard.isInVerticalViewport()) consultingCard.delay(consultingCard.slideEndPos, 10);
    if (mocktailsCard.isInVerticalViewport()) mocktailsCard.delay(mocktailsCard.slideEndPos, 10);
  };

  var animateLgViewport = function animateLgViewport() {
    heading.animateIfInView();

    if (consultingCard.isHalfInViewport() || mocktailsCard.isHalfInViewport()) {
      consultingCard.delay(consultingCard.slideEndPos, 10, 700);
      consultingCard.delay(eventsCard.slideEndPos, 700);
      consultingCard.delay(mocktailsCard.slideEndPos, 1300);
    }
  };

  var viewportController = function viewportController() {
    if (window.matchMedia('(min-width: 900px)').matches) {
      animateLgViewport();
      window.addEventListener('scroll', animateLgViewport);
    } else {
      animateSmViewport();
      window.addEventListener('scroll', animateSmViewport);
    }
  };

  if (heading.isNotUndefined()) {
    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (var _iterator5 = elemArr[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        elem = _step5.value;
        elem.zeroOpacity();
      }
    } catch (err) {
      _didIteratorError5 = true;
      _iteratorError5 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
          _iterator5["return"]();
        }
      } finally {
        if (_didIteratorError5) {
          throw _iteratorError5;
        }
      }
    }

    eventsCard.slideDownStartPos(50);
    mocktailsCard.slideRightStartPos(10);
    consultingCard.slideRightStartPos(10);
    viewportController();
    window.addEventListener('resize', viewportController);
  }
} // End animate services section.
// START AUTOGROW TEXTAREA.

{
  // Calculate textAreas height 
  var textArea = document.getElementsByTagName('textarea')[0]; // if textArea exists

  if (typeof textArea !== 'undefined') {
    var textAreaComputed = window.getComputedStyle(textArea);
    var initialHeight = parseInt(textAreaComputed.getPropertyValue('border-top-width'), 10) + parseInt(textAreaComputed.getPropertyValue('padding-top'), 10) + textArea.scrollHeight + parseInt(textAreaComputed.getPropertyValue('padding-bottom'), 10) + parseInt(textAreaComputed.getPropertyValue('border-bottom-width'), 10);

    var autoExpand = function autoExpand(field) {
      // Reset field height
      field.style.height = 'inherit'; // Get the computed styles for the element

      var computed = window.getComputedStyle(field); // Calculate the height

      var height = parseInt(computed.getPropertyValue('border-top-width'), 10) + parseInt(computed.getPropertyValue('padding-top'), 10) + field.scrollHeight + parseInt(computed.getPropertyValue('padding-bottom'), 10) + parseInt(computed.getPropertyValue('border-bottom-width'), 10); // If initialHeight < height

      if (initialHeight < height) field.style.height = "".concat(height, "px");
    };

    document.addEventListener('input', function (event) {
      if (event.target.tagName.toLowerCase() !== 'textarea') return;
      autoExpand(event.target);
    }, false);
  }
} // End autogrow textarea.
// START ANIMATE FORMS.

{
  var form = new ElementAnimation(document.getElementsByTagName('form')[0]);

  if (form.isNotUndefined()) {
    form.zeroOpacity();
    form.animateIfHalfInView();
    window.addEventListener('scroll', function () {
      return form.animateIfHalfInView();
    });
  }
} // End animate form.
// ***************************************************

function ElementAnimation(elem) {
  this.elem = elem;

  this.isNotUndefined = function () {
    return typeof this.elem !== 'undefined' && this.elem !== null;
  };

  this.zeroOpacity = function () {
    this.elem.classList.add('js-zero-opacity');
  };

  this.fullOpacity = function () {
    var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 800;
    var easing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ease-in-out';
    this.elem.classList.add('js-full-opacity');
    this.elem.style.transition = "opacity ".concat(duration, "ms ").concat(easing);
  }.bind(this);

  this.delay = function (action, delay) {
    var actionPara = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 800;
    window.setTimeout(function () {
      action(actionPara);
    }, delay);
  };

  this.isInViewport = function () {
    this.bounding = this.elem.getBoundingClientRect();
    return this.bounding.top >= 0 && this.bounding.left >= 0 && this.bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) && this.bounding.right <= (window.innerWidth || document.documentElement.clientWidth);
  };

  this.isHalfInViewport = function () {
    this.bounding = this.elem.getBoundingClientRect();
    this.computedStyle = window.getComputedStyle(this.elem);
    return this.bounding.top >= '-' + parseInt(this.computedStyle.height) / 2 && this.bounding.left >= 0 && this.bounding.bottom - parseInt(this.computedStyle.height) / 2 <= (window.innerHeight || document.documentElement.clientHeight) && this.bounding.right <= (window.innerWidth || document.documentElement.clientWidth);
  };

  this.isInVerticalViewport = function () {
    this.bounding = this.elem.getBoundingClientRect();
    return this.bounding.top >= 0 && this.bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight);
  };

  this.animateIfInView = function () {
    var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 800;
    var easing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ease-in-out';
    if (this.isInViewport()) this.fullOpacity(duration, easing);
  }.bind(this);

  this.animateIfHalfInView = function () {
    var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 800;
    var easing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ease-in-out';
    // console.log(this); // ??? why is this === window here ???
    if (this.isHalfInViewport()) this.fullOpacity(duration, easing);
  }.bind(this);

  this.slideDownStartPos = function () {
    var startPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
    this.elem.classList.add('js-zero-opacity');
    this.elem.style.transform = "translateY(-".concat(startPos, "px)");
  }.bind(this);

  this.slideUpStartPos = function () {
    var startPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
    this.elem.classList.add('js-zero-opacity');
    this.elem.style.transform = "translateY(".concat(startPos, "px)");
  }.bind(this);

  this.slideRightStartPos = function () {
    var startPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 40;
    this.elem.classList.add('js-zero-opacity');
    this.elem.style.transform = "translateX(-".concat(startPos, "vw)");
  }.bind(this);

  this.slideLeftStartPos = function () {
    var startPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 40;
    this.elem.classList.add('js-zero-opacity');
    this.elem.style.transform = "translateX(".concat(startPos, "vw)");
  }.bind(this);

  this.slideEndPos = function () {
    var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 600;
    var easing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ease-in-out';
    window.setTimeout(function () {
      this.elem.classList.add('js-full-opacity');
      this.elem.style.transform = "translate(0)";
      this.elem.style.transition = "opacity ".concat(duration, "ms ").concat(easing, ", transform ").concat(duration, "ms ").concat(easing);
    }.bind(this));
  }.bind(this);
} // ***************************************************
// START ANIMATE FOOTER.


{
  var footerElems = {
    logo: new ElementAnimation(document.getElementsByClassName('logo-footer')[0]),
    contact: new ElementAnimation(document.getElementsByClassName('footer-contact')[0]),
    nav: new ElementAnimation(document.getElementsByClassName('nav-footer')[0]),
    liArr: [new ElementAnimation(document.querySelectorAll('.nav-footer li')[0]), new ElementAnimation(document.querySelectorAll('.nav-footer li')[1]), new ElementAnimation(document.querySelectorAll('.nav-footer li')[2]), new ElementAnimation(document.querySelectorAll('.nav-footer li')[3])]
  };

  var animateFooter = function animateFooter() {
    for (var key in footerElems) {
      if (!Array.isArray(footerElems[key])) {
        footerElems[key].zeroOpacity();
        footerElems[key].animateIfInView();
      } else {
        var delay = 0;
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = footerElems[key][Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var li = _step6.value;
            li.zeroOpacity();
            li.delay(li.animateIfInView, delay);
            delay += 100;
          }
        } catch (err) {
          _didIteratorError6 = true;
          _iteratorError6 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
              _iterator6["return"]();
            }
          } finally {
            if (_didIteratorError6) {
              throw _iteratorError6;
            }
          }
        }
      }
    }
  };

  if (footerElems.logo.isNotUndefined()) {
    animateFooter();
    window.addEventListener('scroll', function () {
      return animateFooter();
    });
  }
} // End animate footer.
// START ANIMATION FOR HERO SECTION ON ABOUT & COCKTAILS PAGE

{
  var introElems = {
    img: new ElementAnimation(document.querySelector('.hero-section-aboutAndCocktails .hero-image-wrap')),
    heading: new ElementAnimation(document.querySelector('.hero-section-aboutAndCocktails h2'))
  };

  var animateIntroSection = function animateIntroSection() {
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
    window.addEventListener('scroll', function () {
      return animateIntroSection();
    });
  }
} // End animation for hero section on about & cocktails page.
// START ANIMATE ABOUT US SECTION.

{
  var aboutUs = new ElementAnimation(document.querySelector('.about-us-section p'));

  if (aboutUs.isNotUndefined()) {
    aboutUs.zeroOpacity();
    aboutUs.delay(aboutUs.animateIfInView, 500);
    window.addEventListener('scroll', function () {
      return aboutUs.delay(aboutUs.animateIfInView, 500);
    });
  }
} // START ANIMATE TESTIMONIALS HEADINGS.

{
  var headingsWrap = new ElementAnimation(document.getElementsByClassName('headings-testimonials')[0]);

  var _heading = new ElementAnimation(document.querySelector('.headings-testimonials h3'));

  var _aboutUs = new ElementAnimation(document.querySelector('.about-us-section p'));

  var _animate = function _animate() {
    if (_heading.isInViewport() && !_aboutUs.isInViewport()) return headingsWrap.fullOpacity();
    if (_heading.isInViewport() && _aboutUs.isInViewport()) return headingsWrap.delay(headingsWrap.fullOpacity, 700);
  };

  if (_aboutUs.isNotUndefined()) {
    headingsWrap.zeroOpacity();

    _animate();

    window.addEventListener('scroll', _animate);
  }
} // End animate testimonials headings.
// START TESTIMONIAL SLIDER.

{
  // if testimonial section exists
  if (typeof document.getElementsByClassName('testimonials-section')[0] !== 'undefined') {
    var belt = document.getElementsByClassName('testimonials-container')[0];

    var testimonialSlider = function testimonialSlider() {
      // if browser supports grid && vp > 900
      if (typeof document.createElement('div').style.grid !== 'undefined' && window.matchMedia('(min-width: 900px)').matches) {
        var sliderWindow = document.getElementsByClassName('slider-window')[0]; // const belt = document.getElementsByClassName('testimonials-container')[0];

        var beltItem1 = document.getElementsByClassName('testimonials-grid')[0];
        var beltItem2 = document.getElementsByClassName('testimonials-grid')[1];
        var clickCounter = 0;
        var shiftCounter = 0;
        var beltItemArr = document.getElementsByClassName('testimonials-grid'); // set css

        var cssSetup = function cssSetup() {
          if (typeof document.createElement('div').style.grid !== 'undefined' && window.matchMedia('(min-width: 900px)').matches) {
            sliderWindow.classList.add('js-slider-window');
            belt.classList.add('js-testimonials-container');
            beltItem1.style.marginBottom = '0';
            beltItem1.style.width = '50%';
            beltItem2.style.marginBottom = '0';
            beltItem2.style.width = '50%';
            beltItem1.style.border = '1px solid transparent';
            beltItem2.style.border = '1px solid transparent'; // no grid OR vp < 900
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
        window.addEventListener('resize', cssSetup); // set slider-window height === testimonials-container height

        var setSliderWindowHeight = function setSliderWindowHeight() {
          belt.classList.remove('js-belt-transition');
          window.setTimeout(function () {
            var testimContComputed = window.getComputedStyle(belt);
            var beltHeight = parseInt(testimContComputed.height);
            sliderWindow.style.height = beltHeight + 'px';
          }, 100);
        };

        setSliderWindowHeight();
        window.addEventListener('resize', setSliderWindowHeight); // function that slides belt left or right

        var slideLeftRight = function slideLeftRight(e) {
          if (typeof document.createElement('div').style.grid !== 'undefined' && window.matchMedia('(min-width: 900px)').matches) {
            var clickTarget = e.target;
            var xCoordInClickTarget = e.clientX - clickTarget.getBoundingClientRect().left;
            var beltWidth = belt.offsetWidth;
            var beltRemainder = beltWidth + shiftCounter;
            var clickTargetWidth = beltWidth / beltItemArr.length;
            belt.classList.add('js-belt-transition'); // note: 2 self additions: "&& xCoordInClickTarget > 0", if omitted there may be a little glitch on very right edge of element
            //                         "clickTarget.classList.contains('testimonials-grid')", ensures that we click on belt item, so belt won't shift if clicked on belt insted of belt item.

            if (clickTargetWidth / 2 > xCoordInClickTarget && xCoordInClickTarget > 0 && clickTarget.classList.contains('testimonials-grid')) {
              // clicked left
              // if belt if is not in start position
              // or "only shift belt right, if shiftCounter is negative"
              if (shiftCounter < -10) {
                // note: -10 is just a safety buffer for borders etc (can be zero, but it may cause glitches)
                // increase counter
                clickCounter += 1;
                shiftCounter = clickCounter * clickTargetWidth; // shift belt right

                belt.style.transform = "translateX(".concat(shiftCounter, "px)");
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
                  shiftCounter = clickCounter * clickTargetWidth; // shift belt left

                  belt.style.transform = "translateX(".concat(shiftCounter, "px)");
                  belt.classList.add('js-belt-moved');
                }
              }
            }
          } // End if.

        }; // End slideLeftRight-function.


        sliderWindow.addEventListener('click', function (e) {
          slideLeftRight(e);
        }); // needed so belt-position is adjusted properly on resize

        var adjustXpositionOfBelt = function adjustXpositionOfBelt() {
          if (window.matchMedia('(min-width: 900px)').matches) {
            var beltComputed = window.getComputedStyle(belt);
            var beltWidth = parseInt(beltComputed.width);
            var itemWidth = beltWidth / beltItemArr.length; // NOTE:  depends on how many item on belt; possibly automate

            belt.classList.remove('js-belt-transition');
            shiftCounter = clickCounter * itemWidth;
            belt.style.transform = "translateX(".concat(shiftCounter, "px)");
          } else {
            belt.style.transform = "translateX(0)";
          }
        };

        window.addEventListener('resize', adjustXpositionOfBelt);
      } // end if

    }; // End testimonialSlider-function.


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
    var sliderWindow = document.getElementsByClassName('slider-window')[0];

    var navArrows = function navArrows() {
      // if browser supports grid && vp > 900
      if (typeof document.createElement('div').style.grid !== 'undefined' && window.matchMedia('(min-width: 900px)').matches) {
        // function displaying left right arrows on hover
        var showNavArrows = function showNavArrows(e) {
          var clickTarget = e.target;
          var clickTargetWidth = clickTarget.offsetWidth;
          var xCoordInClickTarget = e.clientX - clickTarget.getBoundingClientRect().left;

          if (clickTargetWidth / 2 > xCoordInClickTarget && xCoordInClickTarget > 0 && clickTarget.classList.contains('testimonials-grid')) {
            // note: self addition: "&& xCoordInClickTarget > 0", if omitted there may be a little glitch on very right edge of element
            // clicked left
            clickTarget.classList.remove('js-arrow-next');
            clickTarget.classList.add('js-arrow-back');
          } else if (xCoordInClickTarget > 0 && clickTarget.classList.contains('testimonials-grid')) {
            // clicked right
            clickTarget.classList.remove('js-arrow-back');
            clickTarget.classList.add('js-arrow-next');
          } else {
            clickTarget.classList.remove('js-arrow-back');
            clickTarget.classList.remove('js-arrow-next');
          }
        };

        sliderWindow.addEventListener('mousemove', function (e) {
          showNavArrows(e);
        });
      } else if (typeof document.createElement('div').style.grid === 'undefined' || window.matchMedia('(max-width: 900px)').matches) {
        var _sliderWindow = document.getElementsByClassName('slider-window')[0]; // function hiding left right arrows

        var hideNavArrows = function hideNavArrows(e) {
          var clickTarget = e.target;
          var clickTargetWidth = clickTarget.offsetWidth;
          var xCoordInClickTarget = e.clientX - clickTarget.getBoundingClientRect().left;

          if (clickTargetWidth / 2 > xCoordInClickTarget && xCoordInClickTarget > 0 && clickTarget.classList.contains('testimonials-grid')) {
            // note: self addition: "&& xCoordInClickTarget > 0", if omitted there may be a little glitch on very right edge of element
            // clicked left
            clickTarget.classList.remove('js-arrow-back');
            clickTarget.classList.remove('js-arrow-next');
          } else {
            // clicked right
            if (xCoordInClickTarget > 0 && clickTarget.classList.contains('testimonials-grid')) {
              // note: self addition: "&& xCoordInClickTarget > 0", if omitted there may be a little glitch on very right edge of element
              clickTarget.classList.remove('js-arrow-back');
              clickTarget.classList.remove('js-arrow-next');
            }
          }
        };

        _sliderWindow.addEventListener('mousemove', function (e) {
          hideNavArrows(e);
        });
      } // End else-if.

    }; // End navArrows-function.


    navArrows();
    window.addEventListener('resize', navArrows);
  } // End if testimonials section exists.

} // End nav-arrow logic for testimonials section.
// START ANIMATE TESTIMONIAL SECTION.

{
  var _sliderWindow2 = new ElementAnimation(document.getElementsByClassName('slider-window')[0]);

  var testimonialsNl = document.getElementsByClassName('testimonial-box');
  var testimonialsArr = Array.from(testimonialsNl, function (testimonial) {
    return new ElementAnimation(testimonial);
  });

  var animateGrid = function animateGrid() {
    if (_sliderWindow2.isHalfInViewport()) {
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = testimonialsArr[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var testimonial = _step7.value;
          testimonial.fullOpacity(0);
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
            _iterator7["return"]();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      _sliderWindow2.fullOpacity();
    }
  };

  var animateNoGrid = function animateNoGrid() {
    var _iteratorNormalCompletion8 = true;
    var _didIteratorError8 = false;
    var _iteratorError8 = undefined;

    try {
      for (var _iterator8 = testimonialsArr[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
        var testimonial = _step8.value;

        if (testimonial.isInViewport()) {
          _sliderWindow2.fullOpacity(0);

          testimonial.fullOpacity();
        }
      }
    } catch (err) {
      _didIteratorError8 = true;
      _iteratorError8 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
          _iterator8["return"]();
        }
      } finally {
        if (_didIteratorError8) {
          throw _iteratorError8;
        }
      }
    }
  };

  var _viewportController = function _viewportController() {
    // grid ok AND vp > 900
    if (typeof document.createElement('div').style.grid !== 'undefined' && window.matchMedia('(min-width: 900px)').matches) {
      animateGrid();
      window.addEventListener('scroll', animateGrid);
      window.addEventListener('resize', animateGrid); // no grid OR vp < 900
    } else if (typeof document.createElement('div').style.grid === 'undefined' || window.matchMedia('(max-width: 900px)').matches) {
      animateNoGrid();
      window.addEventListener('scroll', animateNoGrid);
      window.addEventListener('resize', animateNoGrid);
    }
  }; // if testimonial section exists


  if (typeof testimonialsArr[0] !== 'undefined' && testimonialsArr[0] !== null) {
    _sliderWindow2.zeroOpacity();

    var _iteratorNormalCompletion9 = true;
    var _didIteratorError9 = false;
    var _iteratorError9 = undefined;

    try {
      for (var _iterator9 = testimonialsArr[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
        var testimonial = _step9.value;
        testimonial.zeroOpacity();
      }
    } catch (err) {
      _didIteratorError9 = true;
      _iteratorError9 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
          _iterator9["return"]();
        }
      } finally {
        if (_didIteratorError9) {
          throw _iteratorError9;
        }
      }
    }

    _viewportController();

    window.addEventListener('resize', _viewportController);
  }
} // End animate testimonial section.
// START ANIMATE ABOUT WENDY SECTION.

{
  var h2 = new ElementAnimation(document.querySelector('.about-wendy-section h2'));
  var p = new ElementAnimation(document.querySelector('.about-wendy-text p'));
  var smImg = new ElementAnimation(document.querySelector('.wendy-img-box .img-wrap'));
  var lgImg = new ElementAnimation(document.querySelector('.wendy-img-box img'));
  var _elemArr = [h2, p, smImg, lgImg];
  var smFlag = false; // inidcates if section was animated in on mobile

  var lgFlag = false; // inidcates if section was animated in on desktop

  var lgStartPosSet = false;
  var smStartPosSet = false;

  var _animateSmViewport = function _animateSmViewport() {
    if (window.matchMedia('(max-width: 450px)').matches) {
      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = _elemArr[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var _elem2 = _step10.value;

          if (_elem2.isInViewport()) {
            _elem2.fullOpacity();

            smFlag = true;
          }
        }
      } catch (err) {
        _didIteratorError10 = true;
        _iteratorError10 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion10 && _iterator10["return"] != null) {
            _iterator10["return"]();
          }
        } finally {
          if (_didIteratorError10) {
            throw _iteratorError10;
          }
        }
      }
    }
  };

  var _animateLgViewport = function _animateLgViewport() {
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

  var setLgStartPos = function setLgStartPos() {
    smImg.slideLeftStartPos(10);
    lgImg.slideDownStartPos(50);
    lgStartPosSet = true;
    smStartPosSet = false;
  };

  var setSmStartPos = function setSmStartPos() {
    smImg.slideLeftStartPos(0);
    lgImg.slideDownStartPos(0);
    smStartPosSet = true;
    lgStartPosSet = false;
  };

  var _viewportController2 = function _viewportController2() {
    if (window.matchMedia('(min-width: 450px)').matches && !smFlag) {
      setTimeout(function () {
        if (!lgStartPosSet) setLgStartPos();

        _animateLgViewport();

        window.addEventListener('scroll', _animateLgViewport);
      }, 300);
    }

    if (window.matchMedia('(max-width: 450px)').matches && !lgFlag) {
      setTimeout(function () {
        if (!smStartPosSet) setSmStartPos();

        _animateSmViewport();

        window.addEventListener('scroll', _animateSmViewport);
      });
    }
  };

  if (h2.isNotUndefined()) {
    var _iteratorNormalCompletion11 = true;
    var _didIteratorError11 = false;
    var _iteratorError11 = undefined;

    try {
      for (var _iterator11 = _elemArr[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
        var _elem3 = _step11.value;

        _elem3.zeroOpacity();
      }
    } catch (err) {
      _didIteratorError11 = true;
      _iteratorError11 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion11 && _iterator11["return"] != null) {
          _iterator11["return"]();
        }
      } finally {
        if (_didIteratorError11) {
          throw _iteratorError11;
        }
      }
    }

    _viewportController2();

    window.addEventListener('resize', _viewportController2);
  }
} // End animate about wendy section.
// START SHOW JS-ALCOHOL-HEADINGS, HIDE INDIVIDUAL HEADINGS.

{
  if (typeof document.getElementsByClassName('menu-section')[0] !== 'undefined') {
    var headingsGroup = document.getElementsByClassName('js-alcohol-headings')[0],
        individualHeadingsArr = document.getElementsByClassName('alcohol-heading');
    headingsGroup.classList.remove('hide');

    for (var i = 0, j = individualHeadingsArr.length; i < j; i++) {
      individualHeadingsArr[i].classList.add('hide');
    }
  }
} // End show js-alcohol-headings, hide individual headings.
// START SET CSS FOR MENU SECTION.

{
  if (typeof document.getElementsByClassName('menu-section')[0] !== 'undefined') {
    (function () {
      var beltArr = document.getElementsByClassName('belt'),
          sliderWindow = document.getElementsByClassName('window')[0],
          drinksGridArr = document.getElementsByClassName('drinks-grid'),
          optionsContainer = document.getElementsByClassName('js-alcohol-headings')[0],
          h4Arr = optionsContainer.getElementsByTagName('h4');
      sliderWindow.style.position = 'relative';
      sliderWindow.style.overflow = 'hidden';
      optionsContainer.style.display = 'flex';

      var _loop = function _loop(_i, _j) {
        h4Arr[_i].classList.add('js-h4');

        h4Arr[_i].addEventListener('mouseenter', function () {
          h4Arr[_i].classList.add('js-h4-hover');
        });

        h4Arr[_i].addEventListener('mouseleave', function () {
          h4Arr[_i].classList.remove('js-h4-hover');
        });
      };

      for (var _i = 0, _j = h4Arr.length; _i < _j; _i++) {
        _loop(_i, _j);
      }

      var menuCss = function menuCss() {
        // grid + vp > 900
        if (typeof document.createElement('div').style.grid !== 'undefined' && window.matchMedia('(min-width: 900px)').matches) {
          for (var _i2 = 0, _j2 = beltArr.length; _i2 < _j2; _i2++) {
            var gridsOnBeltArr = beltArr[_i2].getElementsByClassName('drinks-grid'); // belt styling


            beltArr[_i2].classList.add('belt-slider');

            beltArr[_i2].style.width = 100 * gridsOnBeltArr.length + '%';
            if (_i2 === 0) beltArr[_i2].classList.add('belt-slider-absolute'); // set grid width

            for (var _j3 = 0, arrLength = gridsOnBeltArr.length; _j3 < arrLength; _j3++) {
              var width = 100 / arrLength;
              gridsOnBeltArr[_j3].style.width = width + '%';
              gridsOnBeltArr[_j3].style.marginBottom = '0';
              gridsOnBeltArr[_j3].style.border = '1px solid transparent';
            }
          } // no grid OR vp < 900

        } else {
          var _loop2 = function _loop2(_i3, _j4) {
            beltArr[_i3].style.width = '100%';

            beltArr[_i3].classList.remove('belt-slider'); // set belts to absolute w/delay to prevent page jump on load


            window.setTimeout(function () {
              beltArr[_i3].style.position = 'absolute';
            }, 100);
          };

          for (var _i3 = 0, _j4 = beltArr.length; _i3 < _j4; _i3++) {
            _loop2(_i3, _j4);
          }

          for (var _j5 = 0, _arrLength = drinksGridArr.length; _j5 < _arrLength; _j5++) {
            drinksGridArr[_j5].style.width = '100%';
          }
        }
      }; // End menuCss-func.


      menuCss();
      window.addEventListener('resize', menuCss);
    })();
  } // End if menu-section exists.

} // End set css for menu section.
// START BELT CONSTRUCTOR

var Belt = function Belt(belt) {
  this.belt = belt;
  this.clickCounter = 0;
  this.shiftCounter = 0;
  this.itemArr = this.belt.getElementsByClassName('drinks-grid');

  this.beltSlider = function (e) {
    if (this.itemArr.length > 1 && typeof document.createElement('div').style.grid !== 'undefined' && window.matchMedia('(min-width: 900px)').matches) {
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
          this.shiftCounter = this.clickCounter * this.clickTargetWidth; // shift belt right

          this.belt.style.transform = "translateX(".concat(this.shiftCounter, "px)");
        }
      } else {
        // clicked right
        if (this.xCoordInClickTarget > 0) {
          if (this.beltRemainder > this.clickTargetWidth + 10) {
            this.clickCounter -= 1;
            this.shiftCounter = this.clickCounter * this.clickTargetWidth; // shift belt left

            this.belt.style.transform = "translateX(".concat(this.shiftCounter, "px)");
          }
        }
      } // end clicked left/right

    } // end if

  }; // end beltSlider-func


  this.adjustXpositionOfBeltOnResize = function () {
    if (window.matchMedia('(min-width: 900px)').matches) {
      this.beltComputed = window.getComputedStyle(this.belt);
      this.beltWidth = parseInt(this.beltComputed.width);
      this.itemWidth = this.beltWidth / this.itemArr.length; // depends on how many item on belt

      this.belt.classList.remove('js-belt-transition');
      this.shiftCounter = this.clickCounter * this.itemWidth;
      this.belt.style.transform = "translateX(".concat(this.shiftCounter, "px)");
    } else belt.style.transform = "translateX(0)";
  }; // end adjustXpositionOfBeltOnResize-func

}; // End belt-constructor.
// START ALCOHOL OPTIONS MARKER & ADD/REMOVE ACTIVE BELT FLAG & SET WINDOW HEIGHT === ACTIVE BELT HEIGHT.
// note: the XXX indicates the belt-logic (showing/hiding belt && adding/removing click-handler to belt)


if (typeof document.getElementsByClassName('js-alcohol-headings')[0] !== 'undefined') {
  var optionsContainer = document.getElementsByClassName('js-alcohol-headings')[0],
      optionsArr = optionsContainer.getElementsByTagName('h4'),
      // # of options
  beltArr = document.getElementsByClassName('belt'),
      // # of belts (same amount as # of options)
  _sliderWindow3 = document.getElementsByClassName('window')[0],
      belt1 = beltArr[0],
      belt2 = beltArr[1],
      myBelt1 = new Belt(belt1),
      myBelt2 = new Belt(belt2),
      callBelt1 = function callBelt1(e) {
    myBelt1.beltSlider(e);
  },
      callBelt2 = function callBelt2(e) {
    myBelt2.beltSlider(e);
  },
      callBeltArr = [callBelt1, callBelt2]; // does 3 things: 1) mark alcohol option, 2) switch belt, 3) set window height to belt height


  var optionsSetup = function optionsSetup(e) {
    // note: beltSwitcher parts marked with XXX
    var target = e.target; // if target doesn't have selected-class AND target is an actual option

    if (!target.classList.contains('js-selected') && optionsContainer.contains(target) && target.tagName === 'H4') {
      var _loop3 = function _loop3(_i4) {
        // if option has selected-class
        if (optionsArr[_i4].classList.contains('js-selected')) {
          // remove selected-class
          optionsArr[_i4].classList.remove('js-selected'); // XXX add js-hide-v2


          beltArr[_i4].classList.add('js-hide-v2');

          _sliderWindow3.removeEventListener('click', callBeltArr[_i4]);
        } // XXX if clicked item same as current optionsArr-item in loop, then give corresponding beltArr-item 'js-belt-show'-class


        if (target === optionsArr[_i4]) {
          // remove js-hide-v2 from belt
          beltArr[_i4].classList.remove('js-hide-v2');

          _sliderWindow3.addEventListener('click', callBeltArr[_i4]); // set window-height === current-belt-height


          setWindowHeight(beltArr[_i4]);
          window.addEventListener('resize', function () {
            setWindowHeight(beltArr[_i4]);
          });
        } // add selected class to target


        target.classList.add('js-selected');
      };

      // TODO: verify that 2nd condition works
      // loop over all options
      for (var _i4 = 0; _i4 < optionsArr.length; _i4++) {
        _loop3(_i4);
      }
    }
  }; // End optionsSetup-function.


  var setWindowHeight = function setWindowHeight(belt) {
    belt.classList.remove('js-belt-transition'); // TODO: check if needed

    window.setTimeout(function () {
      var testimContComputed = window.getComputedStyle(belt);
      var beltHeight = parseInt(testimContComputed.height);
      _sliderWindow3.style.height = beltHeight + 'px';
    }, 10);
  }; // End setWindowHeight-function.


  if (typeof optionsContainer !== 'undefined') {
    optionsArr[0].classList.add('js-selected'); // 1st option selected on load
    // on load: hide all belts except 1st belt

    for (var _i5 = 1, _j6 = beltArr.length; _i5 < _j6; _i5++) {
      beltArr[_i5].classList.add('js-hide-v2');
    }

    _sliderWindow3.addEventListener('click', callBeltArr[0]); // XXX 1st belt gets click-handler on load


    optionsContainer.addEventListener('click', function (e) {
      optionsSetup(e);
    }); // on load: set window-height to 1st belt height. also w/timeout for vp > 900. to prevent slightly off window height when reloading. used to occur around vp 948px.

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
    });
  }
} // End alcohol options marker & add/remove active belt flag & set window height === active belt height.
// START NAV-ARROW LOGIC FOR MENU SECTION


{
  // if testimonial section exists
  if (typeof document.getElementsByClassName('menu-section')[0] !== 'undefined') {
    var _sliderWindow4 = document.getElementsByClassName('window')[0];

    var _beltArr = document.getElementsByClassName('belt');

    var _optionsContainer = document.getElementsByClassName('js-alcohol-headings')[0]; // helper function.

    var activeBeltHasMoreThan2Items = function activeBeltHasMoreThan2Items() {
      for (var _i6 = 0, _j7 = _beltArr.length; _i6 < _j7; _i6++) {
        if (!_beltArr[_i6].classList.contains('js-hide-v2')) {
          // active belt
          var gridArr = _beltArr[_i6].getElementsByClassName('drinks-grid');

          return gridArr.length >= 2;
        }
      }
    };

    var _navArrows = function _navArrows() {
      // if browser supports grid && vp > 900 && active belt has more than 2 items on it
      if (typeof document.createElement('div').style.grid !== 'undefined' && window.matchMedia('(min-width: 900px)').matches && activeBeltHasMoreThan2Items() === true) {
        // function displaying left right arrows on hover
        var showNavArrows = function showNavArrows(e) {
          var clickTarget = e.currentTarget;
          var clickTargetWidth = clickTarget.offsetWidth;
          var xCoordInClickTarget = e.clientX - clickTarget.getBoundingClientRect().left;

          if (clickTargetWidth / 2 > xCoordInClickTarget && xCoordInClickTarget > 0) {
            // note: self addition: "&& xCoordInClickTarget > 0", if omitted there may be a little glitch on very right edge of element
            // clicked left
            clickTarget.classList.remove('js-arrow-next');
            clickTarget.classList.add('js-arrow-back');
          } else if (xCoordInClickTarget > 0) {
            // clicked right
            clickTarget.classList.remove('js-arrow-back');
            clickTarget.classList.add('js-arrow-next');
          } else {
            // clickTarget.style.cursor = 'auto';
            clickTarget.classList.remove('js-arrow-back');
            clickTarget.classList.remove('js-arrow-next');
          }
        };

        _sliderWindow4.addEventListener('mousemove', function (e) {
          showNavArrows(e);
        });
      } else if (typeof document.createElement('div').style.grid === 'undefined' || window.matchMedia('(max-width: 900px)').matches || activeBeltHasMoreThan2Items() === false) {
        var _sliderWindow5 = document.getElementsByClassName('window')[0]; // function hiding left right arrows

        var hideNavArrows = function hideNavArrows(e) {
          var clickTarget = e.currentTarget;
          var clickTargetWidth = clickTarget.offsetWidth;
          var xCoordInClickTarget = e.clientX - clickTarget.getBoundingClientRect().left;

          if (clickTargetWidth / 2 > xCoordInClickTarget && xCoordInClickTarget > 0) {
            // note: self addition: "&& xCoordInClickTarget > 0", if omitted there may be a little glitch on very right edge of element
            // clicked left
            clickTarget.classList.remove('js-arrow-back');
            clickTarget.classList.remove('js-arrow-next');
          } else {
            // clicked right
            if (xCoordInClickTarget > 0) {
              // note: self addition: "&& xCoordInClickTarget > 0", if omitted there may be a little glitch on very right edge of element
              clickTarget.classList.remove('js-arrow-back');
              clickTarget.classList.remove('js-arrow-next');
            }
          }
        };

        _sliderWindow5.addEventListener('mousemove', function (e) {
          hideNavArrows(e);
        });
      } // End else-if.

    }; // End navArrows-function.


    _navArrows();

    window.addEventListener('resize', _navArrows);

    _optionsContainer.addEventListener('click', _navArrows);
  } // End if menu section exists.

} // End nav-arrow logic for menu section.
// START ANIMATE MENU SECTION.

{
  var para = new ElementAnimation(document.querySelector('.menu-section p'));
  var headings = new ElementAnimation(document.getElementsByClassName('js-alcohol-headings')[0]);
  var drinksWindow = new ElementAnimation(document.getElementsByClassName('window')[0]);
  var drinkBoxArr = document.getElementsByClassName('drink-box');

  var _animate2 = function _animate2() {
    if (para.isInViewport()) {
      para.delay(para.fullOpacity, 500);
      headings.delay(headings.fullOpacity, 500);
      drinksWindow.delay(drinksWindow.fullOpacity, 500);
    } else {
      for (var _i7 = 0, _j8 = drinkBoxArr.length; _i7 < _j8; _i7++) {
        if (isInViewport(drinkBoxArr[_i7])) {
          headings.fullOpacity();
          drinksWindow.fullOpacity();
        }
      }
    }
  };

  if (para.isNotUndefined()) {
    para.zeroOpacity();
    headings.zeroOpacity();
    drinksWindow.zeroOpacity();

    _animate2();

    window.addEventListener('scroll', _animate2);
  }
} // End animate menu section.
// START ANIMATE FAQ PAGE.

{
  var introSection = new ElementAnimation(document.querySelector('.intro-section-faq'));

  var _h2 = new ElementAnimation(document.querySelector('.intro-section-faq h2'));

  var heroSection = new ElementAnimation(document.getElementsByClassName('hero-section-faq')[0]);
  var qaContainer = new ElementAnimation(document.getElementsByClassName('qa-container')[0]);
  var qaArr = document.getElementsByClassName('qa');

  var _animate3 = function _animate3() {
    if (_h2.isInViewport()) introSection.fullOpacity();
    if (heroSection.isInViewport() || _h2.isInViewport()) heroSection.fullOpacity();

    for (var _i8 = 0, _j9 = qaArr.length; _i8 < _j9; _i8++) {
      if (isInViewport(qaArr[_i8])) qaContainer.fullOpacity();
    }
  };

  if (introSection.isNotUndefined()) {
    introSection.zeroOpacity();
    heroSection.zeroOpacity();
    qaContainer.zeroOpacity();

    _animate3();

    window.addEventListener('scroll', _animate3);
  }
} // End animate faq page.
// START ANIMATE CONTACE PAGE.

{
  var _h3 = new ElementAnimation(document.querySelector('.contact-info-wrap h2'));

  var emailSection = new ElementAnimation(document.getElementsByClassName('email-section')[0]);
  var phoneSection = new ElementAnimation(document.getElementsByClassName('phone-section')[0]);
  var contactSection = new ElementAnimation(document.querySelector('.contact-section'));
  var elems = [_h3, emailSection, phoneSection];

  var _animate4 = function _animate4() {
    var _iteratorNormalCompletion12 = true;
    var _didIteratorError12 = false;
    var _iteratorError12 = undefined;

    try {
      for (var _iterator12 = elems[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
        var _elem4 = _step12.value;

        _elem4.animateIfInView();
      }
    } catch (err) {
      _didIteratorError12 = true;
      _iteratorError12 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion12 && _iterator12["return"] != null) {
          _iterator12["return"]();
        }
      } finally {
        if (_didIteratorError12) {
          throw _iteratorError12;
        }
      }
    }
  };

  if (contactSection.isNotUndefined()) {
    var _iteratorNormalCompletion13 = true;
    var _didIteratorError13 = false;
    var _iteratorError13 = undefined;

    try {
      for (var _iterator13 = elems[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
        var _elem5 = _step13.value;

        _elem5.zeroOpacity();
      }
    } catch (err) {
      _didIteratorError13 = true;
      _iteratorError13 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion13 && _iterator13["return"] != null) {
          _iterator13["return"]();
        }
      } finally {
        if (_didIteratorError13) {
          throw _iteratorError13;
        }
      }
    }

    _animate4();

    window.addEventListener('scroll', _animate4);
  }
} // End animate contact page.
// UN-HIDE COCKTAIL-FINDER-SECTION ON LOAD

{
  var cocktailFinderSection = document.getElementsByClassName('cocktail-finder-section')[0];
  if (typeof cocktailFinderSection !== 'undefined') cocktailFinderSection.classList.remove('hide');
} // START COCKTAIL-FINDER LOGIC.
// ***************************

{
  // Constructor setting and getting ajax return object.
  var InputOutput = function InputOutput() {
    var inputs; //This will contain key-value pairs.

    this.setResponseObject = function (obj) {
      inputs = obj;
    };

    this.getResponseObject = function () {
      return inputs;
    };
  }; // Prevent default.
  // Hides drinks-details-container.
  // Establishes connection to server. 
  // Converts JSON response into an object.
  // Passes response-object and ingredient to processDrinks-function for processing.
  // Sets ajax-return-object in inputOutput, so it can be accessed by other functions.


  var getDrinks = function getDrinks(e) {
    e.preventDefault(); // hide drinks details-container

    document.getElementsByClassName('beverage-details-container')[0].classList.remove('js-end-show');
    var ingredient = document.getElementsByClassName('ingredient-input')[0].value,
        inputErrorDiv = document.getElementsByClassName('error-message-input')[0],
        serverErrorDiv = document.getElementsByClassName('error-message-server')[0],
        drinksDiv = document.getElementsByClassName('drinks-slide')[0];
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + ingredient, true);

    xhr.onload = function () {
      // hide error-messages
      inputErrorDiv.classList.add('hide');
      serverErrorDiv.classList.add('hide');

      if (this.readyState == 4 && this.status == 200) {
        // if user typed in correct search term
        if (this.responseText !== '') {
          // get JSON response and turn into an object
          var drinksObj = JSON.parse(this.responseText); // set response object, so other functions can access it

          inputOutput.setResponseObject(drinksObj); // call processDrinks-function with object as para

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
  } // new-up inputOutput object


  var inputOutput = new InputOutput(); // Animates drinks-list-container into view.
  // Removes activated-flag from beverage-details-container.
  // Calls printHeading- and counter-function.

  var processDrinks = function processDrinks(drinksObj, ingredient) {
    var beverageListContainer = document.getElementsByClassName('beverage-list-container')[0]; // animate drinks-list-container into view

    if (!beverageListContainer.classList.contains('js-start-hide')) {
      beverageListContainer.classList.add('js-start-hide');
      beverageListContainer.classList.remove('hide-beverage-container');
      window.setTimeout(function () {
        beverageListContainer.classList.add('js-end-show');
      }, 10);
    } // remove activated class from margin-container for beverage section
    // part of logic, that helps fade drinks details when a new drink is selected


    document.querySelector('.beverage-details-container .card-margin-container').classList.remove('activated');
    printHeading(ingredient);
    counter(5, 1);
  }; // end processDrinks-function
  // Converts users search input into first capital word, then prints it.


  var printHeading = function printHeading(ingredient) {
    var drinksListHeading = document.querySelector('.heading-container h3'),
        smallCapIngredient = ingredient.toLowerCase(),
        firstCapIngredient = smallCapIngredient.charAt(0).toUpperCase() + smallCapIngredient.slice(1);
    drinksListHeading.textContent = "".concat(firstCapIngredient, " Beverages");
  };

  var _i9 = -5,
      _j10 = -1,
      prev = document.getElementsByClassName('btn_back')[0],
      next = document.getElementsByClassName('btn_forward')[0]; // Increments (next arrow) or decrements (previous arrow) or doesn't change counter, or resets counter if a new search was issued.
  // Shows/hides next & previous arrows.
  // Calls printList-function.


  var counter = function counter(upDown) {
    var reset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var drinksObj = inputOutput.getResponseObject(),
        drinksArr = drinksObj['drinks'];

    if (reset === 1) {
      _i9 = -5;
      _j10 = -1;
    }

    _i9 += upDown;
    _j10 += upDown; // if i <= 0, hide previous button, else show it.

    _i9 <= 0 ? prev.classList.add('js-hide-v2') : prev.classList.remove('js-hide-v2'); // if j >= number of drinks, hide next button, else show it.

    _j10 >= drinksArr.length - 1 ? next.classList.add('js-hide-v2') : next.classList.remove('js-hide-v2');
    printList(_i9, _j10);
  };

  next.addEventListener('click', function () {
    counter(5);
  });
  prev.addEventListener('click', function () {
    counter(-5);
  }); // Removes previous ul.
  // Loops over 5 items. If item exist, print it.

  var printList = function printList(i, j) {
    var drinksObj = inputOutput.getResponseObject(),
        drinksArr = drinksObj['drinks'],
        drinksDiv = document.getElementsByClassName('drinks-slide')[0]; // if ul exists, remove it

    if (drinksDiv.contains(drinksDiv.getElementsByTagName('ul')[0])) drinksDiv.removeChild(drinksDiv.getElementsByTagName('ul')[0]); // create ul

    var ul = document.createElement('ul'); // runs from 0 to 4

    var liCounter = 0; // TODO: liCounter needed?

    for (i; i <= j; i++) {
      if (typeof drinksArr[i] !== 'undefined') {
        // create li elem
        var li = document.createElement('li'); // add text content to li

        li.textContent = drinksArr[i]['strDrink']; // append li to ul

        ul.appendChild(li);
      }

      liCounter += 1;
    } // end for-loop
    // append ul to drinks-list-div


    drinksDiv.appendChild(ul);
  }; // end printList-function
  // Gets matching drink name, then calls next function.


  var getDrinkName = function getDrinkName(e) {
    var clickedElem = e.target;

    if (clickedElem.tagName === 'LI') {
      // get clicked li-elems text-content
      var strDrink = clickedElem.textContent;
      var marginContainerBeverageDetails = document.querySelector('.beverage-details-container .card-margin-container'); // if a new ingredient search is triggered 

      if (!marginContainerBeverageDetails.classList.contains('activated')) {
        // make ajax call right away
        getDrinkDetails(strDrink);
        marginContainerBeverageDetails.classList.add('activated'); // make ajax call after current drinks-details are faded-out
      } else {
        // fade out drinks-details
        marginContainerBeverageDetails.classList.add('quick-fader-hide');
        marginContainerBeverageDetails.classList.remove('quick-fader-show'); // then call getDrinkDetails-func w/ delay (delay equal css transition time .1s)

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
  } // Makes ajax call, returns object with details about one drink.
  // Calls displayDrinkDetails with return-object as parameter.


  var getDrinkDetails = function getDrinkDetails(drinkName) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + drinkName, true);

    xhr.onload = function () {
      if (this.readyState == 4 && this.status == 200) {
        // get JSON response and turn into an object
        var drinkObj = JSON.parse(this.responseText); // call displayDrinkDetails-function with object as para

        displayDrinkDetails(drinkObj);
      }
    }; // end onload


    xhr.send();
  }; // Displays drink name, image, ingredients, amounts, instructions.


  var displayDrinkDetails = function displayDrinkDetails(obj) {
    var drinksDetailsDiv = document.getElementsByClassName('beverage-details-container')[0],
        h3 = drinksDetailsDiv.getElementsByTagName('h3')[0],
        // imgElem = drinksDetailsDiv.getElementsByTagName('img')[0],
    p = drinksDetailsDiv.getElementsByTagName('p')[0],
        ul = document.createElement('ul'),
        ingredientsListWrap = document.getElementsByClassName('ingredients-list-wrap')[0],
        marginContainer = document.getElementsByClassName('js-margin-container-beverages')[0],
        beverageImageWrap = document.getElementsByClassName('beverage-image-wrap')[0]; // animate margin-container width & beverage-details-container

    if (!marginContainer.classList.contains('js-max-width')) {
      marginContainer.classList.add('js-max-width');
      drinksDetailsDiv.classList.add('js-start-hide');
      drinksDetailsDiv.classList.remove('hide-beverage-container'); // if vp > 900 add a delay to fade-in

      if (window.matchMedia('(min-width: 900px)').matches) {
        window.setTimeout(function () {
          drinksDetailsDiv.classList.add('js-end-show');
        }, 400);
      } else {
        window.setTimeout(function () {
          drinksDetailsDiv.classList.add('js-end-show');
        }, 10);
      }
    } else drinksDetailsDiv.classList.add('js-end-show'); // extract drink object


    var drinkObject = obj['drinks'][0]; // get drink name

    var name = drinkObject['strDrink']; // get drink image

    var imgSrc = drinkObject['strDrinkThumb']; // get ingredients and amounts.
    // two dimensional array. holds ingredients and amount for each drink.

    var ingredientsArr = [];
    var maxIngredients = 16;

    for (var _i10 = 1; _i10 < maxIngredients; _i10++) {
      // if ingredient not null AND not empty string
      if (drinkObject['strIngredient' + _i10] !== null && drinkObject['strIngredient' + _i10] !== '') {
        // array to hold ingredient & amount for one drink.
        var ingredientAndAmountArr = []; // add ingredient and amount to array.

        ingredientAndAmountArr.push(drinkObject['strIngredient' + _i10]);
        ingredientAndAmountArr.push(drinkObject['strMeasure' + _i10]); // add array for one drink to array holding all drinks

        ingredientsArr.push(ingredientAndAmountArr);
      } else break;
    } // console.log(ingredientsArr[0][0]);   -- ingredient
    // console.log(ingredientsArr[0][1]);   -- amount
    // get directions


    var directions = drinkObject['strInstructions']; // if ul exists, remove it

    if (ingredientsListWrap.contains(ingredientsListWrap.getElementsByTagName('ul')[0])) ingredientsListWrap.removeChild(ingredientsListWrap.getElementsByTagName('ul')[0]); // display name, image, ingredients, amounts, directions
    // if img exists, update it's source

    if (beverageImageWrap.contains(beverageImageWrap.getElementsByTagName('img')[0])) {
      beverageImageWrap.getElementsByTagName('img')[0].src = imgSrc; // if no img exists yet, new-up one, attach source and attach to dom
    } else {
      var imgElem = new Image();
      imgElem.src = imgSrc;
      beverageImageWrap.appendChild(imgElem);
    }

    h3.textContent = name;
    ingredientsArr.forEach(function (ingredient) {
      var li = document.createElement('li');
      li.textContent = "".concat(ingredient[0]); // 0 represents ingredient; 1 represents amount
      // add amounts if they're not null or empty string

      if (ingredient[1] !== null && ingredient[1] !== '') li.textContent += " --- ".concat(ingredient[1]);
      ul.appendChild(li);
      ingredientsListWrap.appendChild(ul);
    });
    p.textContent = directions; // fade-in wrapper div w/ delay

    window.setTimeout(function () {
      document.querySelector('.beverage-details-container .card-margin-container').classList.add('quick-fader-show');
      document.querySelector('.beverage-details-container .card-margin-container').classList.remove('quick-fader-hide');
    }, 600);
  }; // End displayDrinkDetails-function.

} // End cocktail-finder logic.
// ***************************
// START ANIMATE COCKTAIL-FINDER HEADING AND PARAGRAPH.

{
  var _cocktailFinderSection = new ElementAnimation(document.querySelector('.cocktail-finder-section'));

  var _h4 = new ElementAnimation(document.querySelector('.cocktail-finder-search-container h2'));

  var _p = new ElementAnimation(document.querySelector('.cocktail-finder-search-container p'));

  var _animate5 = function _animate5() {
    _h4.animateIfInView();

    _p.animateIfInView();
  };

  if (_cocktailFinderSection.isNotUndefined()) {
    _h4.zeroOpacity();

    _p.zeroOpacity();

    _animate5();

    window.addEventListener('scroll', _animate5);
  }
} // End animate cocktail-finder heading and paragraph.