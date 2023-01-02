import '@testing-library/jest-dom/extend-expect';
import { JSDOM } from 'jsdom';
import { getLoesungOrOther } from '../../utils';
var css = require('css');
const html = getLoesungOrOther('./loesung.css', './style.css', __dirname);




describe('index.html', () => {

  it('assert that media selector exists', () => {
    var obj = css.parse(html, {});
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