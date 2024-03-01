export const httpStatus = {
  100: 'Continue',
  101: 'Switching Protocols',
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  300: 'Multiple Choices',
  301: 'Moved Permanently',
  302: 'Found',
  303: 'See Other',
  304: 'Not Modified',
  305: 'Use Proxy',
  307: 'Temporary Redirect',
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Time-out',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Request Entity Too Large',
  414: 'Request-URI Too Large',
  415: 'Unsupported Media Type',
  416: 'Requested range not satisfiable',
  417: 'Expectation Failed',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Time-out',
  505: 'HTTP Version not supported',
};

const _http = {
  messages: httpStatus,
};

Object.keys(httpStatus).forEach((code) => {
  const key = httpStatus[code].toUpperCase().replaceAll(' ', '_');
  _http[key] = code;
});

// @todo: format response by reducing code duplication

// eslint-disable-next-line arrow-body-style
export const http = (resp) => {
  return {
    ok: (message = httpStatus[_http.OK]) => {
      resp
        .status(_http.OK)
        .json({ code: _http.OK, response: { message, error: false } });
    },
    error: (message = httpStatus[_http.INTERNAL_SERVER_ERROR]) => {
      resp.status(_http.INTERNAL_SERVER_ERROR).json({
        code: _http.INTERNAL_SERVER_ERROR,
        response: { message, error: true },
      });
    },
    badRequest: (message = httpStatus[_http.BAD_REQUEST]) => {
      resp.status(_http.BAD_REQUEST).json({
        code: _http.BAD_REQUEST,
        response: { message, error: true },
      });
    },
    notFound: (message = httpStatus[_http.NOT_FOUND]) => {
      resp.status(_http.NOT_FOUND).json({
        code: _http.NOT_FOUND,
        response: { message, error: true },
      });
    },
    unauthorized: (message = httpStatus[_http.UNAUTHORIZED]) => {
      resp.status(_http.UNAUTHORIZED).json({
        code: _http.UNAUTHORIZED,
        response: { message, error: true },
      });
    },
    forbidden: (message = httpStatus[_http.FORBIDDEN], errors = null) => {
      resp.status(_http.FORBIDDEN).json({
        code: _http.FORBIDDEN,
        response: { message, errors },
      });
    },
  };
};

export default { http };
