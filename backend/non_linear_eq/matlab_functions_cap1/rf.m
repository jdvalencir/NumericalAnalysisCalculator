function [n, an, xn, bn, fn, error] = rf(f, a, b, max_iter, tol)
    syms x;
    f_sym = sym(f);
    
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
    
    % M = Tabla de resultados {'xl', 'xr', 'xu', 'f(xl)', 'f(xr)', 'f(xu)', 'Error relativo (%)'}
    % XR = Ultima iteración de la raíz de la función.
    % ER = Ultima iteracion del error relativo.
    % Iter = Número de iteraciones
    
    %METODOS DE SOLUCION
    
    %Método 1: Si Niter está vacío (Niter = []) entonces se debe especificar un
    %error relativo mínimo para converger.
    %Método 2: Si Tol está vacío (Tol = []) entonces se debe especificar un
    %número máximo de iteraciones para el código. Es posible que un número muy
    %grande de iteraciones cree un error y un mensaje aparecerá sugiriendo
    %reducir el número de iteraciones.
    a1 = a;
    b1 = b;
    %Si se ingresan menos de tres datos de entrada...
    fa = eval(subs(f_sym, x, a)); %Punto en Y para el límite inferior.
    fb = eval(subs(f_sym, x, b)); %Punto en Y para el límite superior.
    iter = 1;
    while (abs(a1 - b1) > tol) && (iter <= max_iter)
        % Calcular el punto medio del intervalo
        c = b1 - fb * ((b1 - a1) / (fb - fa));
        fc = eval(subs(f_sym, x, c));
        % Calcular el error absoluto
        error(iter) = abs(b1 - a1) / 2;
        % Actualizar la tabla de iteraciones
        n = iter;
        an(iter) = a1;
        bn(iter) = b1;
        xn(iter) = c;
        fn(iter) = fc;
        % Actualizar los valores de los puntos
        if fa * fc < 0
            b1 = c;
            fb = fc;
        else
            a1 = c;
            fa = fc;
        end
        % Actualizar el contador de iteraciones
        iter = iter + 1;
    end