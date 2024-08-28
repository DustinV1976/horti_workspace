from rest_framework import serializers
from .models import Plant

class PlantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plant
        fields = ['id', 'name', 'type', 'date_planted']

    def create(self, validated_data):
        request = self.context.get('request')
        plant = Plant.objects.create(user=request.user, **validated_data)
        return plant