function [f_val] = practica(f, a)
    syms x;
    f_sym = sym(f);
    f_val = eval(subs(f_sym, x, a));
end
