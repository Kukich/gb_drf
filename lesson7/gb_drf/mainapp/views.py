from rest_framework import viewsets
from rest_framework.viewsets import mixins
from .models import MyUsers
from .serializers import MyUsersModelSerializer

class MyUsersViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin,viewsets.GenericViewSet):
    queryset = MyUsers.objects.all()
    serializer_class = MyUsersModelSerializer

