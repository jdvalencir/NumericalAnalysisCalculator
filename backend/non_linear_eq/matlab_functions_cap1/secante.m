function [iter,xn,fn,error] = secante(f, x0, x1, Tol,niter)
    format long
    syms x;
    f_sym = sym(f);
    f0 = eval(subs(f_sym, x0));
    f1 = eval(subs(f_sym, x1));
    x2 = x1 - ((f1 * (x1 - x0)) / (f1 - f0));
    f2 = eval(subs(f_sym, x2));
    iter = 1;
    n(iter) = iter;
    xn(iter) = x1;
    fn(iter) = f1;
% Iterar hasta alcanzar la tolerancia o el número máximo de iteraciones
    while abs(f2) > Tol && iter <= niter
        % Actualizar los valores de los puntos


        x0 = x1;
        f0 = f1;
        x1 = x2;
        f1 = f2;
        % Calcular la siguiente aproximación
        x2 = x1 - ((f1 * (x1 - x0)) / (f1 - f0));
        f2 = eval(subs(f_sym, x2));
        % Calcular el error absoluto
        error(iter) = abs(x2 - x1);
        % Actualizar la tabla de iteraciones
        n(iter+1) = iter;
        xn(iter+1) = x2;
        fn(iter+1) = f2;
        % Mostrar los resultados de la iteración actual
        % Actualizar el contador de iteraciones
        iter = iter + 1;
    end
% Verificar si se alcanzó la tolerancia o el número máximo de iteraciones
    if abs(f2) <= Tol
        fprintf('\nSe encontró una raíz en %12.8f con una tolerancia de %e en %d iteraciones\n', x2, Tol, iter-1);
    else
        fprintf('\nNo se pudo encontrar una raíz con una tolerancia de %e en %d iteraciones\n', Tol, niter);
    end
end