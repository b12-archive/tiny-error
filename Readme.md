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

<p align="center"><a
  title="Graphic by the great Justin Mezzell"
  href="http://justinmezzell.tumblr.com/post/66281274442"
  >
  <img
    alt="lightweight"
    src="Readme/Lightweight.gif"
    width="400"
    height="300"
  />
</a></p>

I’m no expert with *go*, but I have heard two things:

* *Go* has no heavy try/catch mechanism. We all know that try/catch in JS is [slowish](https://jsperf.com/try-catch-performance-overhead) – and you can [do well](http://stackoverflow.com/a/3217308/2816199) without it.
* *Go* has no heavy stack traces in errors. They also bring [overhead](http://jsperf.com/new-error-vs-custom-error-object) in JavaScript. And, if you ask me, I definitely prefer a readable error message than a stack trace with umpteen calls to dig through.

Since *go* programmers like it so, why not try lightweight errors in JavaScript?




Installation
------------

```sh
$ npm install tiny-error
```




Demo
----

Native:

```js
throw new Error('Something went wrong.');
//» Error: Something went wrong.
//»     at repl:1:7
//»     at REPLServer.self.eval (repl.js:110:21)
//»     at repl.js:249:20
//»     at REPLServer.self.eval (repl.js:122:7)
//»     at Interface.<anonymous> (repl.js:239:12)
//»     at Interface.emit (events.js:95:17)
//»     at Interface._onLine (readline.js:203:10)
//»     at Interface._line (readline.js:532:8)
//»     at Interface._ttyWrite (readline.js:761:14)
//»     at ReadStream.onkeypress (readline.js:100:10)
```


Tiny:

```js
throw tinyError('Something went wrong.');
//» Error: Something went wrong.
```

Prefer to stay *tiny*? Then read on.




Usage
-----

*tiny-error* is a [maker function*](#maker-function). It creates a new object based on `Error.prototype`, but doesn’t invoke the `Error` constructor directly – thus saving us from creating a stack trace.

It’s a simple idea – so usage is simple:

```js
const tinyError = require('tiny-error');

tinyError('Oops!');
//» { [Error: Oops!] message: 'Oops!' }

tinyError({message: 'Oops!', myErrorCode: 7});
//» { [Error: Oops!] message: 'Oops!', myErrorCode: 7 }

throw tinyError('Oops!');
//» Error: Oops!            (Output depends on how your engine presents errors.)
```


There is still power behind this simplicity. Just enough to keep it easy to use but still flexible:

```js
throw tinyError({
  prefix: '[my library] ',
  message: 'Curses! Try once more.',
});
//» Error: [my library] Curses! Try once more.

const myError = tinyError({prefix: '[my library] '});
throw myError('Curses! Try once more.');
//» Error: [my library] Curses! Try once more.

throw myError('Oh no. Not again!');
//» Error: [my library] Oh no. Not again!
```

<a                                                      id="maker-function"></a>
> &ast;&ensp;*maker function* – a term I coined together for a function that creates an object. Not an instance of a class (that’s a *factory*). Not an instance of a specific class (*constructor*). Just an object. If there is another word for that, great! Tell me in [an issue](https://github.com/studio-b12/tiny-error/issues/new) please.




API
===


<h3><pre>
tinyError(message)
  → {Error}
</pre></h3>

A shortcut to `tinyError({message: message})`.

**Parameters:**

* `{String} message`


***


<h3><pre>
tinyError(args)
  → {Function} tinyErrorCurried
</pre></h3>

<h3><pre>
tinyError(args)
  → {Error}
</pre></h3>

An error maker.

We return an `{Error}` if `args` contains a `{String} args.message`. Otherwise we return a [curried][] function. So these are equivalent:

```js
tinyError({
  prefix: '[my library] ',
  myCode: 0,
  message: 'Something went wrong',
});


const myError = tinyError({prefix: '[my library] '})
myError({
  myCode: 0,
  message: 'Something went wrong',
});


const knownError = myError({myCode: 0});
knownError('Something went wrong');
```


All `args` are just copied to the target object – except three special-cased:


**Parameters:**

* `{Function} args.prefix`  
  we’ll prepend it to the `message`

* `{Function} args.suffix`  
  we’ll append it to the `message`

* `{Function} args.prototype`  
  will be used as prototype instead of `Error.prototype`


Keep in mind that some properties like `message` and `name` will be treated specially by `Error.prototype`.

[curried]:  http://en.wikipedia.org/wiki/Currying




License
-------

[MIT][] © [Studio B12 GmbH][]

[MIT]: ./License.md
[Studio B12 GmbH]: http://studio-b12.de
