function [raiz_aprox] = biseccion(f, a, b, tol)
    % Implementación del método de bisección para encontrar la raíz de una función.
    
    while (b-a)/2 > tol
        c = (a+b)/2;
        if f(c) == 0
            raiz_aprox = c;
            return;
        elseif f(a)*f(c) < 0
            b = c;
        else
            a = c;
        end
    end
    
    raiz_aprox = (a+b)/2;
    end