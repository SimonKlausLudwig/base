import '@testing-library/jest-dom/extend-expect';
import { JSDOM } from 'jsdom';

import { getLoesungOrOther } from '../utils';

const html = getLoesungOrOther('./loesung.html', './index.html', __dirname);

let dom
let container

describe('index.html', () => {
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously' })
    container = dom.window.document.body
  })

  it('assert that h1 has attribute', () => {
    expect(container.querySelector('h1').getAttribute("lang")).toBe("de");
  })
})