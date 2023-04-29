%Lagrange: Calcula los coeficienetes del polinomio de interpolación de
% grado n-1 para el conjunto de n datos (x,y), mediante el método de
% lagrange.
function [pol] = Lagrange(x,y)
    n=length(x);
    Tabla=zeros(n,n);
    for i=1:n
        Li=1;
        den=1;
        for j=1:n
            if j~=i
                paux=[1 -x(j)];
                Li=conv(Li,paux);
                den=den*(x(i)-x(j));
            end
        end
        Tabla(i,:)=y(i)*Li/den;
    end
    pol=sum(Tabla);

end