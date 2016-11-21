# Jira Goggles
Jira Goggles project - client.
##Quickstart
###Before start:

```text
npm install -g webpack
npm install -g webpack-dev-server
npm install -g karma-cli
npm install -g protractor
npm install -g typescript
```
###Clone with:
```sh
git clone https://github.com/JiraGoggles/jiragoggles-frontend.git
```

###After cloning type in console:
```r
npm install
npm run server:dev:hmr
```
Enjoy, at `http://localhost:3000/` and api `http://localhost:4000/` (change dev api url at `{project_root}/src/app/environment.ts`), build for backend with `npm run build:prod`.

###json-server
Przykładowe dane można sobie ogarnąć przez [json-server](https://www.npmjs.com/package/json-server).
Instalacja `npm install -g json-server`, następnie tworzymy sobie jakiś plik `db.json` (musi być jeden element jako root).
Odpalamy `json-server --watch db.json --port 4000` i mamy pod `http://localhost:4000/projects` naszego jsona.
