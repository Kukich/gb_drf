from django.db import models
from mainapp.models import MyUsers
from uuid import uuid4

class Project(models.Model):
    uid = models.UUIDField(primary_key=True,default=uuid4)
    name = models.CharField(max_length=64)
    url = models.CharField(max_length=255)
    users = models.ManyToManyField(MyUsers)

class TODO(models.Model):
    uid = models.UUIDField(primary_key=True,default=uuid4)
    create_date = models.DateField(auto_now_add=True)
    edit_date = models.DateField(auto_now=True)
    text = models.TextField()
    create_user = models.ForeignKey(MyUsers,on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

