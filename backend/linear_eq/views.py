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
    iter, x, mt, mc, radioEspectral, error, mes, mes_err = eng.metodos_iterativos(
                matlab.double(A), matlab.double(b), matlab.double(x0), 
                matlab.double(tol), matlab.double(norm), matlab.double(niter), 
                matlab.double(l), matlab.double(w), nargout = 8
            )
    return iter, x, mt, mc, radioEspectral, error, mes, mes_err

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
    b = [np.array(b).flatten().tolist()]
    x0 = [np.array(x0).flatten().tolist()]
    print("A", a, "b", b, "x0", x0)
    iter, x, mt, mc, radioEspectral, error, mes, mes_err = calcular_metodos_iterativos(a, b, x0, tol, norm, niter, metodo, w)
    
    if len(mes_err) == 0:
        x_array = np.array(x._data).tolist()
        mt_array = np.array(mt._data).tolist()  # Convertir xr a una lista
        mc_array = np.array(mc._data).tolist()  # Convertir xu a una lista
        err_array = np.array(error._data).tolist()  # Convertir er a una lista

        x_reshape = np.reshape(x_array, (-1, len(mc_array[0]))).tolist()
        mt_reshape = np.array(mt_array).reshape(len(mc_array[0]),len(mc_array[0]), order='F').tolist()
        print("mt_reshape", mt_reshape)
        return JsonResponse({ 
            "iter": iter,
            "x": x_reshape,                        
            "mt": mt_reshape,
            "mc": mc_array,
            "radioEspectral": radioEspectral,
            "error": err_array,
            "mes": mes,
            "mes_err": mes_err,
        }, safe = False)
    else:
        return JsonResponse({
            "mes_err": mes_err,
        })