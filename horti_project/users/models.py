from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=30)  

    USERNAME_FIELD = 'email'  
    REQUIRED_FIELDS = ['username'] 
    

    def __str__(self):
        return self.username
