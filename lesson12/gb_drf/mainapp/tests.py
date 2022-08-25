import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory,force_authenticate,APIClient,APISimpleTestCase,APITestCase
from mixer.backend.django import mixer
from .models import MyUsers
from .views import MyUsersViewSet
from django.contrib.auth.models import User

# Create your tests here.
class TestMyUsersViewSet(TestCase):
    def test_create_user(self):
        factory = APIRequestFactory()
        myuser = {
            'lastname': 'lastname',
            'firstname': 'firstname',
            'username': 'username',
            'email': 'email',
        }
        request = factory.post('/api/myusers/',myuser)
        superuser = User.objects.create_superuser('django', 'django@geekshop.local', 'django')
        force_authenticate(request,superuser)
        view = MyUsersViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_user(self):
        myuser = MyUsers.objects.create(
            lastname = 'lastname',
            firstname = 'firstname',
            username = 'username',
            email = 'email'
        )
        client = APIClient()
        response = client.get(f'/api/myusers/{myuser.uid}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_user(self):
        myuser = MyUsers.objects.create(
            lastname='lastname',
            firstname='firstname',
            username='username',
            email='email'
        )
        myuser2_json = {
            'lastname' : 'lastname2',
            'firstname' : 'firstname2',
            'username' : 'username2',
            'email' : 'email2'
        }
        client = APIClient()
        response = client.patch(f'/api/myusers/{myuser.uid}/',myuser2_json)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_user(self):
        myuser = MyUsers.objects.create(
            lastname='lastname',
            firstname='firstname',
            username='username',
            email='email'
        )
        myuser2_json = {
            'lastname' : 'lastname2',
            'firstname' : 'firstname2',
            'username' : 'username2',
            'email' : 'email2'
        }
        client = APIClient()
        superuser = User.objects.create_superuser('django', 'django@geekshop.local', 'django')
        client.login(username='django',password='django')
        response = client.patch(f'/api/myusers/{myuser.uid}/',myuser2_json)
        myuser_new = MyUsers.objects.get(pk=myuser.uid)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(myuser_new.lastname, 'lastname2')
        self.assertEqual(myuser_new.username, 'username2')