% Definir la función que se desea encontrar su raíz
func = @(x) ((3/2) * x * 9 * log(x + 100)) + ((x^2) * log(x + 100)) + (((9 * 81)/16) * log(x + 100));

% Definir los valores iniciales
x0 = -8;
x1 = 8;
tolerancia = 0.5e-5;
max_iter = 100;

% Inicializar los vectores para la tabla de iteraciones
n = zeros(max_iter, 1);
xn = zeros(max_iter, 1);
fn = zeros(max_iter, 1);
error = zeros(max_iter, 1);

% Calcular la primera aproximación
f0 = func(x0);
f1 = func(x1);
x2 = x1 - ((f1 * (x1 - x0)) / (f1 - f0));
f2 = func(x2);
iter = 1;

% Mostrar los encabezados de la tabla
fprintf('n      xn             fn             error\n');
fprintf('-------------------------------------------\n');

% Iterar hasta alcanzar la tolerancia o el número máximo de iteraciones

while abs(f2) > tolerancia && iter <= max_iter
    % Actualizar los valores de los puntos
 
    if f2*f1 < 0
        x1 = x2;
        f1 = f2;
    else
        x0 = x2;
        f0 = f2;
    end
    % Calcular la siguiente aproximación
    x2 = x1 - ((f1 * (x1 - x0)) / (f1 - f0));
    f2 = func(x2);
    % Calcular el error absoluto
    error(iter) = abs(x2 - x1);
    % Actualizar la tabla de iteraciones
    n(iter) = iter;
    xn(iter) = x2;
    fn(iter) = f2;
    % Mostrar los resultados de la iteración actual
    fprintf('%d    %12.8f    %12.8f    %.10f\n', n(iter), xn(iter), fn(iter), error(iter));
    % Actualizar el contador de iteraciones
    iter = iter + 1;
end

% Verificar si se alcanzó la tolerancia o el número máximo de iteraciones
if abs(f2) <= tolerancia
    fprintf('\nSe encontró una raíz en %12.8f con una tolerancia de %e en %d iteraciones\n', x2, tolerancia, iter-1);
else
    fprintf('\nNo se pudo encontrar una raíz con una tolerancia de %e en %d iteraciones\n', tolerancia, max_iter);
end

