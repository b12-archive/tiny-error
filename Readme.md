[![Coveralls – test coverage
](https://img.shields.io/coveralls/studio-b12/tiny-error.svg?style=flat-square)
](https://coveralls.io/r/studio-b12/tiny-error)
 [![Travis – build status
](https://img.shields.io/travis/studio-b12/tiny-error/master.svg?style=flat-square)
](https://travis-ci.org/studio-b12/tiny-error)
 [![David – status of dependencies
](https://img.shields.io/david/studio-b12/tiny-error.svg?style=flat-square)
](https://david-dm.org/studio-b12/tiny-error)
 [![Code style: airbnb
](https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat-square)
](https://github.com/airbnb/javascript)
 [![Stability: unstable
](https://img.shields.io/badge/stability-unstable-yellowgreen.svg?style=flat-square)
](https://nodejs.org/api/documentation.html#documentation_stability_index)




tiny-error
==========

**Super-light error objects.**  
Inspired by *go*.

 

I’m no expert with *go*, but I have heard two things:

* *Go* has no heavy try/catch mechanism. We all know that try/catch in JS is [slowish](https://jsperf.com/try-catch-performance-overhead) – and you can [do well](http://stackoverflow.com/a/3217308/2816199) without it.
* *Go* has no heavy stack traces in errors. They also bring [overhead](http://jsperf.com/new-error-vs-custom-error-object) in JavaScript. And, if you ask me, I definitely prefer a readable error message than a stack trace with umpteen calls to dig through.

Since *go* programmers like it so, why not try lightweight errors in JavaScript?




Installation
------------

```sh
$ npm install tiny-error
```




Usage
-----

```js
const tinyError = require('tiny-error');

throw new Error('Something went wrong.');
//» Error: Something went wrong.
//»     at repl:…:…
//»     at …
//»     at …
//»     at …
//»     at …
//»     at …
//»     at …
//»     at …
//»     at …
//»     at …
//»     at …
//»     at …
//»     at …
//»     at …

throw tinyError('Something went wrong.');
//» Error: Something went wrong.
```


*tiny-error* is a maker function[*](#maker-function). It creates an object based on `Error.prototype`, but doesn’t invoke the `Error` constructor directly – thus saving us from creating a stack trace.

The function [curries][] passed options until it receives the option `message` or a string.

[curries]:  http://en.wikipedia.org/wiki/Currying

So these are equivalent:

```js
let error = tinyError({
  label: 'my library',
  myCustomCode: 707,
  message: 'something went wrong',
});

let identicalError = tinyError({
  label: 'my library',
  myCustomCode: 707,
})({
  message: 'something went wrong',
});

let identicalErrorAgain = tinyError({
  myCustomCode: 707,
})({
  label: 'my library',
})({
  'something went wrong'
});
```


<a                                                      id="maker-function"></a>
&ast;&emsp;*maker function* – a term I coined together for a function that creates an object. Not an instance of a specific class (that’s a *constructor*), not an instance of any class (*factory*). Just an object. If there is another word for that, great! Tell me in [an issue](https://github.com/studio-b12/tiny-error/issues/new) please.


*Work in progress…*




License
-------

[MIT][] © [Studio B12 GmbH][]

[MIT]: ./License.md
[Studio B12 GmbH]: http://studio-b12.de
