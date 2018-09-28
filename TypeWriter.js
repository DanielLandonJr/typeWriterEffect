export default class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement; // element from html
    this.words = words; // array of words
    this.txt = ''; // the value of the word as its being "typed"
    this.wordIndex = 0; // what word in the array are we on?
    this.wait = parseInt(wait, 10); // how long to wait at end of word
    this.isDeleting = false; // is the word currently being deleted
    this.type(); // magic happens
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

    // add word to html
    this.txtElement.innerHTML = `<span class='txt'>${this.txt}</span>`;

    // type speed...faster when deleteing, wait at end
    // initial speed for normal typing
    let typeSpeed = 400;

    if (this.isDeleting) {
      // make it go faster
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.txt === fullText) {
      // we are not deleting and the full word has been output to html

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

    // this is what cycles over and over again
    setTimeout(() => {
      this.type();
    }, typeSpeed);
  }
}
