%Newtonint: Calcula los coeficienetes del polinomio de interpolación de
% grado n-1 para el conjunto de n datos (x,y), mediante el método de Newton
% con diferencias divididas.
function [Tabla,pol] = Newtonint(x,y)
    n=length(x);
    Tabla=zeros(n,n+1);
    Tabla(:,1)=x;
    Tabla(:,2)=y;
    for j=3:n+1
        for i=j-1:n
            Tabla(i,j)=(Tabla(i,j-1)-Tabla(i-1,j-1))/(Tabla(i,1)-Tabla(i-j+2,1));
        end
    end
    coef = diag(Tabla,1)
    n=length(x);
    pol=1;
    acum=pol;
    pol=coef(1)*acum;
    for i=1:n-1
        pol=[0 pol];
        acum=conv(acum,[1 -x(i)]);
        pol=pol+coef(i+1)*acum;
    end
    

end