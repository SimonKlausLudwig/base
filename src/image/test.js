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

  it('assert that image with src exists', () => {
    expect(container.querySelector('img').getAttribute("src")).toBe("https://videobakers.de/static/finance%20_%20bank,%20banking,%20savings,%20investment,%20piggy%20bank,%20money,%20financial-01-9a2ab24baf41ae1d4d34442c2da221b2.svg");
  })
})