export default class Stylesheet {
  constructor() {
    this.stylesheet = document.createElement('style');
    this.stylesheet.appendChild(document.createTextNode(''));
    document.head.appendChild(this.stylesheet);

    this.embedded = true;

    let sheet = this.stylesheet.sheet;
    this.method = ('addRule' in sheet) ? 'addRule' : (('insertRule' in sheet) ? 'insertRule' : null);
  }

  addRule(selector, rules, index) {
    if (!this.embedded) { return; }

    if (this.method === 'addRule') {
      this.stylesheet.sheet.addRule(selector, rules, index);
    } else if (this.method === 'insertRule') {
      this.stylesheet.sheet.insertRule(`${selector} { ${rules} }`, index);
    }
  }

  remove() {
    if (this.embedded) {
      this.embedded = false;
      document.head.removeChild(this.stylesheet);
    }
  }
}
