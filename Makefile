SHELL := /bin/bash
PATH  := node_modules/.bin:$(PATH)

boot:
	@supervisor			\
	  --harmony			\
	  --watch etc,lib		\
	  --extensions js,json		\
	  --no-restart-on error		\
	  	lib

test:
	NODE_ENV=test mocha 		\
	  --harmony 			\
	  --reporter spec		\
		test

clean:
	@rm -rf node_modules

.PHONY: test clean
