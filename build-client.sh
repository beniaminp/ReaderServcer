cd ebook-client
npm install
ionic cordova platform rm browser
ionic cordova platform add browser
ionic cordova build browser
rm -rf ../src/main/resources/public/*
cp -R platforms/browser/www/* ../src/main/resources/public/
