from django.urls import path
from . import views
from .autocomplete.autocomplete import vat_proxy

urlpatterns = [
    path('client/new/', views.CreateClientView.as_view(), name='new-client'),
    path('client/vat/<str:vat_number>/', vat_proxy, name='vat_proxy'),
    path('clients/list/', views.ClientsListView.as_view(), name='clients'),
    path('client/delete/<int:pk>/', views.ClientDeleteView.as_view(), name='client_delete'),
    path('credentials/new/', views.CreateCredentialsView.as_view(), name='new-credentials'),
    path('credentials/list/', views.CredentialsListView.as_view(), name='credentials'),
    path('credentials/connect/<int:client_id>/', views.ClientAutoLogin.as_view(), name='credentials_connect'),
    path('credentials/client/<int:client_id>/', views.CredentialsListView.as_view(), name='credentials_client'),
    path('credentials/delete/<int:pk>/', views.CredentialsDeleteView.as_view(), name='credentials_delete'),
    path('project/new/', views.CreateProjectView.as_view(), name='new-project'),
    path('project/list/', views.ProjectsListView.as_view(), name='projects'),
    path('project/client/<int:client_id>/', views.ProjectsListView.as_view(), name='projects_client'),
    path('project/delete/<int:pk>/', views.ProjectsDeleteView.as_view(), name='projects_delete'),
    path('tasks/new/', views.CreateTaskView.as_view(), name='new-task'),
    path('tasks/list/', views.TasksListView.as_view(), name='tasks'),
    path('tasks/client/<int:client_id>/', views.TasksListView.as_view(), name='tasks_client'),
    path('tasks/project/<int:project_id>/', views.TasksListView.as_view(), name='tasks_project'),
    path('tasks/client/project/<int:client_id>/<int:project_id>/', views.TasksListView.as_view(), name='tasks_client_project'),
    path('tasks/delete/<int:pk>/', views.TasksDeleteView.as_view(), name='tasks_delete'),
]
