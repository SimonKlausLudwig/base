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

    expect(obj.stylesheet.rules.length).toBe(1); 
    expect(obj.stylesheet.rules[0].selectors.join("")).toBe("#i-am-a-id");

    expect(obj.stylesheet.rules[0].declarations.length).toBe(1);
    const colorProp = obj.stylesheet.rules[0].declarations.filter(dev => dev.property === "font-size")[0];
    expect(colorProp.value).toBe("15pt");
  })
})