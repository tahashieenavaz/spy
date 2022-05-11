function addClass(target, classToAdd) {
  if (!type(target, 'element', true)) {
    target = $(target);
  }

  if (target.classList.contains(classToAdd)) {
    return false;
  }

  target.classList.add(classToAdd);

  return true;
}
function removeClass(target, classToRemove) {
  if (!type(target, 'element', true)) {
    target = $(target);
  }

  if (!target.classList.contains(classToRemove)) {
    return false;
  }

  target.classList.remove(classToRemove);

  return true;
}
/**
 * a utility functions which helps me to implicitly check the type for
 * javascript variables and do not load Typescript for some minor checks.
 * @param {*} variable
 * @param {*} type
 * @returns {boolean}
 */
function type(variable, providedType = 'string', bool = false) {
  const panic = () => {
    if (bool) return false;

    const errorMessage =
      "Type of variable doesn't match corresponding criteria!";
    throw new Error(errorMessage);
  };

  if (providedType == 'element') {
    if (variable instanceof Element || variable instanceof HTMLElement) {
      return true;
    } else return panic();
  }

  if (providedType == typeof variable) {
    return true;
  }

  return panic();
}
/**
 * Used to hide a page via its specific id in DOM.
 * @param {string} target
 * @returns {boolean} Returns false if page hiding is not successful, and exact
 * opposite for the vice versa.
 */
function hidePage(target) {
  if (target === 'current') {
    removeClass(`section.active`, 'active');
    return true;
  }

  if (removeClass(`#${target}.active`, 'active')) {
    return true;
  }

  return false;
}

/**
 * Used to show a page via its specific id in DOM.
 * @param {string} target
 * @returns {boolean} Returns false if page showing is not successful, and exact
 * opposite for the vice versa.
 */
function showPage(target) {
  if (addClass(`section#${target}`, 'active')) {
    return true;
  }
  return false;
}

/**
 * A helper to hide current page and show a target page.
 * @param {string} target
 * @returns {void}
 */
function page(target) {
  hidePage('current');
  showPage(target);
}

/**
 * Fisher–Yates shuffle algorithm, implementation in Javascript.
 * @param {Array} originalArray
 * @returns {Array} a shuffled array via Fisher–Yates algorithm.
 */
function shuffleArray(originalArray) {
  const { random } = Math;
  let currentIndex = originalArray.length;
  let randomIndex = null;

  while (currentIndex > 0) {
    randomIndex = ~~(random() * originalArray.length);
    currentIndex--;
    [originalArray[currentIndex], originalArray[randomIndex]] = [
      originalArray[randomIndex],
      originalArray[currentIndex],
    ];
  }

  return originalArray;
}

function empty(target) {
  if (!type(target, 'element', true)) {
    target = $(target);
  }

  while (target.firstChild) {
    target.removeChild(target.firstChild);
  }
}
