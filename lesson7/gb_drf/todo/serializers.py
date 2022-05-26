from rest_framework.serializers import ModelSerializer
from mainapp.serializers import MyUsersModelSerializer
from .models import Project,TODO

class ProjectModelSerializer(ModelSerializer):
    users = MyUsersModelSerializer(many=True)
    class Meta:
        model = Project
        fields = '__all__'


class TODOModelSerializer(ModelSerializer):
    project = ProjectModelSerializer()
    create_user = MyUsersModelSerializer()
    class Meta:
        model = TODO
        fields = '__all__'