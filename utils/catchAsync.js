/**
 * Wraps an asynchronous function.
 *
 * @param {Function} func - The asynchronous function to be wrapped.
 * @returns {Function} A middleware function that handles errors and forwards them to Express.
 */
function catchAsync(func) {
  return (req, res, next) => {
    func(req, res, next).catch(next);
  };
}

module.exports = catchAsync;
