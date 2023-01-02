import '@testing-library/jest-dom/extend-expect'
import fs from 'fs'
import { JSDOM } from 'jsdom'
import path from 'path'
var css = require('css');


const loesung = fs.readFileSync(path.resolve(__dirname, './style.css'), 'utf8');
const html = fs.readFileSync(path.resolve(__dirname, './loesung.css'), 'utf8');


let dom
let container

describe('index.html', () => {
  beforeEach(() => {
    dom = new JSDOM(loesung || html, { runScripts: 'dangerously' })
    container = dom.window.document.body
  })

  it('assert that id select exists', () => {
    var obj = css.parse(loesung || html, {});
    css.stringify(obj, {});

    expect(obj.stylesheet.rules.length).toBe(2); 
    expect(obj.stylesheet.rules.map(rule => rule.selectors.join(""))).toContain(".header");
    expect(obj.stylesheet.rules.map(rule => rule.selectors.join(""))).toContain(".header-special");

    const headerDeclaration = obj.stylesheet.rules.filter(a => a.selectors.indexOf(".header") !== -1)[0].declarations;
    expect(headerDeclaration.length).toBe(1);
    expect(headerDeclaration[0].property).toBe("font-size");
    expect(headerDeclaration[0].value).toBe("30pt");

    const specialHeaderDeclaration = obj.stylesheet.rules.filter(a => a.selectors.indexOf(".header-special") !== -1)[0].declarations;
    expect(specialHeaderDeclaration.length).toBe(1);
    expect(specialHeaderDeclaration[0].property).toBe("font-style");
    expect(specialHeaderDeclaration[0].value).toBe("italic");
  })
})