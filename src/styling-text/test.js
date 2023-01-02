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

  it('renders a text with strong and em ', () => {
    expect(container.querySelector('p strong').innerHTML).toBe("The Nile River");
    expect(container.querySelector('p em').innerHTML).toBe("longest");
    expect(container.querySelector('p').textContent.replaceAll(/\s/g,'')).toBe("TheNileRiveristhelongestriverintheworld,measuringover6,850kilometerslong(approximately4,260miles).");
    
  })
})