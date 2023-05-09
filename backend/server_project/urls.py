"""server_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from non_linear_eq import urls as non_linear_urls
from linear_eq import urls as linear_urls
from interpolation import ulrs as interp_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/non_linear_eq/', include('non_linear_eq.urls')),
    path('api/linear_eq/', include('linear_eq.urls')),
    path('api/interpolation/', include('interpolation.urls')),
]
