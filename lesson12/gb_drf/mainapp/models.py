from django.db import models
from uuid import uuid4

class MyUsers(models.Model):
    uid = models.UUIDField(primary_key=True,default=uuid4)
    firstname = models.CharField(max_length=64)
    lastname = models.CharField(max_length=64)
    username = models.CharField(max_length=64)
    email = models.CharField(max_length=64,unique=True)
