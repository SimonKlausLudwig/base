cd ..
rm -rf html-temp
mkdir html-temp
cd html-temp
git init
git remote add origin git@github.com:SimonKlausLudwig/base.git
git branch -M main
git pull origin main

rsync -rv --exclude=.git ../html/. ./
find . -type f -iname '*loesung*' -delete
git add -A
git commit -m "push"
git push -u origin main