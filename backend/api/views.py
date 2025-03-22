from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer, ClientsSerializer, CredentialsSerializer, ProjectsSerializer, TasksSerializer
from .models import Clients, Credentials, Projects, Tasks


# Create your views here.
# User views
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

# Clients views
class ClientsListView(generics.ListCreateAPIView):
    queryset = Clients.objects.all()
    serializer_class = ClientsSerializer
    permission_classes = [IsAuthenticated]
    
class ClientDeleteView(generics.DestroyAPIView):
    queryset = Clients.objects.all()
    serializer_class = ClientsSerializer
    permission_classes = [IsAuthenticated]
      
# Credentials views
class CredentialsListView(generics.ListCreateAPIView):
    queryset = Credentials.objects.all()
    serializer_class = CredentialsSerializer
    permission_classes = [IsAuthenticated]
    
class CredentialsDeleteView(generics.DestroyAPIView):
    queryset = Credentials.objects.all()
    serializer_class = CredentialsSerializer
    permission_classes = [IsAuthenticated]

class CredentialsListView(generics.ListAPIView):
    serializer_class = CredentialsSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        client_id = self.kwargs['client_id']
        client = Clients.get(pk=client_id)
        return Credentials.objects.filter(client=client)

# Projects views
class ProjectsListView(generics.ListCreateAPIView):
    queryset = Projects.objects.all()
    serializer_class = ProjectsSerializer
    permission_classes = [IsAuthenticated]

class ProjectsDeleteView(generics.DestroyAPIView):
    queryset = Projects.objects.all()
    serializer_class = ProjectsSerializer
    permission_classes = [IsAuthenticated]

class ProjectsListView(generics.ListAPIView):
    serializer_class = ProjectsSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        client_id = self.kwargs['client_id']
        client = Clients.get(pk=client_id)
        return Projects.objects.filter(client=client)

# Tasks views
class TasksListView(generics.ListCreateAPIView):
    queryset = Tasks.objects.all()
    serializer_class = TasksSerializer
    permission_classes = [IsAuthenticated]
    
class TasksDeleteView(generics.DestroyAPIView):
    queryset = Tasks.objects.all()
    serializer_class = TasksSerializer
    permission_classes = [IsAuthenticated]

class TasksListView(generics.ListAPIView):
    serializer_class = TasksSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        client_id = self.kwargs['client_id']
        client = Clients.get(pk=client_id)
        return Tasks.objects.filter(client=client)
    
class TasksListView(generics.ListAPIView):
    serializer_class = TasksSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        project_id = self.kwargs['project_id']
        project = Projects.get(pk=project_id)
        return Tasks.objects.filter(project=project)

class TasksListView(generics.ListAPIView):
    serializer_class = TasksSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Tasks.objects.filter(user=user)