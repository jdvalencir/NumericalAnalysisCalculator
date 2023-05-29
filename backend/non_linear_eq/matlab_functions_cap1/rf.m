function [iter, an, xn, bn, fn, E, mes, err] = rf(f, a, b, max_iter, tol)
    format long
    syms x;
    f_sym = sym(f);
    iter = 0;
    an = 0;
    xn = 0;
    bn= 0;
    fn = 0;
    E = 0;
    mes = "";
    err = '';

    
    % ESTA FUNCION PIDE LOS SIGUIENTES DATOS DE ENTRADA:
    
    % f = función como un identificador de función (function handle) 
    %   ej. @(x) cos(x)
    % xl = Límite inferior. Este dato es un escalar.
    % xu = Límite superior. Este dato es un escalar.
    % Niter = Número de iteraciones.
    % Tol = Tolerancia para el criterio de convergencia a superar o igualar en
    % porcentaje.
    
    % VARIABLES DE SALIDA:
    

    
    %METODOS DE SOLUCION
    
    if max_iter < 0 
        err = 'El número de iteraciones es < 0';
        return
    end
    if imag(eval(subs(f_sym, a)))
        err = 'a no está definido en la función';
        return
    end
    if imag(eval(subs(f_sym, b)))
        err = 'b no está definido en la función';
        return
    end
    if a >= b
        err = 'a tiene que ser menor que b';
        return
    end
    if tol < 0
        err = 'La tolerancia es menor que 0';
        return
    end

    iter = 1;
    fa = eval(subs(f_sym, a));
    fb = eval(subs(f_sym, b)); 
    m = b - (fb * (b - a)) / (fb - fa);
    fm = eval(subs(f_sym, m)); 
    numberError = tol + 1;
    %Si se ingresan menos de tres datos de entrada...
    while numberError > tol && iter < max_iter
        an(iter) = a;
        xn(iter) = m;
        bn(iter) = b;
        fn(iter) = fm; 
        E(iter) = numberError; 
        if imag(fa)
            err = 'f(a) no está definido en el dominio de la función';
            return
        end
        if imag(fb)
            err = 'f(b) no está definido en el dominio de la función';
            return
        end
        % Actualizar los valores de los puntos
        if fa * fm < 0
            b = m; 
            fb = fm;
        elseif fm * fb < 0
            a = m;
            fa = fm;
        end
        temp = m;
        m =  b - (fb * (b - a)) / (fb - fa);
        fm = eval(subs(f_sym, m)); 
        numberError = abs(m - temp);
        iter = iter + 1;
    end
    an(iter) = a;
    xn(iter) = m;
    bn(iter) = b;
    fn(iter) = fm; 
    E(iter) = numberError; 
    if numberError < tol
        mes = "Una aproximación de la raíz fue encontrada para m = " + num2str(m, 15);
    elseif numberError > tol
        mes = "Dado el número de iteraciones y de tolerancia, fue imposible encontrar una raíz apropiada";
    else
        mes = "El método explotó" ; 
    end
end