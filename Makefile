SHELL := /bin/bash
PATH  := node_modules/.bin:$(PATH)

BOOT_FLAGS = --harmony \
	     --watch etc,lib \
	     --extensions js,json \
	     --no-restart-on error

TEST_FLAGS = --harmony \
	     --reporter spec

boot: export NODE_ENV=development
boot:
	@supervisor $(BOOT_FLAGS) lib

test: test-models test-routes

test-routes: export NODE_ENV=test
test-routes:
	@mocha $(TEST_FLAGS) test/routes

test-models: export NODE_ENV=test
test-models:
	@mocha $(TEST_FLAGS) test/models

clean:
	@rm -rf node_modules

.PHONY: test clean
