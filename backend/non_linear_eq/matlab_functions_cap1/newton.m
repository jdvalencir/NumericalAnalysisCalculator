function [n,xn,fm,dfm,E, mes, err] = newton(f, x0,tol,max_iter)
    format long
    syms x;
    n = 1;
    xn = 0;
    fm = 0;
    dfm = 0;
    E = 0;
    mes = "";
    err = "";
    %f=sin(2*x)-(x/(3))^3+0.1;
    f_sym = sym(f);
    df=diff(f_sym);
    c=0;
    fm(c+1) = eval(subs(f_sym,x0));
    fe=fm(c+1);
    if max_iter < 0 
        err = 'El número de iteraciones es < 0';
        return
    end
    if tol < 0
        err = 'La tolerancia es menor que 0';
        return
    end
    if imag(fe)
        err = 'f(x0) no está definido en el dominio de la función';
        return
    end 
    if fe == 0
        xn(c + 1) = x0;
        fm(c + 1) = fe;
        mes = "x0 es la raíz: " + num2str(x0, 15);
        return
    end
    dfm(c+1) = eval(subs(df,x0));
    dfe=dfm(c+1);

    if dfe == 0
        err = 'El punto evaludo en la derivada no puede ser 0';
        return
    end 
    E(c+1)=tol+1;
    error=E(c+1);
    xn(c+1)=x0;
    N(c+1)=c;
    while error > tol && fe ~= 0 && c < max_iter 
        xn(c+2)=x0-fe/dfe;
        fm(c+2)=eval(subs(f_sym,xn(c+2)));
        fe=fm(c+2);
        dfm(c+2)=eval(subs(df,xn(c+2)));
        dfe=dfm(c+2);
        if imag(fe)
            err = 'f(x0) no está definido en el dominio de la función';
            return
        end 
        if imag(dfe)
            err = 'El punto evaludo en la derivada no puede ser 0';
            return
        end
        E(c+2)=abs(xn(c+2)-x0);
        error=E(c+2);
        x0=xn(c+2);
        N(c+2)=c+1;
        c=c+1;
    end
    if fe==0
        s=x0;
        n=c + 1;
        mes = "La raíz fue encontradad en x = " + num2str(s, 15);
    elseif error <= tol
        s=x0;
        n=c + 1;
        mes = "Una aproximación de la raíz fue encontrada para m = " + num2str(s, 15);
    elseif iter == max_iter
        mes = "Dado el número de iteraciones y de tolerancia, fue imposible encontrar una raíz apropiada";
    else
        mes = "El método explotó" ; 
    end
end