const assign = require('object-assign');

let error;

const tinyError = (args) => {
  if (typeof args === 'string') args = {message: args};
  else if (typeof args !== 'object') throw error(
    'Wrong argument. We expected `{Object} args` or `{String} message`.'
  );

  if (args.hasOwnProperty('message')) return assign(
    Object.create(args.hasOwnProperty('prototype') ?
      args.prototype :
      ((args.type && args.type.prototype) || Error.prototype)
    ),
    args
  );
};

error = tinyError({prefix: '[tinyError] '});

export {tinyError as default};
