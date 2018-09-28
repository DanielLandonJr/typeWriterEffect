class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    // what word in the array are we on?
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    // is the word being deleted?
    this.isDeleting = false;
  }

  type() {
    // current word index
    const current = this.wordIndex % this.words.length;
    // get the current wrod
    const fullText = this.words[current];

    // check if word is being deleted
    if (this.isDeleting) {
      // remove a character
      this.txt = fullText.substring(0, this.txt.length - 1);
    } else {
      // add a character
      this.txt = fullText.substring(0, this.txt.length + 1);
    }

    this.txtElement.innerHTML = `<span class='txt'>${this.txt}</span>`;

    // type speed...faster when deleteing, wait at end
    // initial speed for normal typing
    let typeSpeed = 400;

    if (this.isDeleting) {
      // make it go faster
      typeSpeed /= 2;
    }

    // we are not deleting and the full word has been output to html
    if (!this.isDeleting && this.txt === fullText) {
      // we want to pause for the wait time
      typeSpeed = this.wait;
      // ready to delete word
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      // we are now deleting and the word has been removed from the html

      // we are no longer deleting
      this.isDeleting = false;

      // move to next word
      this.wordIndex++;

      // pause for a moment before we start typing again
      typeSpeed = 500;
    }

    setTimeout(() => {
      this.type();
    }, typeSpeed);
  }
}

// initialize the module once dom is loaded
document.addEventListener('DOMContentLoaded', () => {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');

  // initialize the TypeWriter item
  new TypeWriter(txtElement, words, wait);
});
