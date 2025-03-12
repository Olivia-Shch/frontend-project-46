install:
	npm ci
	
gendiff:
	node gendiff.js
	
lint:
	npx eslint .

fix: 
	npx eslint --fix .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8