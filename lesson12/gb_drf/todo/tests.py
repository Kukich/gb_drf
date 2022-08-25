import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory,force_authenticate,APIClient,APISimpleTestCase,APITestCase
from mixer.backend.django import mixer
from mainapp.models import MyUsers
from .views import TODOModelViewSet,ProjectModelViewSet
from .models import TODO,Project
from django.contrib.auth.models import User

# Create your tests here.
class TestTODOViewSet(TestCase):

    def test_get_todos(self):
        factory = APIRequestFactory()
        request = factory.get('/api/todos/')
        view = TODOModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code,status.HTTP_200_OK)

class TestProjectViewSet(APITestCase):

    def test_get_todos2(self):
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code,status.HTTP_200_OK)

    def test_edit_project(self):
        myuser = mixer.blend(MyUsers)
        myuser2 = mixer.blend(MyUsers)
        print(myuser)
 #       project = Project.objects.create(name = 'project',url = 'url')
        project = mixer.blend(Project)
        print(project.users)
        project.users.add(myuser)
        print("--------------------------------------------------------")
        print(project.users)
        project.save()
        response = self.client.get(f'/api/projects/{project.uid}/')
        print('---------------------------------------------')
        print(response.json())
        print('---------------------------------------------')
        superuser = User.objects.create_superuser('django', 'django@geekshop.local', 'django')
        self.client.login(username='django', password='django')
        project_json = {
            'name': 'project2',
            'url': 'url2',
        }
        response = self.client.patch(f'/api/projects/{project.uid}/', project_json)
        print(response.json())
        project_new = Project.objects.get(pk=project.uid)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(project_new.name, 'project2')
        self.client.login(username='django',password='django')



