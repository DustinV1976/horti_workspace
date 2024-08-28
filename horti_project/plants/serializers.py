from rest_framework import serializers
from .models import Plant

class PlantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plant
        fields = ['id', 'name', 'type', 'date_planted']

    def create(self, validated_data):
        return Plant.objects.create(**validated_data)