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

dev_start: server watch fake-github
.PHONY: dev_start

dev:
	make -j dev_start
.PHONY: dev
