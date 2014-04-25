MOCHA  			= ./node_modules/.bin/mocha
SUPERVISOR	= ./node_modules/.bin/supervisor

MOCHA_FLAGS = \
	--harmony							\
	--reporter spec

SUPERVISOR_FLAGS = 			\
	--harmony         		\
	--watch etc,lib				\
	--extensions js,json	\
	--no-restart-on error

boot:
	$(SUPERVISOR) $(SUPERVISOR_FLAGS) lib

test:
	NODE_ENV=test $(MOCHA) $(MOCHA_FLAGS) test

.PHONY: test
