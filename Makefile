MOCHA  			= ./node_modules/.bin/mocha
SUPERVISOR	= ./node_modules/.bin/supervisor

MOCHA_FLAGS = \
	--reporter spec

SUPERVISOR_FLAGS = 			\
	--harmony         		\
	--watch etc,lib				\
	--extensions js,json	\
	--no-restart-on exit

boot:
	$(SUPERVISOR) $(SUPERVISOR_FLAGS) lib

test:
	$(MOCHA) $(MOCHA_FLAGS) opt

.PHONY: test
