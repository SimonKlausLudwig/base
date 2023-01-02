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

  it('assert that media selector exists', () => {
    var obj = css.parse(loesung || html, {});
    css.stringify(obj, {});

    expect(obj.stylesheet.rules.length).toBe(2);
    

    const headerDeclaration = obj.stylesheet.rules.filter(a => a.type.indexOf("media") !== -1)[0];
    expect(headerDeclaration.media).toBe("screen and (max-width: 480px)");
    expect(headerDeclaration.rules.length).toBe(1);
    expect(headerDeclaration.rules[0].declarations[0].property).toBe("display");
    expect(headerDeclaration.rules[0].declarations[0].value).toBe("block");

    expect(obj.stylesheet.rules[0].declarations.length).toBe(1);
    const colorProp = obj.stylesheet.rules[0].declarations.filter(dev => dev.property === "display")[0];
    expect(colorProp.value).toBe("none");

  })
})