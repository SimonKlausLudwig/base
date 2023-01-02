import '@testing-library/jest-dom/extend-expect';
import { getLoesungOrOther } from '../../utils';
var css = require('css');
const html = getLoesungOrOther('./loesung.css', './style.css', __dirname);

describe('index.html', () => {

  it('assert that id select exists', () => {
    var obj = css.parse(html, {});
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