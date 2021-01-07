import {
  HttpStatus,
  HttpException,
  Logger,
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Global,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorRes = {
      code: status,
      timestamp: Date.now().toLocaleString(),
      path: req.url,
      method: req.method,
      message:
        status !== HttpStatus.INTERNAL_SERVER_ERROR
          ? null
          : 'Internal Server Error',
    };

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      Logger.error(
        `${req.method} ${req.url}`,
        JSON.stringify(errorRes),
        'Exception Filter',
      );
    }
    res.status(status).json(errorRes);
  }
}
