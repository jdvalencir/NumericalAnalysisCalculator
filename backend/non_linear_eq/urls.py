from django.urls import path
from non_linear_eq import views

# URL paths para incluir en el url principal del proyecto
urlpatterns = [
    path('calcular_biseccion/', views.calcular_biseccion_view, name='calcular_biseccion'),
    path('calcular_punto_fijo/', views.calcular_punto_fijo_view, name='calcular_punto_fijo'),
    path('calcular_regula_falsi/', views.calcular_regula_falsi_view, name='calcular_regula_falsi'),
    path('calcular_newton/', views.calcular_newton_view, name='calcular_newton'),
    path('calcular_raices_multiples/', views.calcular_raices_multiples_view, name='calcular_raices_multiples'),
    path('calcular_secante/', views.calcular_secante_view, name='calcular_secante'),
]