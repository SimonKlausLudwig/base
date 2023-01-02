import '@testing-library/jest-dom/extend-expect'
import fs from 'fs'
import { JSDOM } from 'jsdom'
import path from 'path'

const loesung = fs.readFileSync(path.resolve(__dirname, './loesung.html'), 'utf8');
const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

let dom
let container

describe('index.html', () => {
  beforeEach(() => {
    dom = new JSDOM(loesung || html, { runScripts: 'dangerously' })
    container = dom.window.document.body
  })

  it('renders a heading element', () => {
    expect(container.querySelector('div:nth-of-type(1) h2').innerHTML).toBe("Unterüberschrift");
    expect(container.querySelector('div:nth-of-type(1) h3').innerHTML).toBe("Eins");

    expect(container.querySelector('div:nth-of-type(2) h2').innerHTML).toBe("Unterüberschrift 2");
    expect(container.querySelector('div:nth-of-type(2) h3').innerHTML).toBe("Drei");
    expect(container.querySelector('div:nth-of-type(2) h4').innerHTML).toBe("Vier");
  })
})