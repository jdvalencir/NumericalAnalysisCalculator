from django.urls import path
from interpolation import views

# URL paths para incluir en el url principal del proyecto
urlpatterns = [
    path('calcular_vandermonde/', views.calcular_vardermonde_view , name='calcular_vardermonde'),
    path('calcular_newton/', views.calcular_newton_view, name='calcular_newton'),
    path('calcular_lagrange/', views.calcular_lagrange_view, name='calcular_lagrange'),
    path('calcular_spline_lineal/', views.calcular_spline_lineal_view , name='calcular_spline_lineal'),
    path('calcular_spline_cuadrado/', views.calcular_spline_cuadrado_view , name='calcular_spline_cuadrado'),
    path('calcular_spline_cubico/', views.calcular_spline_cubico_view , name='calcular_spline_cubico'),
]