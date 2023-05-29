function [polinomio, A] = vandermonde(x, y)
    x = double(x);
    y = double(y);

    A = vander(x)

    b = y';
    polinomio = inv(A) * b;
end