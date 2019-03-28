module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
	"no-console": 0,
	"eqeqeq": "error",
	"no-trailing-spaces": "error",
	"object-curly-spacing": [
	   "error", "always"
	],
	"arrow-spacing": [
	   "error", { "before": true, "after": true }
	],
	"indent": [
	   "error", 
	   2
	],
	"linebreak-style": [
	   "error",
	   "unix"
	],
	"quotes": [
	   "error",
	   "single"
	],
	"semi": [
	   "error",
	   "never"
	]
    }
};
