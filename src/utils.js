export const getLoesungOrOther = (loesung, defa) => {
    try {
        return fs.readFileSync(path.resolve(__dirname, loesung), 'utf8');
    } catch {
        return fs.readFileSync(path.resolve(__dirname, defa), 'utf8');;
    }
}