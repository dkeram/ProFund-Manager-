from django.urls import path
from . import views

urlpatterns = [
    path('new/client/', views.CreateClientView.as_view(), name='new-client'),
    path('list/clients/', views.ClientsListView.as_view(), name='clients'),
    path('delete/client/<int:pk>/', views.ClientDeleteView.as_view(), name='client_delete'),
    path('new/credentials/', views.CreateCredentialsView.as_view(), name='new-credentials'),
    path('list/credentials/', views.CredentialsListView.as_view(), name='credentials'),
    path('connect/credentials/<int:client_id>/', views.ClientAutoLogin.as_view(), name='credentials_connect'),
    path('client/credentials/<int:client_id>/', views.CredentialsListView.as_view(), name='credentials_client'),
    path('delete/credential/<int:pk>/', views.CredentialsDeleteView.as_view(), name='credentials_delete'),
    path('new/project', views.CreateProjectView.as_view(), name='new-project'),
    path('list/projects/', views.ProjectsListView.as_view(), name='projects'),
    path('client/projects/<int:client_id>/', views.ProjectsListView.as_view(), name='projects_client'),
    path('delete/project/<int:pk>/', views.ProjectsDeleteView.as_view(), name='projects_delete'),
    path('new/task', views.CreateTaskView.as_view(), name='new-task'),
    path('list/tasks/', views.TasksListView.as_view(), name='tasks'),
    path('client/tasks/<int:client_id>/', views.TasksListView.as_view(), name='tasks_client'),
    path('project/tasks/<int:project_id>/', views.TasksListView.as_view(), name='tasks_project'),
    path('client/project/tasks/<int:client_id>/<int:project_id>/', views.TasksListView.as_view(), name='tasks_client_project'),
    path('delete/task<int:pk>/', views.TasksDeleteView.as_view(), name='tasks_delete'),
]
