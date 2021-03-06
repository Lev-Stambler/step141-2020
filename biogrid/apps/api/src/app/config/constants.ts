import { environment } from '../../environments/environment';

export default {
  environment: environment.production ? 'production' : 'development',
  port: environment.port || parseInt(process.env.PORT || '3000'),
  errorTypes: {
    db: {
      statusCode: 500,
      name: 'Internal Server Error',
      message: 'database error',
    },
    validation: {
      statusCode: 400,
      name: 'Bad Request',
      message: 'validation error',
    },
    auth: { statusCode: 401, name: 'Unauthorized', message: 'auth error' },
    forbidden: {
      statusCode: 403,
      name: 'Forbidden',
      message: 'forbidden content',
    },
    notFound: {
      statusCode: 404,
      name: 'Not Found',
      message: 'content not found',
    },
    entity: {
      statusCode: 422,
      name: 'Unprocessable Entity',
      message: 'entity error',
    },
  },
  simulation: {
    NUMBER_OF_SIM_HOURS: 24,
  },

  get errorMap() {
    return {
      ValidateError: this.errorTypes.validation,
      ValidationError: this.errorTypes.validation,
      CastError: this.errorTypes.db,
    };
  },
};
