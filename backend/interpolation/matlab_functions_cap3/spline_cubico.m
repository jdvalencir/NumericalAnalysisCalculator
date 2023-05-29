function [Tabla] = SplineCubico(x,y)
    n=length(x);
    A=zeros((3+1)*(n-1));
    b=zeros((3+1)*(n-1),1);
    cua=x.^2;
    cub=x.^3;

        c=1;
        h=1;
        for i=1:n-1
            A(i,c)=cub(i);
            A(i,c+1)=cua(i);
            A(i,c+2)=x(i);
            A(i,c+3)=1;
            b(i)=y(i);
            c=c+4;
            h=h+1;
        end
        
        c=1;
        for i=2:n
            A(h,c)=cub(i);
            A(h,c+1)=cua(i);
            A(h,c+2)=x(i);
            A(h,c+3)=1;
            b(h)=y(i);
            c=c+4;
            h=h+1;
        end
        
        c=1;
        for i=2:n-1
            A(h,c)=3*cua(i);
            A(h,c+1)=2*x(i);
            A(h,c+2)=1;
            A(h,c+4)=-3*cua(i);
            A(h,c+5)=-2*x(i);
            A(h,c+6)=-1;
            b(h)=0;
            c=c+4;
            h=h+1;
        end
        
        c=1;
        for i=2:n-1
            A(h,c)=6*x(i);
            A(h,c+1)=2;
            A(h,c+4)=-6*x(i);
            A(h,c+5)=-2;
            b(h)=0;
            c=c+4;
            h=h+1;
        end
        
        A(h,1)=6*x(1);
        A(h,2)=2;
        b(h)=0;
        h=h+1;
        A(h,c)=6*x(end);
        A(h,c+1)=2;
        b(h)=0;
  

    val=inv(A)*b;
    Tabla=reshape(val,3+1,n-1);
    Tabla=Tabla';
end
  