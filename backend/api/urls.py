from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.CreateUserView.as_view(), name='create'),
    path('clients/', views.ClientsListView.as_view(), name='clients'),
    path('clients/delete/<int:pk>/', views.ClientDeleteView.as_view(), name='client_delete'),
    path('credentials/', views.CredentialsListView.as_view(), name='credentials'),
    path('credentials/<int:client_id>/', views.CredentialsListView.as_view(), name='credentials_client'),
    path('credentials/delete/<int:pk>/', views.CredentialsDeleteView.as_view(), name='credentials_delete'),
    path('projects/', views.ProjectsListView.as_view(), name='projects'),
    path('projects/<int:client_id>/', views.ProjectsListView.as_view(), name='projects_client'),
    path('projects/delete/<int:pk>/', views.ProjectsDeleteView.as_view(), name='projects_delete'),
    path('tasks/', views.TasksListView.as_view(), name='tasks'),
    path('tasks/<int:client_id>/', views.TasksListView.as_view(), name='tasks_client'),
    path('tasks/<int:project_id>/', views.TasksListView.as_view(), name='tasks_project'),
    path('tasks/<int:client_id>/<int:project_id>/', views.TasksListView.as_view(), name='tasks_client_project'),
    path('tasks/delete/<int:pk>/', views.TasksDeleteView.as_view(), name='tasks_delete'),
]
