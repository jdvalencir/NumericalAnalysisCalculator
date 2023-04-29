% Definir la función que se desea encontrar su raíz y su derivada
func = @(x) (cos(x) * exp(-x)) - 9;
deriv = @(x) (-exp(-x) * cos(x)) - (exp(-x) * sin(x));

% Definir los valores iniciales
x0 = -4.1;
tolerancia = 0.5e-3;
max_iter = 100000;

% Inicializar los vectores para la tabla de iteraciones
n = zeros(max_iter, 1);
xn = zeros(max_iter, 1);
fn = zeros(max_iter, 1);
derivn = zeros(max_iter, 1);
error = zeros(max_iter, 1);

% Calcular la primera aproximación
f0 = func(x0);
f1 = deriv(x0);
x1 = x0 - (f0 / f1);
f2 = func(x1);
f3 = deriv(x1);
iter = 1;

% Mostrar los encabezados de la tabla
fprintf('n      xn             fn             f1(xn)         error\n');
fprintf('-------------------------------------------------------\n');

% Iterar hasta alcanzar la tolerancia o el número máximo de iteraciones
while abs(f2) > tolerancia && iter <= max_iter
    % Calcular la siguiente aproximación
    x2 = x1 - ((f2 / f3) * (1 - (f0 / (f2 * f3))));
    f4 = func(x2);
    f5 = deriv(x2);
    % Calcular el error absoluto
    error(iter) = abs(x2 - x1);
    % Actualizar la tabla de iteraciones
    n(iter) = iter;
    xn(iter) = x2;
    fn(iter) = f4;
    derivn(iter) = f5;
    % Mostrar los resultados de la iteración actual
    fprintf('%d    %12.8f    %12.8f    %12.8f    %12.8f\n', n(iter), xn(iter), fn(iter), derivn(iter), error(iter));
    % Actualizar los valores de los puntos
    x0 = x1;
    f0 = f2;
    f1 = f3;
    x1 = x2;
    f2 = f4;
    f3 = f5;
    % Actualizar el contador de iteraciones
    iter = iter + 1;
end

% Verificar si se alcanzó la tolerancia o el número máximo de iteraciones
if abs(f2) <= tolerancia
    fprintf('\nSe encontró una raíz en %12.8f con una tolerancia de %e en %d iteraciones\n', x2, tolerancia, iter-1);
else
    fprintf('\nNo se pudo encontrar una raíz con una tolerancia de %e en %d iteraciones\n', tolerancia, max_iter);
end