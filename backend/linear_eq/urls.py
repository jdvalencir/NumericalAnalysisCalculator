from django.urls import path
from linear_eq import views

# URL paths para incluir en el url principal del proyecto
urlpatterns = [
    path('calcular_gauss_seidel/', views.calcular_gauss_seidel_view, name='calcular_gauss_seidel'),
    path('calcular_jacobi/', views.calcular_jacobi_view, name='calcular_jacobi'),
    path('calcular_sor/', views.calcular_sor_view, name='calcular_sor'),
]