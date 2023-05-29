function [c,xn,fm,dfm,d2fm,E, mes, err] = raices_multiples(f, x0,tol,max_iter)
    format long
    syms x;
    xn = 0;
    fm = 0;
    E = 0;
    mes = "";
    err = "";
    %f=sin(2*x)-(x/(3))^3+0.1;
    f_sym = sym(f);
    df=diff(f_sym);
    df2=diff(f_sym, 2);
    c=0;
    fm(c+1) = eval(subs(f_sym,x0));
    fe=fm(c+1);

    if imag(fe)
        err = 'f(x0) no está definido en el dominio de la función';
        return
    end 
    if max_iter < 0 
        err = 'El número de iteraciones es < 0';
        return
    end
    if tol < 0
        err = 'La tolerancia es menor que 0';
        return
    end

    dfm(c+1) = eval(subs(df,x0));
    dfe=dfm(c+1);

    d2fm(c+1)=eval(subs(df2, x0));
    d2fe=d2fm(c+1);

    E(c+1)=tol+1;
    error=E(c+1);
    xn(c+1)=x0;

    d = dfe^2 - fe * d2fe;
    while error > tol && d ~= 0 && c < max_iter 
        xn(c+2) = x0 - ((fe * dfe) / (dfe^2 - (fe * d2fe)));
        if xn(c+2) == inf
            err = "Valor infinito en la iteración: " + num2str(c);
            return
        end
        fm(c+2)=eval(subs(f_sym,xn(c+2)));
        fe=fm(c+2);
        dfm(c+2)=eval(subs(df,xn(c+2)));
        dfe=dfm(c+2);
        d2fm(c+2)=eval(subs(df2,xn(c+2)));
        d2fe=d2fm(c+2);
        E(c+2)=abs(xn(c+2)-x0);
        error=E(c+2);
        if imag(fe)
            err = "xi no está definido en el dominio de la función: " + num2str(xn(c+2));
            return
        end 
        if imag(dfe)
            err = "xi no está definido en el dominio de la función: " + num2str(xn(c+2));
            return
        end 
        if imag(d2fe)
            err = "xi no está definido en el dominio de la función: " + num2str(xn(c+2));
            return
        end 
        x0=xn(c+2);
        c=c+1;
    end
    if fm(end) == 0
        mes = "La raíz fue encontrada en x = " + num2str(xn(end), 15);
    elseif ~(error <= tol)
        mes = "Una aproximación de la raíz fue encontrada para m = " + num2str(xn(end), 15);
    elseif iter == max_iter
        mes = "Dado el número de iteraciones y de tolerancia, fue imposible encontrar una raíz apropiada";
    else
        mes = "El método explotó" ; 
    end
end