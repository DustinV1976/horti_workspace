from rest_framework import serializers
from .models import Nutrient

class NutrientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nutrient
        fields = ['id', 'name', 'description', 'amount', 'unit', 'image', 'nitrogen', 'phosphorus', 'potassium']
        read_only_fields = ['user']