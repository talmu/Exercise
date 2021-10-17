export function query(selector, scope) {
  if (scope === null) throw "query scope cannot be null";
  return (scope || document).querySelector(selector);
}

export function listen(target, type, callback, capture) {
  target.addEventListener(type, callback, !!capture);
}

/**
 * This function gets an element and add handler for it.
 * When we have a lot of elements handled in similiar way, then we will create a single handler for all of them,
 * and for each one we will submit the appropriate parameters.
 */

export function delegateEvent(target, selector, type, handler, capture) {
  const dispatchEvent = (event) => {
    const targetElement = event.target;
    const potentialElements = target.querySelectorAll(selector);
    let i = potentialElements.length;

    while (i--) {
      if (potentialElements[i] === targetElement) {
        handler.call(targetElement, event);
        break;
      }
    }
  };

  listen(target, type, dispatchEvent, !!capture);
}

export const escapeForHTML = (s) =>
  s.replace(/[&<]/g, (c) => (c === "&" ? "&amp;" : "&lt;"));
