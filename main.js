import TypeWriter from './TypeWriter.js';

const Main = (() => {
  document.addEventListener('DOMContentLoaded', () => {
    Main.typeWriter();
  });

  // public methods
  return {
    init: () => {
      console.log('module loaded');
    },
    typeWriter: () => {
      // initial values for the TypeWriter

      // get hook to html element
      const txtElement = document.querySelector('.txt-type');
      // get the list of words for the element
      const words = JSON.parse(txtElement.getAttribute('data-words'));
      // get the wait time from the element
      const wait = txtElement.getAttribute('data-wait');

      // initialize the TypeWriter item
      new TypeWriter(txtElement, words, wait);
    }
  };
})();

Main.init();
