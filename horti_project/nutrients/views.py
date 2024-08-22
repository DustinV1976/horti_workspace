from rest_framework import viewsets
from .models import Nutrient
from .serializers import NutrientSerializer
from rest_framework.permissions import IsAuthenticated

class NutrientViewSet(viewsets.ModelViewSet):
    serializer_class = NutrientSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Nutrient.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)