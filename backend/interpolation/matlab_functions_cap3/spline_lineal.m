function [Tabla] = SplineLineal(x,y)
    n=length(x);
    A=zeros((1+1)*(n-1));
    b=zeros((1+1)*(n-1),1);


    c=1;
    h=1;
    for i=1:n-1
        A(i,c)=x(i);
        A(i,c+1)=1;
        b(i)=y(i);
        c=c+2;
        h=h+1;
    end
        
    c=1;
    for i=2:n
        A(h,c)=x(i);
        A(h,c+1)=1;
        b(h)=y(i);
        c=c+2;
        h=h+1;
    end
    val=inv(A)*b;
    Tabla=reshape(val,1+1,n-1);
    Tabla=Tabla';
end