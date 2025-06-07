from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .autologin.autologin import AutoLogin_DYPA_AADE, AutoLogin_EFKA, AutoLogin_MY_AADE, AutoLogin_PSKE
from .serializers import UserSerializer, ClientsSerializer, CredentialsSerializer, ProjectsSerializer, TasksSerializer
from .models import Clients, Credentials, Projects, Tasks


# Create your views here.
# User views
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class UserMeView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
    def get_object(self):
        return self.request.user

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

# Clients views
class CreateClientView(generics.CreateAPIView):
    queryset = Clients.objects.all()
    serializer_class = ClientsSerializer
    permission_classes = [IsAuthenticated]

class ClientsListView(generics.ListCreateAPIView):
    queryset = Clients.objects.all()
    serializer_class = ClientsSerializer
    permission_classes = [IsAuthenticated]
    
class ClientDeleteView(generics.DestroyAPIView):
    serializer_class = ClientsSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        client_id = self.kwargs['pk']
        return Clients.objects.filter(pk=client_id)
    
class ClientAutoLogin(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request, client_id, public_service):
        client_id = self.kwargs['client_id']
        public_service = self.kwargs['public_service']
        credentials = Credentials.objects.filter(client=client_id)
        credentials = credentials.filter(public_service=public_service).first()
        username = credentials.username
        password = credentials.password
        if public_service == 'PSKE':
            AutoLogin_PSKE(username, password).login()
        elif public_service == 'EFKA':
            AutoLogin_EFKA(username, password).login()
        elif public_service == 'DYPA':
            AutoLogin_DYPA_AADE(username, password).login()
        else:
            AutoLogin_MY_AADE(username, password).login()


# Credentials views
class CreateCredentialsView(generics.CreateAPIView):
    queryset = Credentials.objects.all()
    serializer_class = CredentialsSerializer
    permission_classes = [IsAuthenticated]

class CredentialsListView(generics.ListCreateAPIView):
    queryset = Credentials.objects.all()
    serializer_class = CredentialsSerializer
    permission_classes = [IsAuthenticated]
    
class CredentialsDeleteView(generics.DestroyAPIView):
    serializer_class = CredentialsSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        credentials_id = self.kwargs['pk']
        return Credentials.objects.filter(pk=credentials_id)

class CredentialsClientView(generics.ListAPIView):
    serializer_class = CredentialsSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        client_id = self.kwargs['client_id']
        client = Clients.objects.get(pk=client_id)
        return Credentials.objects.filter(client=client)

# Projects views

class CreateProjectView(generics.CreateAPIView):
    queryset = Projects.objects.all()
    serializer_class = ProjectsSerializer
    permission_classes = [IsAuthenticated]

class ProjectsListView(generics.ListCreateAPIView):
    queryset = Projects.objects.all()
    serializer_class = ProjectsSerializer
    permission_classes = [IsAuthenticated]

class ProjectsDeleteView(generics.DestroyAPIView):
    serializer_class = ProjectsSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        project_id = self.kwargs['pk']
        return Projects.objects.filter(pk=project_id)


class ProjectsListView(generics.ListAPIView):
    serializer_class = ProjectsSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        client_id = self.kwargs['client_id']
        client = Clients.objects.get(pk=client_id)
        return Projects.objects.filter(client=client)

# Tasks views
class CreateTaskView(generics.CreateAPIView):
    queryset = Tasks.objects.all()
    serializer_class = TasksSerializer
    permission_classes = [IsAuthenticated]
    
class TasksListView(generics.ListCreateAPIView):
    queryset = Tasks.objects.all()
    serializer_class = TasksSerializer
    permission_classes = [IsAuthenticated]

class TasksUserView(generics.ListAPIView):
    serializer_class = TasksSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user_id = self.kwargs['user_id']
        user = User.objects.get(pk=user_id)
        return Tasks.objects.filter(user=user)
class TasksDeleteView(generics.DestroyAPIView):
    queryset = Tasks.objects.all()
    serializer_class = TasksSerializer
    permission_classes = [IsAuthenticated]

class TasksListView(generics.ListAPIView):
    serializer_class = TasksSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        client_id = self.kwargs['client_id']
        client = Clients.objects.get(pk=client_id)
        return Tasks.objects.filter(client=client)
    
class TasksListView(generics.ListAPIView):
    serializer_class = TasksSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        project_id = self.kwargs['project_id']
        project = Projects.objects.get(pk=project_id)
        return Tasks.objects.filter(project=project)

class TasksListView(generics.ListAPIView):
    serializer_class = TasksSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Tasks.objects.filter(user=user)