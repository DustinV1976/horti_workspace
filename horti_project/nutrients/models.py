from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Nutrient(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='nutrients')
    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    amount = models.FloatField(default=0)
    nitrogen = models.FloatField(null=True, blank=True)
    phosphorus = models.FloatField(null=True, blank=True)
    potassium = models.FloatField(null=True, blank=True)

    def __str__(self):
        return self.name