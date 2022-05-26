from django_filters import rest_framework as filters
from .models import Project,TODO

class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')
    class Meta:
        model = Project
        fields = ['name']

class TODOFilter(filters.FilterSet):
    date_create_start = filters.DateFilter(field_name="create_date", lookup_expr='gte')
    date_create_end = filters.DateFilter(field_name="create_date", lookup_expr='lte')
    project = filters.CharFilter(field_name="project", lookup_expr='exact')
    class Meta:
        model = TODO
        fields = ['date_create_start','date_create_end','project']
