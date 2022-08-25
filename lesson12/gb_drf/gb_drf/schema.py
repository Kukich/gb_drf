import graphene
from graphene_django import DjangoObjectType
from mainapp.models import MyUsers
from todo.models import Project,TODO

class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'

class MyUsersType(DjangoObjectType):
    class Meta:
        model = MyUsers
        fields = '__all__'

class Query(graphene.ObjectType):
    all_projects = graphene.List(ProjectType)
    all_myusers = graphene.List(MyUsersType)
    projects_by_user = graphene.List(ProjectType,username=graphene.String())

    def resolve_all_projects(self,info):
        return Project.objects.all()

    def resolve_all_myusers(self,info):
        return MyUsers.objects.all()

    def resolve_projects_by_user(self,info,username):
        projects = Project.objects.all()
        if(username):
            projects = projects.filter(users__username=username)
        return projects

class MyUserMutation(graphene.Mutation):
    class Arguments:
        uid = graphene.String()
        firstname = graphene.String()
        lastname = graphene.String()
        username = graphene.String()
        email = graphene.String()

    user = graphene.Field(MyUsersType)
    @classmethod
    def mutate(cls,root,info,uid,firstname=None,lastname=None,username=None,email=None):
        print(dir(root))
        print(dir(info))
        print(uid)
        myuser= MyUsers.objects.get(pk=uid)
        if(firstname):
            myuser.firstname=firstname
        if(lastname):
            myuser.lastname = lastname
        if(username):
            myuser.username = username
        if(email):
            myuser.email = email
        myuser.save()
        return MyUserMutation(user=myuser)

class Mutate(graphene.ObjectType):
    update_myuser=MyUserMutation.Field()


schema = graphene.Schema(query = Query,mutation=Mutate)