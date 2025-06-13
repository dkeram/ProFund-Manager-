from django.urls import path
from . import views
from .autocomplete.autocomplete import vat_proxy

urlpatterns = [
    path('user/me/', views.UserMeView.as_view(), name='user_me'),
    path('user/list/', views.UserListView.as_view(), name='user_list'),
    path('user/edit/<int:pk>/', views.UserEditView.as_view(), name='edit_user'),
    path('client/new/', views.CreateClientView.as_view(), name='new-client'),
    path('client/vat/<int:vat_number>/', vat_proxy, name='vat_proxy'),
    path('clients/list/', views.ClientsListView.as_view(), name='clients'),
    path('client/<int:pk>/', views.ClientListView.as_view(), name='client'),
    path('client/edit/<int:pk>/', views.ClientsEditView.as_view(), name='client_edit'),
    path('client/delete/<int:pk>/', views.ClientDeleteView.as_view(), name='client_delete'),
    path('credentials/new/', views.CreateCredentialsView.as_view(), name='new-credentials'),
    path('credentials/list/', views.CredentialsListView.as_view(), name='credentials'),
    path('credentials/connect/<int:client_id>/<str:public_service>/', views.ClientAutoLogin.as_view(), name='credentials_connect'),
    path('credentials/client/<int:client_id>/', views.CredentialsClientView.as_view(), name='credentials_client'),
    path('credentials/delete/<int:pk>/', views.CredentialsDeleteView.as_view(), name='credentials_delete'),
    path('project/new/', views.CreateProjectView.as_view(), name='new-project'),
    path('projects/list/', views.ProjectsListView.as_view(), name='projects'),
    path('projects/client/<int:client_id>/', views.ProjectsListView.as_view(), name='projects_client'),
    path('projects/delete/<int:pk>/', views.ProjectsDeleteView.as_view(), name='projects_delete'),
    path('tasks/new/', views.CreateTaskView.as_view(), name='new-task'),
    path('tasks/list/', views.TasksListView.as_view(), name='tasks'),
    path('tasks/user/<int:user_id>/', views.TasksUserView.as_view(), name='tasks_user'),
    path('tasks/client/<int:client_id>/', views.TasksListView.as_view(), name='tasks_client'),
    path('tasks/project/<int:project_id>/', views.TasksListView.as_view(), name='tasks_project'),
    path('tasks/client/project/<int:client_id>/<int:project_id>/', views.TasksListView.as_view(), name='tasks_client_project'),
    path('tasks/delete/<int:pk>/', views.TasksDeleteView.as_view(), name='tasks_delete'),
]
