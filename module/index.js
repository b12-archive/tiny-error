const assign = require('object-assign');
const drop = require('1-liners/drop');

let error;

const normalizeArgs = (args) => {
  if (typeof args === 'object') return args;
  if (typeof args === 'string') return {message: args};
  throw error(
    'Wrong argument. We expected `{Object} args` or `{String} message`.'
  );
};

const tinyError = (args) => {
  args = normalizeArgs(args);
  const hasMessage = args.hasOwnProperty('message');

  if (hasMessage && args.hasOwnProperty('prefix')) {
    args.message = args.prefix + args.message;
    args = drop('prefix', args);
  }

  if (hasMessage && args.hasOwnProperty('suffix')) {
    args.message = args.message + args.suffix;
    args = drop('suffix', args);
  }

  return (hasMessage ?
    assign(
      Object.create(args.hasOwnProperty('prototype') ?
        args.prototype :
        ((args.type && args.type.prototype) || Error.prototype)
      ),
      args
    ) :

    (extraArgs) => tinyError(assign({}, args, normalizeArgs(extraArgs)))
  );
};

error = tinyError({prefix: '[tinyError] '});

export {tinyError as default};
