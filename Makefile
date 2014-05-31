SHELL := /bin/bash
PATH  := node_modules/.bin:$(PATH)

boot: export NODE_ENV=development
boot:
	@supervisor			\
	  --harmony			\
	  --watch etc,lib		\
	  --extensions js,json		\
	  --no-restart-on error		\
	  	lib

test: export NODE_ENV=test
test:
	@mocha				\
	  --harmony 			\
	  --reporter spec		\
		test

clean:
	@rm -rf node_modules

.PHONY: test clean
