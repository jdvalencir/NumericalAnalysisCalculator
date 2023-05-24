import json
import matlab.engine
import os
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
import numpy as np
# Inicializa la sesión de MATLAB en el contexto de la aplicación
matlab_script_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'matlab_functions_cap2')
eng = matlab.engine.start_matlab()
eng.addpath(matlab_script_path)

def calcular_metodos_iterativos(A, b, x0, tol, norm, niter, l, w = 1):
    iter, x, mt, mc, radioEspectral, error = eng.metodos_iterativos(
                matlab.double(A), matlab.double(b), matlab.double(x0), 
                matlab.double(tol), matlab.double(norm), matlab.double(niter), 
                matlab.double(l), matlab.double(w), nargout = 6
            )
    return iter, x, mt, mc, radioEspectral, error

@csrf_exempt
@api_view(['POST'])
def calcular_metodos_iterativos_view(request): 
    data = json.loads(request.body.decode('utf-8'))
    a = data.get('A')
    b = data.get('b')
    x0 = data.get('x0')
    tol = data.get('tol')
    norm = data.get('norm')
    niter = data.get('niter')
    metodo = data.get('l')
    w = data.get('w')
    iter, x, mt, mc, radioEspectral, error = calcular_metodos_iterativos(a, b, x0, tol, norm, niter, metodo, w)
    x_array = np.array(x._data).tolist()  # Convertir xl a una lista
    mt_array = np.array(mt._data).tolist()  # Convertir xr a una lista
    mc_array = np.array(mc._data).tolist()  # Convertir xu a una lista
    err_array = np.array(error._data).tolist()  # Convertir er a una lista
    return JsonResponse({ 
        "iter": iter,
        "x": x_array,                        
        "mt": mt_array,
        "mc": mc_array,
        "radioEspectral": radioEspectral,
        "error": err_array    
    }, safe = False)