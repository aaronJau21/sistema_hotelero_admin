import { HttpInterceptorFn } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if (token && !req.headers.has('Authorization')) {
    const authReq = req.clone({
      headers: new HttpHeaders({
        ...req.headers.keys().reduce((acc, key) => {
          acc[key] = req.headers.get(key) ?? ''; // Usa '' como valor por defecto si es null
          return acc;
        }, {} as { [key: string]: string }),
        Authorization: `Bearer ${token}`,
      }),
    });
    return next(authReq);
  }

  return next(req);
};