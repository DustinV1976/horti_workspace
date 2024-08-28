from django.db import models
from django.conf import settings

class Plant(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='plants')
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=100, blank=True)
    date_planted = models.DateField()

    def __str__(self):
        return self.name