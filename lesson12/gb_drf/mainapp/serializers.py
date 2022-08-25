from rest_framework.serializers import ModelSerializer
from .models import MyUsers

class MyUsersModelSerializer(ModelSerializer):
    class Meta:
        model = MyUsers
        fields = '__all__'
