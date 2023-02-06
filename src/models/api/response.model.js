const response = (status = "success", message = "OK", data = {}) => ({
    //status can be success failed or error
    status,
    message,
    data,
  });

  
module.exports = response;