sudo apt-key adv --keyserver pgp.mit.edu --recv D101F7899D41F3C3
echo "deb http://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update -qq
sudo apt-get install -y -qq yarn
sleep 3
npm i -g npm@^3
npm install -g webpack
npm install -g webpack-dev-server
npm install -g karma-cli
npm install -g protractor
npm install -g typescript
