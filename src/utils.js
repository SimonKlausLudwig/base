import fs from 'fs'
import path from 'path'

export const getLoesungOrOther = (loesung, defa, dir) => {
    try {
        console.log(dir);
        return fs.readFileSync(path.resolve(dir, loesung), 'utf8');
    } catch {
        return fs.readFileSync(path.resolve(dir, defa), 'utf8');;
    }
}