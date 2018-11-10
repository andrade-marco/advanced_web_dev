//Used for 404 error handling
//If there's a error.status it will be 404
//if not, this means that a route was reached, but something internal went wrong.
//Make the response (res) a JSON with a custom error message
function errorHandler(error, req, res, next) {
    return res.status(error.status || 500).json({
        error: {
            message: error.message || 'Something went wrong...'
        }
    });
}

module.exports = errorHandler;
