TESTS = test/application

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--require should \
		--harmony-generators \
		$(TESTS) \
		--bail

.PHONY: test
