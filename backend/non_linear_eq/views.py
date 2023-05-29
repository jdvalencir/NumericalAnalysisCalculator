import json
import matlab.engine
import os
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
import numpy as np

# Inicializa la sesión de MATLAB en el contexto de la aplicación
matlab_script_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'matlab_functions_cap1')
eng = matlab.engine.start_matlab()
eng.addpath(matlab_script_path)

def calcular_biseccion(f_str, a, b, niter, tol):
    f = eng.eval("str2func(" + f_str + ")", nargout=1)
    iter, ai, xm, bi, fm, err, mes, mes_err = eng.biseccion(f, matlab.double(a), matlab.double(b), matlab.double(niter), matlab.double(tol), nargout = 8)
    return iter, ai, xm, bi, fm, err, mes, mes_err

def calcular_punto_fijo(f_str, g_str, x0, tol, niter):
    f = eng.eval("str2func(" + f_str + ")", nargout=1)
    g = eng.eval("str2func(" + g_str + ")", nargout=1)
    c , xn, fm, gm, err, mes, mes_err = eng.pf(f, g, matlab.double(x0), matlab.double(tol), matlab.double(niter), nargout=7)
    return c , xn, fm, gm, err, mes, mes_err

def calcular_regula_falsi(f_str, a, b, niter, tol):
    f = eng.eval("str2func(" + f_str + ")", nargout=1)
    iter, ai, xm, bi, fm, err, mes, mes_err  = eng.rf(f, matlab.double(a), matlab.double(b),matlab.double(niter),  matlab.double(tol),  nargout=8)
    return iter, ai, xm, bi, fm, err, mes, mes_err

def calcular_newton(f_str, x0 , tol, niter):
    f = eng.eval("str2func(" + f_str + ")", nargout=1)
    n, xn, fm, dfm, error, mes, mes_err = eng.newton(f, matlab.double(x0), matlab.double(tol), matlab.double(niter),  nargout=7)
    return n, xn, fm, dfm, error, mes, mes_err

def calcular_raices_multiples(f_str, x0, tol, niter):
    f = eng.eval("str2func(" + f_str + ")", nargout=1)
    n, xn, fm, dfm, d2fm, error, mes, mes_err = eng.raices_multiples(f, matlab.double(x0), matlab.double(tol), matlab.double(niter),  nargout=8)
    return n, xn, fm, dfm, d2fm, error, mes, mes_err

def calcular_secante(f_str, x0 , x1, tol, niter):
    f = eng.eval("str2func(" + f_str + ")", nargout=1)
    n, xn, fm, error, mes, mes_err = eng.secante(f, matlab.double(x0), matlab.double(x1), matlab.double(tol), matlab.double(niter),  nargout=6)
    return n, xn, fm, error, mes, mes_err

@csrf_exempt
@api_view(['POST'])
def calcular_biseccion_view(request): 
    data = json.loads(request.body.decode('utf-8'))
    f_str = data.get('func')
    a = data.get('a')
    b = data.get('b')
    tol = data.get('tol')
    niter = data.get('niter')
    iter, ai, xm, bi, fm, err, mes, mes_err = calcular_biseccion(f_str, a, b, niter, tol)
    if len(mes_err) == 0:
        if type(ai) != float: 
            ai_array = np.array(ai._data).tolist()  # Convertir xl a una lista
            xm_array = np.array(xm._data).tolist()  # Convertir xr a una lista
            bi_array = np.array(bi._data).tolist()  # Convertir xu a una lista
            fm_array = np.array(fm._data).tolist()
            err_array = np.array(err._data).tolist()  # Convertir er a una lista
            return JsonResponse({
                "Iter": iter,
                "a": ai_array,
                "xm": xm_array,
                "b": bi_array,
                "fm": fm_array,
                "err": err_array,
                "mes": mes,
                "mes_err": mes_err,
            }, safe=False)
        else:
            return JsonResponse({
                "Iter": iter,
                "a": ai,
                "xm": xm,
                "b": bi,
                "fm": fm,
                "err": err,
                "mes": mes,
                "mes_err": mes_err,
            }, safe=False)
    else: 
        return JsonResponse({
            "mes_err": mes_err
        })

@csrf_exempt
@api_view(['POST'])
def calcular_punto_fijo_view(request): 
    data = json.loads(request.body.decode('utf-8'))
    f_str = data.get('func')
    g_str = data.get('funcg')
    x0 = data.get('x0')
    tol = data.get('tol')
    niter = data.get('niter')
    iter, xn, fm, gm, err, mes, mes_err = calcular_punto_fijo(f_str, g_str, x0, tol, niter)
    if len(mes_err) == 0:
        if type(xn) != float:
            xn_array = np.array(xn._data).tolist()  # Convertir xl a una lista
            fm_array = np.array(fm._data).tolist()  # Convertir xr a una lista
            gm_array = np.array(gm._data).tolist()  # Convertir xu a una lista
            err_array = np.array(err._data).tolist()  # Convertir er a una lista 
            return JsonResponse({
                "Iter": iter,
                "xn": xn_array ,
                "fm": fm_array,
                "gm": gm_array,
                "err_array": err_array,
                "mes": mes,
                "mes_err": mes_err,
            }, safe=False)
        else: 
            return JsonResponse({
                "Iter": iter,
                "xn": xn ,
                "fm": fm,
                "gm": gm,
                "err_array": err,
                "mes": mes,
                "mes_err": mes_err,
            }, safe=False)
    else: 
        return JsonResponse({
            "mes_err": mes_err
        })

@csrf_exempt
@api_view(['POST'])
def calcular_regula_falsi_view(request): 
    data = json.loads(request.body.decode('utf-8'))
    f_str = data.get('func')
    a = data.get('a')
    b = data.get('b')
    tol = data.get('tol')
    niter = data.get('niter')
    iter, ai, xm, bi, fm, err, mes, mes_err = calcular_regula_falsi(f_str, a, b, niter, tol)
    if len(mes_err) == 0:
        if type(ai) != float: 
            ai_array = np.array(ai._data).tolist()  # Convertir xl a una lista
            xm_array = np.array(xm._data).tolist()  # Convertir xr a una lista
            bi_array = np.array(bi._data).tolist()  # Convertir xu a una lista
            fm_array = np.array(fm._data).tolist()
            err_array = np.array(err._data).tolist()  # Convertir er a una lista
            return JsonResponse({
                "Iter": iter,
                "a": ai_array,
                "xm": xm_array,
                "b": bi_array,
                "fm": fm_array,
                "err": err_array,
                "mes": mes,
                "mes_err": mes_err,
            }, safe=False)
        else:
            return JsonResponse({
                "Iter": iter,
                "a": ai,
                "xm": xm,
                "b": bi,
                "fm": fm,
                "err": err,
                "mes": mes,
                "mes_err": mes_err,
            }, safe=False)
    else: 
        return JsonResponse({
            "mes_err": mes_err
        })

@csrf_exempt
@api_view(['POST'])
def calcular_newton_view(request): 
    data = json.loads(request.body.decode('utf-8'))
    f_str = data.get('func')
    x0 = data.get('x0')
    tol = data.get('tol')
    niter = data.get('niter')
    iter, xn, fm, dfm, err, mes, mes_err = calcular_newton(f_str, x0, tol, niter)
    if len(mes_err) == 0:
        if type(xn) != float: 
            xn_array = np.array(xn._data).tolist()  # Convertir xl a una lista
            fm_array = np.array(fm._data).tolist()  # Convertir xr a una lista
            dfm_array = np.array(dfm._data).tolist()
            err_array = np.array(err._data).tolist()  # Convertir er a una lista
            return JsonResponse({
                "Iter": iter,
                "xn": xn_array,
                "fm": fm_array,
                "dfm": dfm_array,
                "err_array": err_array,
                "mes": mes,
                "mes_err": mes_err,
            }, safe=False)
        else: 
            return JsonResponse({
                "Iter": iter,
                "xn": xn,
                "fm": fm,
                "dfm": dfm,
                "err_array": err,
                "mes": mes,
                "mes_err": mes_err,
            }, safe=False)
    else: 
        return JsonResponse({
            "mes_err": mes_err
        })

@csrf_exempt
@api_view(['POST'])
def calcular_raices_multiples_view(request): 
    data = json.loads(request.body.decode('utf-8'))
    f_str = data.get('func')
    x0 = data.get('x0')
    tol = data.get('tol')
    niter = data.get('niter')
    n, xn, fm, dfm, d2fm, err, mes, mes_err = calcular_raices_multiples(f_str, x0, tol, niter)
    if len(mes_err) == 0:
        if type(xn) != float: 
            xn_array = np.array(xn._data).tolist()  # Convertir xl a una lista
            fm_array = np.array(fm._data).tolist()  # Convertir xr a una lista
            dfm_array = np.array(dfm._data).tolist()  # Convertir xl a una lista
            d2fm_array = np.array(d2fm._data).tolist()  # Convertir xr a una lista
            err_array = np.array(err._data).tolist()  # Convertir er a una lista
            return JsonResponse({
                "Iter": n,
                "xn": xn_array,
                "fm": fm_array,
                "dfm_array": dfm_array,
                "d2fm_array": d2fm_array,
                "err_array": err_array,
                "mes": mes,
                "mes_err": mes_err,
            }, safe=False)
        else:
            return JsonResponse({
                "Iter": n,
                "xn": xn,
                "fm": fm,
                "dfm_array": dfm,
                "d2fm_array": d2fm,
                "err_array": err,
                "mes": mes,
                "mes_err": mes_err,
            }, safe=False)
    else:
        return JsonResponse({
            "mes_err": mes_err
        })

@csrf_exempt
@api_view(['POST'])
def calcular_secante_view(request):
    data = json.loads(request.body.decode('utf-8'))
    f_str = data.get('func')
    x0 = data.get('x0')
    x1 = data.get('x1')
    tol = data.get('tol')
    niter = data.get('niter')

    n, xn, fm, err, mes, mes_err = calcular_secante(f_str, x0, x1, tol, niter)
    if len(mes_err) == 0:
        if type(xn) != float: 
            xn_array = np.array(xn._data).tolist()  # Convertir xl a una lista
            fm_array = np.array(fm._data).tolist()  # Convertir xr a una lista
            err_array = np.array(err._data).tolist()  # Convertir er a una lista
            return JsonResponse({
                "Iter": n,
                "xn": xn_array,
                "fm": fm_array,
                "err_array": err_array,
                "mes": mes, 
                "mes_err": mes_err,
            }, safe=False)
        else:
            print("n", n, "xn", xn, "fm", fm, "err_array", err, "mes", mes, "mes_err", mes_err)
            return JsonResponse({
                "Iter": n,
                "xn": xn,
                "fm": fm,
                "err_array": err,
                "mes": mes,
                "mes_err": mes_err,
            }, safe=False)
    else:
        return JsonResponse({
            "mes_err": mes_err
        })