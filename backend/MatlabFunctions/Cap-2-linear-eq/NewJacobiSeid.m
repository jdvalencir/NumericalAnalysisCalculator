%NewJacobiSeid: Calcula la aproximación siguiente a la solución del sistema
%Ax=b con base en una condición inicial x0,mediante el método de Jacobi o
%de Gauss Seidel, depende del método elegido, se elige 0 o 1 en met
%respectivamente

function x1 = NewJacobiSeid(x0,A,b,met)
    n=length(A);
    x1=x0;
    for i=1:n
        sum=0;
        for j=1:n
            if j~=i && met==0
                sum=sum+A(i,j)*x0(j);
            elseif j~=i && met==1
                sum=sum+A(i,j)*x1(j);
            end
        end
        x1(i)=(b(i)-sum)/A(i,i);
    end
end