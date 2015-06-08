import tinyError from './module/index';

const test = require('tape-catch');

test('The API is in good shape', (is) => {
  is.equal(
    typeof tinyError,
    'function',
    'Exports a function'
  );

  is.equal(
    typeof tinyError('message'),
    'object',
    'returning an error object when given a string,'
  );

  is.equal(
    typeof tinyError({message: 'message'}),
    'object',
    'or an args object with the key `message`.'
  );

  const curriedError = tinyError({any: 'other', keys: 'and values'});

  is.equal(
    typeof curriedError,
    'function',
    'When given a different args object it returns a curried function,'
  );

  is.equal(
    typeof curriedError({message: 'and', other: 'stuff'}),
    'object',
    'which again returns an error object when given a message,'
  );

  is.equal(
    typeof curriedError({}),
    'function',
    'or curries the function further.'
  );

  is.equal(
    tinyError({three: 3})({two: 2})({one: 1})('go!'),
    tinyError({three: 3, two: 2, one: 1, message: 'go!'}),
    'Returns the same results whether curried or not'
  );

  is.end();
});
