export const ERRORS = {
    BadRequest: {
      code: 'BAD_REQUEST',
      message:
        'Server cannot process the request due to something that is perceived to be a client',
    },
    Unauthorized: {
      code: 'UNAUTHORIZED',
      message: 'Authentication credentials not valid.',
    },
  
    Notfound: {
      code: 'NOT_FOUND',
      message: 'Not found.',
    },
    Conflict: {
      code: 'CONFLICT',
      message: 'Your input is conflict.',
    },
    InvalidToken: {
      code: 'INVALID_TOKEN',
      message: 'Invalid Token.',
    },
    TokenExpired: {
      code: 'TOKEN_EXPIRED',
      message: 'Token expired.',
    },
    Unexpected: {
      code: 'UNEXPECTED_ERROR',
      message: 'Unexpected errors.',
    },
  };
  
  export const SUCCESS = {
    OK: {
      code: 'OK',
      message: 'Successful',
    },
  };
  