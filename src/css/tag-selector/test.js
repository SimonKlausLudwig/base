import '@testing-library/jest-dom/extend-expect';
import { JSDOM } from 'jsdom';
import { getLoesungOrOther } from '../../utils';
var css = require('css');
const html = getLoesungOrOther('./loesung.css', './style.css', __dirname);



describe('index.html', () => {


  it('assert that class selector exists', () => {
    var obj = css.parse(html, {});
    css.stringify(obj, {});

    expect(obj.stylesheet.rules.length).toBe(1);
    expect(obj.stylesheet.rules[0].selectors.join("")).toBe("p");

    expect(obj.stylesheet.rules[0].declarations.length).toBe(1);
    const colorProp = obj.stylesheet.rules[0].declarations.filter(dev => dev.property === "color")[0];
    expect(colorProp.value).toBe("red");

  })
})