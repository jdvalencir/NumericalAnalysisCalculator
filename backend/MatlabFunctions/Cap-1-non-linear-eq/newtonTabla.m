%Newton: se ingresa el valor inicial (x0), la tolerancia del error (Tol) y el màximo nùmero de iteraciones (niter) 

function [n,xn,fm,dfm,E] = newtonTabla(x0,Tol,niter)
format long
       syms x

        %f=sin(2*x)-(x/(3))^3+0.1;
        f = ((3/2) * x * 9 * log(x + 100)) + ((x^2) * log(x + 100)) + (((9 * 81)/16) * log(x + 100)); 
        df=diff(f);
        c=0;
        fm(c+1) = eval(subs(f,x0));
        fe=fm(c+1);
        dfm(c+1) = eval(subs(df,x0));
        dfe=dfm(c+1);
        E(c+1)=Tol+1;
        error=E(c+1);
        xn(c+1)=x0;
        N(c+1)=c;
        while error>Tol && fe~=0 && c<niter 
            xn(c+2)=x0-fe/dfe;
            fm(c+2)=eval(subs(f,xn(c+2)));
            fe=fm(c+2);
            dfm(c+2)=eval(subs(df,xn(c+2)));
            dfe=dfm(c+2);
            E(c+2)=abs(xn(c+2)-x0);
            error=E(c+2);
            x0=xn(c+2)
            N(c+2)=c+1;
            c=c+1;
        end
        if fe==0
           s=x0;
           n=c;
           fprintf('%f es raiz de f(x) \n',x0)
        elseif error<Tol
           s=x0;
           n=c;
           fprintf('%f es una aproximación de una raiz de f(x) con una tolerancia= %f \n',x0,Tol)
           T = table(N', xn', fm', E', 'VariableNames', {'n', 'xn', 'fm', 'E'});
           disp(T);
        elseif dfe==0
           s=x0;
           n=c;
           fprintf('%f es una posible raiz múltiple de f(x) \n',x0)
   
        else 
           s=x0;
           n=c;
           fprintf('Fracasó en %f iteraciones \n',niter) 
        end
end