from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .models import Nutrient
from .serializers import NutrientSerializer

class NutrientViewSet(viewsets.ModelViewSet):
    serializer_class = NutrientSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_queryset(self):
        return Nutrient.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save()