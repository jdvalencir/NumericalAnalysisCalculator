function [Tabla] = SplineCuadrado(x,y)
    n=length(x);
    A=zeros((2+1)*(n-1));
    b=zeros((2+1)*(n-1),1);
    cua=x.^2;

        c=1;
        h=1;
        for i=1:n-1
            A(i,c)=cua(i);
            A(i,c+1)=x(i);
            A(i,c+2)=1;
            b(i)=y(i);
            c=c+3;
            h=h+1;
        end
        
        c=1;
        for i=2:n
            A(h,c)=cua(i);
            A(h,c+1)=x(i);
            A(h,c+2)=1;
            b(h)=y(i);
            c=c+3;
            h=h+1;
        end
        
        c=1;
        for i=2:n-1
            A(h,c)=2*x(i);
            A(h,c+1)=1;
            A(h,c+3)=-2*x(i);
            A(h,c+4)=-1;
            b(h)=0;
            c=c+4;
            h=h+1;
        end
        
        A(h,1)=2;
        b(h)=0;
        
    val=inv(A)*b;
    Tabla=reshape(val,2+1,n-1);
    Tabla=Tabla';
end  