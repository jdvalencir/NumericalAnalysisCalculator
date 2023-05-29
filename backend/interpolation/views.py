import json
import matlab.engine
import os
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
import numpy as np

# Inicializa la sesión de MATLAB en el contexto de la aplicación
matlab_script_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'matlab_functions_cap3')
eng = matlab.engine.start_matlab()
eng.addpath(matlab_script_path)

def calcular_vardermonde(x,y):
    #f = eng.eval("str2func(" + f_str + ")", nargout=1)
    coef_polinomio,matriz = eng.vandermonde(x,y,nargout = 2)
    return coef_polinomio,matriz

def calcular_newton(x,y):
    coef_polinomio,matriz = eng.newton(x,y,nargout = 2)
    return coef_polinomio,matriz

def calcular_lagrange(x,y):
    coef_polinomio = eng.lagrange(x,y)
    return coef_polinomio

def calcular_spline_lineal(x,y):
    tabla = eng.spline_lineal(x,y)
    return tabla

def calcular_spline_cuadrado(x,y):
    tabla = eng.spline_cuadrado(x,y)
    return tabla

def calcular_spline_cubico(x,y):
    tabla = eng.spline_cubico(x,y)
    return tabla

@csrf_exempt
@api_view(['POST'])
def calcular_vardermonde_view(request): 
    data = json.loads(request.body.decode('utf-8'))
    x = np.array(data.get('x'))
    y = np.array(data.get('y'))


    coeficientes, matriz = calcular_vardermonde(x,y)
    coeficientes = np.array(coeficientes).tolist()

    matriz = np.array(matriz).tolist()
    coeficientes.reverse()
    polinomio = f"{coeficientes[0]} + "
    for i in range(1,len(coeficientes)):
        polinomio += f"{coeficientes[i]} x^{i}"
        if(i<len(coeficientes)-1):
            polinomio += " + "
    polinomio = polinomio.replace('[','(')
    polinomio = polinomio.replace(']',')')
    print("polinomio: ",polinomio)
    return JsonResponse({ 
        "coeficientes_del_polinomio": coeficientes,
        "Polinomio":polinomio,
        "Matriz_de_Vandermonde": matriz 
                         })

@csrf_exempt
@api_view(['POST'])
def calcular_newton_view(request): 
    data = json.loads(request.body.decode('utf-8'))
    x = np.array(data.get('x'))
    y = np.array(data.get('y'))
    
    tabla, coeficientes = calcular_newton(x,y)
    coeficientes = np.array(coeficientes).tolist()
    tabla = np.array(tabla).tolist()

    coeficientes[0].reverse()
    print("coeficientes: ",coeficientes)

    polinomio = f"{coeficientes[0][0]} + "
    for i in range(1,len(coeficientes[0])):
        polinomio += f"{coeficientes[0][i]} x^{i}"    
        polinomio += " + "
    polinomio = polinomio.removesuffix(" + ")
    print(polinomio)
    return JsonResponse({ 
        "coeficientes_del_polinomio": coeficientes,
        "Polinomio":polinomio,
        "Tabla_diferencias_divididas": tabla 
                         })
@csrf_exempt
@api_view(['POST'])
def calcular_lagrange_view(request): 
    data = json.loads(request.body.decode('utf-8'))
    x = np.array(data.get('x'))
    y = np.array(data.get('y'))
    print("X es: ",x)
    
    coeficientes = calcular_lagrange(x,y)
    coeficientes = np.array(coeficientes).tolist()
    

    coeficientes[0].reverse()
    print("coeficientes: ",coeficientes)

    polinomio = f"{coeficientes[0][0]} + "
    for i in range(1,len(coeficientes[0])):
        polinomio += f"{coeficientes[0][i]} x^{i}"    
        polinomio += " + "
    polinomio = polinomio.removesuffix(" + ")
    print(polinomio)
    return JsonResponse({ 
        "coeficientes_del_polinomio": coeficientes,
        "Polinomio": polinomio
                         }) 

@csrf_exempt
def calcular_spline_lineal_view(request): 
    data = json.loads(request.body.decode('utf-8'))
    x = np.array(data.get('x'))
    y = np.array(data.get('y'))


    tabla = calcular_spline_lineal(x,y)
    tabla = np.array(tabla).tolist()
    trazadores = tabla.copy()
    for i in range(len(tabla)):
        trazadores[i] = f"{tabla[i][0]}x + {tabla[i][1]}"
    print(trazadores)
    return JsonResponse({ 
        "tabla": tabla,
        "trazadores": trazadores
                         })

@csrf_exempt
def calcular_spline_cuadrado_view(request): 
    data = json.loads(request.body.decode('utf-8'))
    x = np.array(data.get('x'))
    y = np.array(data.get('y'))


    tabla = calcular_spline_cuadrado(x,y)
    tabla = np.array(tabla).tolist()
    trazadores = tabla.copy()
    for i in range(len(tabla)):
        trazadores[i] = f"{tabla[i][0]}x^2 + {tabla[i][1]}x + {tabla[i][2]}"
    return JsonResponse({ 
        "tabla": tabla,
        "trazadores": trazadores
                         })

@csrf_exempt
def calcular_spline_cubico_view(request): 
    data = json.loads(request.body.decode('utf-8'))
    x = np.array(data.get('x'))
    y = np.array(data.get('y'))


    tabla = calcular_spline_cubico(x,y)
    tabla = np.array(tabla).tolist()
    trazadores = tabla.copy()
    for i in range(len(tabla)):
        trazadores[i] = f"{tabla[i][0]}x^3 + {tabla[i][1]}x^2 + {tabla[i][2]}x + {tabla[i][3]}"
    return JsonResponse({ 
        "tabla": tabla,
        "trazadores": trazadores
                         })