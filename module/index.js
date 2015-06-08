const assign = require('object-assign');
const drop = require('1-liners/drop');

let error;

const tinyError = (args) => {
  if (typeof args === 'string') args = {message: args};
  else if (typeof args !== 'object') throw error(
    'Wrong argument. We expected `{Object} args` or `{String} message`.'
  );

  const hasMessage = args.hasOwnProperty('message');

  if (hasMessage && args.hasOwnProperty('prefix')) {
    args.message = args.prefix + args.message;
    args = drop('prefix', args);
  }

  if (hasMessage && args.hasOwnProperty('suffix')) {
    args.message = args.message + args.suffix;
    args = drop('suffix', args);
  }

  if (hasMessage) return assign(
    Object.create(args.hasOwnProperty('prototype') ?
      args.prototype :
      ((args.type && args.type.prototype) || Error.prototype)
    ),
    args
  );
};

error = tinyError({prefix: '[tinyError] '});

export {tinyError as default};
