cd ..
rm -rf html-temp
cp -r html/ html-temp/
cd html-temp
rm -rf .git
find . -type f -iname '*loesung*' -delete
git init
git remote add origin git@github.com:SimonKlausLudwig/base.git
git branch -M main
git add -a
git commit -m "push"
git push -u origin main