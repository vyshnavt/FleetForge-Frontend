import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';
import { handleHttpError } from '../handler/error-handler'

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => handleHttpError(error)) // Every error calls your function
  );
};