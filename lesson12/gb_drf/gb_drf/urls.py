"""gb_drf URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
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
from django.urls import path,re_path
from django.conf.urls import include
from rest_framework.routers import DefaultRouter
from rest_framework import permissions
from mainapp.views import MyUsersViewSet
from todo.views import TODOModelViewSet,ProjectModelViewSet
from rest_framework.authtoken.views import obtain_auth_token
from drf_yasg.views import get_schema_view
from drf_yasg import  openapi
from graphene_django.views import GraphQLView

schema_view = get_schema_view(
    openapi.Info(
        title='GB DRF application',
        default_version='1',
        description='doc for GB DRF application',
        contact=openapi.Contact(email='mrkuk@yandex.ru'),
        license=openapi.License(name='MIT License')
    ),
    public=True,
    permission_classes=[permissions.AllowAny]
)

router = DefaultRouter()
router.register('myusers', MyUsersViewSet)
router.register('projects', ProjectModelViewSet)
router.register('todos', TODOModelViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api-auth-token/', obtain_auth_token),
    path('api/', include(router.urls)),
    path('graphql/',GraphQLView.as_view(graphiql=True)),

    re_path(r'^swagger(?P<format>\.json|\.yaml)$',schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0),name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0),name='schema-redoc'),

]
