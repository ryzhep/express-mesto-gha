const httpConstants = require('http2').constants;

const {
  HTTP_STATUS_BAD_REQUEST: BAD_REQUEST_400,
  HTTP_STATUS_NOT_FOUND: NOT_FOUND_404,
  HTTP_STATUS_INTERNAL_SERVER_ERROR: INTERNAL_SERVER_ERROR_500,
  HTTP_STATUS_CREATED: CREATED_201,
  HTTP_STATUS_UNAUTHORIZED: UNAUTHORIZED_401,
  HTTP_STATUS_CONFLICT: CONFLICT_409,
  HTTP_STATUS_FORBIDDEN: FORBIDDEN_403,
} = httpConstants;

module.exports = {
  BAD_REQUEST_400,
  NOT_FOUND_404,
  INTERNAL_SERVER_ERROR_500,
  CREATED_201,
  UNAUTHORIZED_401,
  CONFLICT_409,
  FORBIDDEN_403,
};
