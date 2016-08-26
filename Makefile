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

dev_start: server watch
.PHONY: dev_start

dev:
	make -j dev_start
.PHONY: dev
