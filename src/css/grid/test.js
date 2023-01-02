import '@testing-library/jest-dom/extend-expect';
var css = require('css');


import { getLoesungOrOther } from '../../utils';
var css = require('css');
const html = getLoesungOrOther('./loesung.css', './style.css', __dirname);

describe('index.html', () => {
  it('assert that class selector exists', () => {
    var obj = css.parse(html, {});
    css.stringify(obj, {});

    expect(obj.stylesheet.rules.length).toBe(4);
  
  })
})