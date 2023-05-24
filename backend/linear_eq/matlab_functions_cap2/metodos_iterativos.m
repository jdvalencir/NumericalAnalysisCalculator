function [iter, x, T, C, radioEspectral, E] = metodos_iterativos(A, b, x0, tol, normV, niter, l, w)
    % Función que implementa el método de Gauss-Seidel para resolver el sistema
    % de ecuaciones lineales Ax = b.
    % Parámetros de entrada:
    %   A: matriz cuadrada de coeficientes del sistema de ecuaciones
    %   b: vector columna de términos independientes
    %   x0: vector columna que contiene la aproximación inicial de la solución
    %   Tol: tolerancia para el criterio de convergencia (norma del residuo)
    %   norm
    %   niter: número máximo de iteraciones permitidas
    %   l: para ver cual método es (1 - Gauss - Seidel, 2 - Jacobi, 3 - Sor)
    %   w: Parametro de relajación
    % Parámetros de salida:
    %    x: vector columna que contiene la solución aproximada del sistema
    %   iter: número de iteraciones realizadas hasta alcanzar la convergencia
    
    bt = b;
    x0t = x0;
    iter = 1;
    error = tol + 1;
    x(: , iter) = x0t;
    D = diag(diag(A));
    L = -tril(A, -1);
    U = -triu(A, 1);
    if l == 1
        T = inv(D - L) * U ; 
        C = inv(D - L) * bt';
    end
    if l == 2
        T = inv(D) * (L + U);
        C = inv(D) * bt';
    end
    if l == 3
        T = inv(D - (w * L)) * ((1 - w) * D + (w * D));
        C = w * inv(D - (w * L)) * bt';
    end
    radioEspectral = max(abs(eig(T)));
    if radioEspectral > 1
        fprintf('El radio espectral es mayor que 1, radio espectral = %f \n', radioEspectral)
    end
    xAnt = x0t';

    % Iterar hasta alcanzar la convergencia o hasta alcanzar el número máximo de iteraciones permitidas
    while error > tol && iter < niter
        x(:, iter + 1) = ((T * xAnt) + C);
        E(iter + 1) = norm(xAnt - x(:, iter + 1), normV);
        error = E(iter+1);
        xAnt = x(:, iter);
        iter = iter + 1;
    end
    % Mostrar un mensaje si se alcanzó la convergencia o si se alcanzó el número máximo de iteraciones permitidas
    if error <= tol
        fprintf('El método de convergió en %d iteraciones\n', iter);
    else
        fprintf('El método de no convergió en %d iteraciones\n', niter);
    end