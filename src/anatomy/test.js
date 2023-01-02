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

  it('assert that file contains base html', () => {
    expect(dom.window.document.documentElement.innerHTML.replaceAll(/\s/g,'')).toBe("<head></head><body><p>Hallo</p></body>");
  })
})