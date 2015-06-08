import tinyError from './module/index';

const test = require('tape-catch');
const assign = require('object-assign');

test('The API is in good shape', (is) => {
  is.equal(
    typeof tinyError,
    'function',
    'Exports a function'
  );

  is.equal(
    typeof tinyError('message'),
    'object',
    '…returning an error object when given a string,'
  );

  is.equal(
    typeof tinyError({message: 'message'}),
    'object',
    '…or an args object with the key `message`.'
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
    '…which again returns an error object,'
  );

  is.equal(
    typeof curriedError({}),
    'function',
    '…or curries the function further.'
  );

  is.deepEqual(
    tinyError({three: 3})({two: 2})({one: 1})('go!'),
    tinyError({three: 3, two: 2, one: 1, message: 'go!'}),
    'Returns the same results whether curried or not'
  );

  is.end();
});

test('Creates a lightweight error object', (is) => {
  is.equal(
    tinyError('message').__proto__,
    Error.prototype,
    'Returns an object based on `Error.prototype`,'
  );

  const customProto = {};
  is.equal(
    tinyError({
      prototype: customProto,
      message: 'message',
    }).__proto__,
    customProto,
    '…except when a custom `prototype` is given.'
  );

  is.notOk(
    tinyError({prototype: customProto, message: ''})
      .hasOwnProperty('prototype')
    ,
    'Doesn’t copy the property `prototype`.'
  );

  is.equal(
    tinyError({message: 'My message'}).message,
    'My message',
    'Copies over the property `message`,'
  );

  is.equal(
    tinyError({
      prefix: '[my label] ',
      message: 'My message',
    }).message,
    '[my label] My message',
    '…extending it when `prefix`'
  );

  is.equal(
    tinyError({
      prefix: '[my label] ',
      message: 'My message',
      suffix: '. Good one, ain’ it?',
    }).message,
    '[my label] My message. Good one, ain’ it?',
    '…or `suffix` is given.'
  );

  is.deepEqual(
    tinyError({
      prefix: '[prefix] ',
      message: 'My message',
      customKey: 'anything',
      name: 'CustomError',
      type: /anything/,
    }),
    assign(Object.create(Error.prototype), {
      message: '[prefix] My message',
      customKey: 'anything',
      name: 'CustomError',
      type: /anything/,
    }),
    'Copies over all other args.'
  );

  is.end();
});

test('Fails gracefully', (is) => {
  is.throws(
    () => tinyError(),
    /expected `{Object} args` or `{String} message`/i,
    'throws an error when called without arguments'
  );

  is.throws(
    () => tinyError(true),
    /expected `{Object} args` or `{String} message`/i,
    'throws an error when called with an argument of a wrong type'
  );

  is.end();
});
