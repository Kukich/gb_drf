from django.core.management.base import BaseCommand
from mainapp.models import MyUsers
from todo.models import TODO,Project
from django.contrib.auth.models import User
from random import randint

import os
import json


JSON_PATH = 'mainapp/json'

def load_from_json(file_name):
    with open(os.path.join(JSON_PATH, file_name + '.json'), 'r', encoding='utf-8') as infile:
        return json.load(infile)

class Command(BaseCommand):
    help = 'Fill DB new data'

    def handle(self, *args, **options):
        myusers = load_from_json('myusers')
        MyUsers.objects.all().delete()
        myusers_obj = []
        for user in myusers:
            myusers_obj.append(MyUsers(**user))
        MyUsers.objects.bulk_create(myusers_obj)
        count_users = MyUsers.objects.count()

        projects = load_from_json('projects')
        Project.objects.all().delete()
        projects_obj = []
        for project in projects:
            random_user = MyUsers.objects.all()[randint(0, count_users - 1)]
            project_obj = Project(**project)
            project_obj.save()
            project_obj.users.add(random_user)
        count_projects = Project.objects.count()

        todos = load_from_json('todos')
        TODO.objects.all().delete()
        todo_obj = []
        for todo in todos:
            random_project = Project.objects.all()[randint(0, count_projects - 1)]
            todo["create_user"] = random_project.users.all()[0]
            todo["project"] = random_project
            todo_obj.append(TODO(**todo))
        TODO.objects.bulk_create(todo_obj)


        # Создаем суперпользователя при помощи менеджера модели
        _superuser = User.objects.filter(username='django').first()
        if not _superuser:
           User.objects.create_superuser('django', 'django@geekshop.local', 'django')