SUPERVISOR = node_modules/.bin/supervisor

SUPERVISOR_FLAGS = \
		--watch etc,lib,node_modules \
		--extensions js,json

boot:
	$(SUPERVISOR) $(SUPERVISOR_FLAGS) lib

.PHONY: test
