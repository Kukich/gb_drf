from rest_framework.serializers import ModelSerializer
from mainapp.serializers import MyUsersModelSerializer
from .models import Project,TODO

class ProjectModelSerializer(ModelSerializer):
    users = MyUsersModelSerializer(many=True)
    class Meta:
        model = Project
        fields = '__all__'


class TODOModelSerializer(ModelSerializer):
    projects = ProjectModelSerializer(source='project',read_only=True)
    create_users = MyUsersModelSerializer(source='create_user',read_only=True)
    class Meta:
        model = TODO
        fields = '__all__'