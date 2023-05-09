import json
from django.shortcuts import render
import matlab.engine
import os
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view

# Inicializa la sesión de MATLAB en el contexto de la aplicación
matlab_script_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'matlab_functions')
eng = matlab.engine.start_matlab()
eng.addpath(matlab_script_path)

# Crea una función para ejecutar la función de bisección
def calcular_biseccion(f_str, a, b, tol, niter):
    f = eng.eval("str2func(" + f_str + ")", nargout=1)
    raiz_aprox = eng.biseccion(f, matlab.double(a), matlab.double(b), matlab.double(tol))
    return raiz_aprox

def calcular_punto_fijo(f_str, x0, tol, niter):
    f = eng.eval("str2func(" + f_str + ")", nargout=1)
    raiz_aprox = eng.pf(f, matlab.double(x0), matlab.double(tol))
    return raiz_aprox

def calcular_regula_falsi(f_str, x0, tol, niter):
    f = eng.eval("str2func(" + f_str + ")", nargout=1)
    raiz_aprox = eng.pf(f, matlab.double(x0), matlab.double(tol))
    return raiz_aprox

def calcular_newton(f_str, x0 , tol, niter):
    f = eng.eval("str2func(" + f_str + ")", nargout=1)
    raiz_aprox = eng.newton(f, matlab.double(x0), matlab.double(tol))
    return raiz_aprox

def calcular_raices_multiples(f_str, x0 , tol, niter):
    f = eng.eval("str2func(" + f_str + ")", nargout=1)
    raiz_aprox = eng.secante(f, matlab.double(x0), matlab.double(tol))
    return raiz_aprox

def calcular_secante(f_str, x0 , tol, niter):
    f = eng.eval("str2func(" + f_str + ")", nargout=1)
    raiz_aprox = eng.secante(f, matlab.double(x0), matlab.double(tol))
    return raiz_aprox


# Crea tu vista
@csrf_exempt
def calcular_biseccion_view(request): 
    data = json.loads(request.body.decode('utf-8'))
    f_str = data.get('func')
    a = data.get('a')
    b = data.get('b')
    tol = data.get('tol')
    niter = data.get('niter')
    raiz_aprox = calcular_biseccion(f_str, a, b, tol)
    return JsonResponse({ "raiz_aprox": raiz_aprox })

@csrf_exempt
@api_view(['POST'])
def calcular_punto_fijo_view(request): 
    data = json.loads(request.body.decode('utf-8'))
    f_str = data.get('func')
    f = eng.eval("str2func(" + f_str + ")", nargout=1)
    tol = data.get('tol')
    niter = data.get('niter')
    raiz_aprox = calcular_punto_fijo(f, tol, niter)
    return JsonResponse({ "raiz_aprox": raiz_aprox }) 

@csrf_exempt
@api_view(['POST'])
def calcular_regula_falsi_view(request): 
    data = json.loads(request.body.decode('utf-8'))
    f_str = data.get('func')
    f = eng.eval("str2func(" + f_str + ")", nargout=1)
    tol = data.get('tol')
    niter = data.get('niter')
    raiz_aprox = calcular_punto_fijo(f, tol, niter)
    return JsonResponse({ "raiz_aprox": raiz_aprox }) 

@csrf_exempt
@api_view(['POST'])
def calcular_newton_view(request): 
    data = json.loads(request.body.decode('utf-8'))
    f_str = data.get('func')
    f = eng.eval("str2func(" + f_str + ")", nargout=1)
    tol = data.get('tol')
    niter = data.get('niter')
    raiz_aprox = calcular_punto_fijo(f, tol, niter)
    return JsonResponse({ "raiz_aprox": raiz_aprox }) 

@csrf_exempt
@api_view(['POST'])
def calcular_raices_multiples_view(request): 
    data = json.loads(request.body.decode('utf-8'))
    f_str = data.get('func')
    f = eng.eval("str2func(" + f_str + ")", nargout=1)
    tol = data.get('tol')
    niter = data.get('niter')
    raiz_aprox = calcular_punto_fijo(f, tol, niter)
    return JsonResponse({ "raiz_aprox": raiz_aprox }) 

def calcular_secante_view(request):
    data = json.loads(request.body.decode('utf-8'))
    f_str = data.get('func')
    f = eng.eval("str2func(" + f_str + ")", nargout=1)
    tol = data.get('tol')
    niter = data.get('niter')
    raiz_aprox = calcular_punto_fijo(f, tol, niter)
    return JsonResponse({ "raiz_aprox": raiz_aprox }) 


@csrf_exempt
@api_view(['GET'])
def prueba(request):
    res = eng.sqrt(matlab.double(9))
    return JsonResponse({ "res": res }) 
