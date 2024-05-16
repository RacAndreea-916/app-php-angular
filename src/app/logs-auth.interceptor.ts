import { HttpInterceptorFn } from '@angular/common/http';

export const logsAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('authToken');
  req = req.clone({headers: req.headers.set('Authorization',`Bearer ${token}` )})
  return next(req);
};
