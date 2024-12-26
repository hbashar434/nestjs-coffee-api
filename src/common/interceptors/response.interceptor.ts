import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const skipInterceptor = this.getSkipInterceptorMetadata(context);

    if (skipInterceptor) {
      return next.handle();
    }

    return next.handle().pipe(
      map((data) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        message: data?.message || 'Request successful',
        data: data?.data || null,
      })),
      catchError((error) => {
        const response = context.switchToHttp().getResponse();
        const statusCode = error?.status || HttpStatus.INTERNAL_SERVER_ERROR;

        // Construct the proper error structure
        const errorResponse = {
          statusCode: statusCode,
          message:
            error?.response?.message ||
            error?.message ||
            'Internal server error',
          error:
            error?.response?.error || error?.name || 'Internal Server Error',
        };

        // Send the error response
        response.status(statusCode).json(errorResponse);

        // Re-throw the error to stop further processing
        return throwError(() => error);
      }),
    );
  }

  private getSkipInterceptorMetadata(context: ExecutionContext): boolean {
    const handler = context.getHandler();
    return Reflect.getMetadata('skipInterceptor', handler) || false;
  }
}
