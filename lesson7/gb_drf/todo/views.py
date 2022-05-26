from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import LimitOffsetPagination
from .models import Project,TODO
from .filters import ProjectFilter,TODOFilter
from .serializers import TODOModelSerializer,ProjectModelSerializer


class ProjectPaginationClass(LimitOffsetPagination):
    default_limit = 10

class TODOPaginationClass(LimitOffsetPagination):
    default_limit = 20


class TODOModelViewSet(ModelViewSet):
    queryset = TODO.objects.all()
    serializer_class = TODOModelSerializer
    pagination_class = TODOPaginationClass
    filterset_class = TODOFilter
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        instance.save()
        serializer = TODOModelSerializer(instance)
        return Response(serializer.data)


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectPaginationClass
    filterset_class = ProjectFilter
