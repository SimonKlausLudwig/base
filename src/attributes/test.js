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

  it('assert that h1 has attribute', () => {
    expect(container.querySelector('h1').getAttribute("lang")).toBe("de");
  })
})