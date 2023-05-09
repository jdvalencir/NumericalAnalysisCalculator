import json
import matlab.engine
import os
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view

# Inicializa la sesión de MATLAB en el contexto de la aplicación
matlab_script_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'matlab_functions_cap2')
eng = matlab.engine.start_matlab()
eng.addpath(matlab_script_path)

def calcular_vardermonde(f_str, a, b, tol, niter):
    f = eng.eval("str2func(" + f_str + ")", nargout=1)
    raiz_aprox = eng.biseccion(f, matlab.double(a), matlab.double(b), matlab.double(tol))
    return raiz_aprox

def calcular_newton(f_str, x0, tol, niter):
    f = eng.eval("str2func(" + f_str + ")", nargout=1)
    raiz_aprox = eng.pf(f, matlab.double(x0), matlab.double(tol))
    return raiz_aprox

def calcular_lagrange(f_str, x0, tol, niter):
    f = eng.eval("str2func(" + f_str + ")", nargout=1)
    raiz_aprox = eng.pf(f, matlab.double(x0), matlab.double(tol))
    return raiz_aprox

def calcular_spline_lineal(f_str, x0, tol, niter):
    f = eng.eval("str2func(" + f_str + ")", nargout=1)
    raiz_aprox = eng.pf(f, matlab.double(x0), matlab.double(tol))
    return raiz_aprox

# TODO - Hacer el spline cuadratico

def calcular_spline_cubico(f_str, x0, tol, niter):
    f = eng.eval("str2func(" + f_str + ")", nargout=1)
    raiz_aprox = eng.pf(f, matlab.double(x0), matlab.double(tol))
    return raiz_aprox

@csrf_exempt
@api_view(['POST'])
def calcular_vardermonde_view(request): 
    data = json.loads(request.body.decode('utf-8'))
    f_str = data.get('func')
    a = data.get('a')
    b = data.get('b')
    tol = data.get('tol')
    niter = data.get('niter')
    raiz_aprox = calcular_vardermonde(f_str, a, b, tol)
    return JsonResponse({ "raiz_aprox": raiz_aprox })

@csrf_exempt
@api_view(['POST'])
def calcular_newton_view(request): 
    data = json.loads(request.body.decode('utf-8'))
    f_str = data.get('func')
    f = eng.eval("str2func(" + f_str + ")", nargout=1)
    tol = data.get('tol')
    niter = data.get('niter')
    raiz_aprox = calcular_newton(f, tol, niter)
    return JsonResponse({ "raiz_aprox": raiz_aprox }) 

@csrf_exempt
@api_view(['POST'])
def calcular_lagrange_view(request): 
    data = json.loads(request.body.decode('utf-8'))
    f_str = data.get('func')
    f = eng.eval("str2func(" + f_str + ")", nargout=1)
    tol = data.get('tol')
    niter = data.get('niter')
    raiz_aprox = calcular_lagrange(f, tol, niter)
    return JsonResponse({ "raiz_aprox": raiz_aprox }) 


def calcular_spline_lineal_view(request): 
    data = json.loads(request.body.decode('utf-8'))
    f_str = data.get('func')
    f = eng.eval("str2func(" + f_str + ")", nargout=1)
    tol = data.get('tol')
    niter = data.get('niter')
    raiz_aprox = calcular_spline_lineal(f, tol, niter)
    return JsonResponse({ "raiz_aprox": raiz_aprox }) 

def calcular_spline_cubico_view(request): 
    data = json.loads(request.body.decode('utf-8'))
    f_str = data.get('func')
    f = eng.eval("str2func(" + f_str + ")", nargout=1)
    tol = data.get('tol')
    niter = data.get('niter')
    raiz_aprox = calcular_spline_cubico(f, tol, niter)
    return JsonResponse({ "raiz_aprox": raiz_aprox }) 