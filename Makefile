# http://makefiletutorial.com/

build: node_modules
	npm run webpack -- --progress --colors
.PHONY: build

watch: node_modules
	npm run webpack -- --progress --colors --watch
.PHONY: watch

server:
	npm run http-server . -- -p 9999
.PHONY: server

fake-github:
	npm run json-server -- gh-repo.js --watch gh-repo.js --port 9998
.PHONY: fake-github

api-dev:
	npm run nodemon api/server.js
.PHONY: api

api:
	node api/server.js
.PHONY: api

build-css:
	npm run postcss -- --use postcss-cssnext --postcss-cssnext.browsers "last 2 versions" --use postcss-import -o style.css src/app.css
.PHONY: build-css

watch-css:
	npm run postcss -- --use postcss-cssnext --postcss-cssnext.browsers "last 2 versions" --use postcss-import --watch -o style.css src/app.css
.PHONY: watch-css

test-e2e:
	npm run mocha -- test -g ^E2E:\ .*$
.PHONY: test-e2e

test-unit:
	npm run mocha -- test -g ^UNIT:\ .*$
.PHONY: test-e2e

dev_start: server watch watch-css api-dev
.PHONY: dev_start

dev:
	make -j dev_start
.PHONY: dev
