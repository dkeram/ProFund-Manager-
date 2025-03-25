from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Clients(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    address = models.TextField()
    vat_number = models.CharField(max_length=9)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
    

class Credentials(models.Model):
    client = models.ForeignKey(Clients, on_delete=models.CASCADE)
    public_service = models.CharField(max_length=100)
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    
    def __str__(self):
        return self.client.name
    

class Projects(models.Model):
    client = models.ForeignKey(Clients, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()
    comments = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
    

class Tasks(models.Model):
    project = models.ForeignKey(Projects, on_delete=models.CASCADE)
    client = models.ForeignKey(Clients, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    task = models.CharField(max_length=100)
    description = models.TextField()
    status = models.CharField(max_length=20, default='Pending')
    deadline = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.task