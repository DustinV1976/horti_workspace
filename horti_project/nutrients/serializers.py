from rest_framework import serializers
from .models import Nutrient

class NutrientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nutrient
        fields = ['id', 'name', 'description', 'amount', 'nitrogen', 'phosphorus', 'potassium']
        read_only_fields = ['user']

    def create(self, validated_data):
        user = self.context['request'].user
        return Nutrient.objects.create(user=user, **validated_data)