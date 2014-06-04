SHELL := /bin/bash
PATH  := node_modules/.bin:$(PATH)

BOOT_FLAGS = \
	--harmony \
	--watch etc,lib \
	--extensions js,json \
	--no-restart-on error

TEST_FLAGS = \
	--harmony \
	--reporter spec

boot: export NODE_EVN=development
boot:
	@supervisor $(BOOT_FLAGS) lib

test: export NODE_ENV=test
test: test-routes test-models

test-models: export NODE_ENV=test
test-models:
	@mocha $(TEST_FLAGS) test/models

test-routes: export NODE_ENV=test
test-routes:
	@mocha $(TEST_FLAGS) test/routes

clean:
	@rm -rf node_modules

.PHONY: test clean
