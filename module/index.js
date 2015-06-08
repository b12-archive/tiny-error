const assign = require('object-assign');
const omit = require('101/omit');

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
    args = omit(args, 'prefix');
  }

  if (hasMessage && args.hasOwnProperty('suffix')) {
    args.message = args.message + args.suffix;
    args = omit(args, 'suffix');
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

export default tinyError;
