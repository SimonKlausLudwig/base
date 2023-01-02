import '@testing-library/jest-dom/extend-expect'
import fs from 'fs'
import { JSDOM } from 'jsdom'
import path from 'path'

import { getLoesungOrOther } from '../utils';

const html = getLoesungOrOther('./loesung.html', './index.html', __dirname);

let dom
let container

describe('index.html', () => {
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously' })
    container = dom.window.document.body
  })

  it('renders a heading element', () => {
    expect(container.querySelector('h1').innerHTML).toBe("Überschrift");
    expect(container.querySelector('h2').innerHTML).toBe("Unterüberschrift");
    expect(container.querySelector('h3').innerHTML).toBe("Eins");
    expect(container.querySelector('h3:nth-of-type(2)').innerHTML).toBe("Zwei");
    expect(container.querySelector('h4').innerHTML).toBe("Vier");
  })
})