For future reference I use `tsc --module amd` to compile the code into js, which is then loaded via requirejs.

tsc configuration is in `tsconfig.json`

requirejs configuration is in `index.html`

to generate dependency graph navigate to this directory and run `depcruise --exclude "^(node_modules|build|require)" --output-type dot . | dot -T svg > dependencygraph.svg`.