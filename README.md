# jiragoggles-frontend
Jira Goggles project frontend.
##Quickstart
After cloning type in console:
```console
npm install
npm run server:dev:hmr
```
Enjoy, at `http://localhost:3000/` and api `http://localhost:4000/` (change dev api url at `{project_root}/src/app/environment.ts`), build for backend with `npm run build:prod`.

###json-server
Przykładowe dane można sobie ogarnąć przez [json-server](https://www.npmjs.com/package/json-server)
Instalacja `npm install -g json-server`, następnie tworzymy sobie jakiś plik `db.json`, z treścią (musi być jeden element jako root):
```json
{
"projects":
	[{
		"self": "http://www.example.com/jira/rest/api/2/project/EX",
		"id": "10000",
		"key": "EX",
		"name": "Example",
		"description": "Super description of example project.",
		"avatarUrls": {
		    "48x48": "https://issues.folio.org/secure/projectavatar?avatarId=10324",
		    "24x24": "https://issues.folio.org/secure/projectavatar?avatarId=10324",
		    "16x16": "https://issues.folio.org/secure/projectavatar?avatarId=10324",
		    "32x32": "https://issues.folio.org/secure/projectavatar?avatarId=10324"
		},
		"projectCategory": {
		    "self": "http://www.example.com/jira/rest/api/2/projectCategory/10000",
		    "id": "10000",
		    "name": "FIRST",
		    "description": "First Project Category"
		}
	    },

	    {
		"self": "http://www.example.com/jira/rest/api/2/project/ABC",
		"id": "10001",
		"key": "ABC",
		"name": "Alphabetical",
		"description": "Super description of alphabetical project.",
		"avatarUrls": {
		    "48x48": "https://issues.folio.org/secure/projectavatar?size=small&pid=10303",
		    "24x24": "https://issues.folio.org/secure/projectavatar?size=small&pid=10303",
		    "16x16": "https://issues.folio.org/secure/projectavatar?size=small&pid=10303",
		    "32x32": "https://issues.folio.org/secure/projectavatar?size=small&pid=10303"
		},
		"projectCategory": {
		    "self": "http://www.example.com/jira/rest/api/2/projectCategory/10000",
		    "id": "10000",
		    "name": "FIRST",
		    "description": "First Project Category"
		}
	    }
	]
}
```
Odpalamy `json-server --watch db.json --port 4000` i mamy pod `http://localhost:4000/projects` naszego jsona.
