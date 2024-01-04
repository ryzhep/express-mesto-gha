const httpConstants = require('http2').constants;

const {
  HTTP_STATUS_NOT_FOUND: NOT_FOUND_404,
  HTTP_STATUS_BAD_REQUEST: BAD_REQUEST_400,
} = httpConstants;

module.exports = {
  NOT_FOUND_404,
  BAD_REQUEST_400,
};
