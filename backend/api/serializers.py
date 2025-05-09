from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Clients, Credentials, Projects, Tasks


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name', 'is_staff']
        extra_kwargs = {
            'password': {'write_only': True, 'required': True},
            'email': {'required': True}
        }
        
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class ClientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clients
        fields = '__all__'
    
class CredentialsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Credentials
        fields = '__all__'   
        
class ProjectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projects
        fields = '__all__'

        
        
class TasksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields = '__all__'
