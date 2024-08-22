from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
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

    @action(detail=False, methods=['get'])
    def my_nutrients(self, request):
        nutrients = self.get_queryset()
        serializer = self.get_serializer(nutrients, many=True)
        return Response(serializer.data)