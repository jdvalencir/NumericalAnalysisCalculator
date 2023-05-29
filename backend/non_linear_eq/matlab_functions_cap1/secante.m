function [iter,xn,fn, E, mes, err] = secante(f, x0, x1, tol, max_iter)
    format long
    syms x;
    iter = 1;
    xn = 0;
    fn = 0;
    E = 0;
    mes = "";
    err = "";
    f_sym = sym(f);
    f0 = eval(subs(f_sym, x0));
    f1 = eval(subs(f_sym, x1));
    x2 = x1 - ((f1 * (x1 - x0)) / (f1 - f0));
    f2 = eval(subs(f_sym, x2));
    if imag(f0)
        err = 'f(x0) no está definido en el dominio de la función';
        return
    end 
    if max_iter < 0 
        err = 'El número de iteraciones es < 0';
        return
    end
    if tol < 0
        err = 'La tolerancia es menor que 0';
        return
    end
    if x0 == x1
        err = 'X0 es igual a x1';
        return
    end 
    xn(iter) = x0;
    fn(iter) = f0;
    E(iter) = tol + 1;
    if f0 == 0
        mes = "x0 es una raíz: " + num2str(xn(end));
        return
    end
    iter = iter + 1;
    xn(iter) = x1;
    fn(iter) = f1;
    E(iter) = tol + 1;
    if f1 == 0
        mes = "x1 es un raíz: " + num2str(xn(end)); 
        return
    end 
    iter = iter + 1;
    numberError = abs(x1 - x2);
    xn(iter) = x2;
    fn(iter) = f2; 
    E(iter) = numberError;
    if f2 == 0 
        mes = "x es un raíz: " + num2str(xn(end)); 
        return
    end
    
    % Iterar hasta alcanzar la tolerancia o el número máximo de iteraciones
    while numberError > tol && iter <= max_iter && f2 ~= 0
        % Actualizar los valores de los puntos
        x0 = x1;
        f0 = f1;
        x1 = x2;
        f1 = f2;
        if f1 - f0 ~= 0
            x2 = x1 - ((f1 * (x1 - x0)) / (f1 - f0));
            f2 = eval(subs(f_sym, x2));
            numberError = abs(x1 - x2);
            iter = iter + 1;
            xn(iter) = x2;
            fn(iter) = f2;
            E(iter) = abs(x2 - x1);
        else
            mes = "El denominador es 0. El método no puede continuar. La última aproximación fue " + num2str(xn(end)) ;
            return 
        end
        % Mostrar los resultados de la iteración actual
        % Actualizar el contador de iteraciones
    end
% Verificar si se alcanzó la tolerancia o el número máximo de iteraciones
    if fn(end)==0
        mes = "La raíz fue encontrada en x = " + num2str(xn(end), 15);
    elseif numberError <= tol
        mes = "Una aproximación de la raíz fue encontrada para m = " + num2str(xn(end), 15);
    elseif iter == max_iter
        mes = "Dado el número de iteraciones y de tolerancia, fue imposible encontrar una raíz apropiada";
    else
        mes = "El método explotó" ; 
    end
end