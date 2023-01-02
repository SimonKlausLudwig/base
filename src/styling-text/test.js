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

  it('renders a text with strong and em ', () => {
    expect(container.querySelector('p strong').innerHTML).toBe("The Nile River");
    expect(container.querySelector('p em').innerHTML).toBe("longest");
    expect(container.querySelector('p').textContent.replaceAll(/\s/g,'')).toBe("TheNileRiveristhelongestriverintheworld,measuringover6,850kilometerslong(approximately4,260miles).");
    
  })
})