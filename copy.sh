cd ..
rm -rf html-temp
mkdir html-temp
cd html-temp
git init
git remote add origin git@github.com:SimonKlausLudwig/base.git
git branch -M main
git pull origin main

cp -r ../html/* ./
cd html-temp
rm -rf .git
find . -type f -iname '*loesung*' -delete
git init
git remote add origin git@github.com:SimonKlausLudwig/base.git
git add -A
git commit -m "push"
git branch -M main
git push -u origin main