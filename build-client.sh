cd ebook-client
rm -rf src/app/app-settings.ts
mv src/app/app-settings-prod.ts src/app/app-settings.ts

npm install
ionic cordova platform rm browser
ionic cordova platform add browser
ionic cordova build browser
rm -rf ../src/main/resources/public/*
cp -R platforms/browser/www/* ../src/main/resources/public/
