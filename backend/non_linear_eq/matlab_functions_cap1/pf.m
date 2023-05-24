%Punto fijo: se ingresa el valor inicial (x0), la tolerancia del error (Tol) y el màximo nùmero de iteraciones (niter) 
function [c , xn, fm, gm, E] = pf(f, g, x0, tol, niter)
    syms x
    f_sym = sym(f);
    g_sym = sym(g); 
    c = 1;
    fm(c) = eval(subs(f_sym, x0));
    gm(c) = eval(subs(g_sym, x0));
    fe = fm(c);
    E(c) = tol+1;
    error = E(c);
    xn(c) = x0;
    N(c) = c;
    while error>tol && fe~=0 && c<niter
        xn(c+1) = eval(subs(g_sym, x, x0));
        fm(c+1) = eval(subs(f_sym, x, xn(c+1)));
        gm(c+1) = eval(subs(g_sym, x, xn(c+1)));
        fe=fm(c+1);
        E(c+1) = abs((xn(c+1) - x0));
        error = E(c+1);
        x0 = xn(c+1);
        N(c+1) = c ;
        c = c+1;
    end
end