function [iter, an, xn, bn, fn, E, mes, err] = biseccion(f, a, b, max_iter, tol)
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
    
    %Método de la bisección (versión función) ESPAÑOL.
    %Llama a esta función desde la ventana de comandos o cualquier script para
    %encontrar la raíz de una función en un intervalo y obtén una tabla con el
    %proceso.
    
    % ESTA FUNCION PIDE LOS SIGUIENTES DATOS DE ENTRADA:
    
    % f = función como un identificador de función (function handle) 
    %   ej. @(x) cos(x)
    % xl = Límite inferior. Este dato es un escalar.
    % xu = Límite superior. Este dato es un escalar.
    % Niter = Número de iteraciones.
    % Tol = Tolerancia para el criterio de convergencia a superar o igualar en
    % porcentaje.
    
    % VARIABLES DE SALIDA:

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
    %METODOS DE SOLUCION
    iter = 1;
    m = (a + b) / 2;
    numberError = m;
    fa = eval(subs(f_sym, a));
    fb = eval(subs(f_sym, b)); 
    fm = eval(subs(f_sym, m)); 

    while numberError > tol && iter < max_iter && fm ~= 0 && fa * fb < 0  
        an(iter) = a;
        xn(iter) = m;
        bn(iter) = b;
        fn(iter) = fm; 
        E(iter) = numberError; 
        if imag(fa)
            error('f(a) no está definido en el dominio de la función: %s', a);
        end
        if imag(fb)
            error('f(b) no está definido en el dominio de la función: %s', b)
        end
        if imag(fm)
            error('f((a + b) / 2)) o f(m) no está definido en el dominio de la función: %s', m )
        end 
        if fa * fm < 0
            b = m; 
            fb = fm;
        elseif fm * fb < 0
            a = m;
            fa = fm;
        end
        m = abs((a + b) / 2);
        fm = eval(subs(f_sym, m)); 
        numberError = (b - a) / 2;
        iter = iter + 1;
    end
    an(iter) = a;
    xn(iter) = m;
    bn(iter) = b;
    fn(iter) = fm; 
    E(iter) = numberError; 
    if fm == 0
        mes = "La raíz fue encontrada  m = " + num2str(m, 15) ; 
    elseif numberError <= tol
        mes = "Una aproximación de la raíz fue encontrada para m = " + num2str(m, 15);
    elseif iter < max_iter && numberError > tol
        err = 'No se encontró una raiz en el intervalo dado';
    elseif iter == max_iter
        mes = "Dado el número de iteraciones y de tolerancia, fue imposible encontrar una raíz apropiada";
    else
        mes = "El método explotó" ; 
    end
end