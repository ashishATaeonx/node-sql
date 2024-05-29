// Reusable function for sending error responses
const sendErrorResponse = (res, status, message, error) => {
    console.error(error);
    res.status(status).send({
      success: false,
      message: message,
      error: error
    });
  };
  

  module.exports = sendErrorResponse;