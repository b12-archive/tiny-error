let error;

const tinyError = (args) => {
  if (typeof args === 'string') args = {message: args};
  else if (typeof args !== 'object') throw error(
    'Wrong argument. We expected `{Object} args` or `{String} message`.'
  );
};

error = tinyError({prefix: '[tinyError] '});

export {tinyError as default};
