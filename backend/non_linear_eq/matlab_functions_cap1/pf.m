%Punto fijo: se ingresa el valor inicial (x0), la tolerancia del error (Tol) y el màximo nùmero de iteraciones (niter) 
function [c , xn, fm, gm, E, mes, err] = pf(f, g, x0, tol, max_iter)
    syms x
    xn = 0;
    fm = 0;
    gm = 0;
    E = 0;
    mes = "";
    err = "";

    f_sym = sym(f);
    g_sym = sym(g); 
    c = 1;
    fm(c) = eval(subs(f_sym, x0));
    gm(c) = eval(subs(g_sym, x0));
    if imag(fm(c))
        err = 'f(x0) no está definido en el dominio de la función';
        return
    end 
    if imag(gm(c))
        err = 'g(x0)) no está definido en el dominio de la función';
        return
    end
    if max_iter < 0 
        err = 'El número de iteraciones es < 0';
        return
    end
    if fm(c) == 0
        xn(iter) = x0;
        fm(iter) = fx;
        mes = "x0 es la raíz: " + num2str(x0, 15);
        return
    end
    if tol < 0
        err = 'La tolerancia es menor que 0';
        return
    end
        
    fe = fm(c);
    E(c) = tol+1;
    error = E(c);
    xn(c) = x0;
    while error>tol && fe~=0 && c<max_iter
        xn(c+1) = eval(subs(g_sym, x, x0));
        fm(c+1) = eval(subs(f_sym, x, xn(c+1)));
        gm(c+1) = eval(subs(g_sym, x, xn(c+1)));
        fe=fm(c+1);
        E(c+1) = abs((xn(c+1) - x0));
        error = E(c+1);
        x0 = xn(c+1);
        c = c+1;
    end
    if fm(c) == 0
        mes = "La raíz fue encontradad en x = " + num2str(x0, 15);
    elseif error <= tol
        mes = "Una aproximación de la raíz fue encontrada para m = " + num2str(x0, 15); 
    elseif iter == max_iter
        mes = "Dado el número de iteraciones y de tolerancia, fue imposible encontrar una raíz apropiada";
    else
        mes = "El método explotó" ; 
    end
end