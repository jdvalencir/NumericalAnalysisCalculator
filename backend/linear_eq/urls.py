from django.urls import path
from linear_eq import views

# URL paths para incluir en el url principal del proyecto
urlpatterns = [
    path('calcular_metodos_iterativos/', views.calcular_metodos_iterativos_view , name='calcular_metodos_iterativos'),
]