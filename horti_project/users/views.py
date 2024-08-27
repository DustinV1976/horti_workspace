from django.shortcuts import render
from django.core.exceptions import ValidationError
from django.contrib.auth import login, logout, authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from .models import CustomUser
from rest_framework.permissions import AllowAny

# Create your views here.
class Sign_up(APIView):
    permission_classes = [AllowAny]  # Allow any user to access this view
    
    def post(self, request):
        data = request.data.copy()
        email = data.get('email')
        password = data.get('password')
        display_name = data.get('display_name')

        if not email or not password or not display_name:
            return Response({"error": "Email, password, and display name are required."}, status=HTTP_400_BAD_REQUEST)

        try:
            new_user = CustomUser.objects.create_user(
                username=email,
                email=email,
                password=password,
                display_name=display_name
            )
            login(request, new_user)
            token, _ = Token.objects.get_or_create(user=new_user)
            return Response({"user": new_user.display_name, "token": token.key}, status=HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response({"error": "Registration failed. Please ensure the data is correct."}, status=HTTP_400_BAD_REQUEST)

class Log_in(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(username=email, password=password)
        if user:
            login(request, user)
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "display_name": user.display_name
                },
                "token": token.key
            }, status=HTTP_200_OK)
        return Response({"error": "Invalid credentials"}, status=HTTP_400_BAD_REQUEST)

class TokenReq(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class Log_out(TokenReq):
    def post(self, request):
        request.user.auth_token.delete()
        logout(request)
        return Response(status=HTTP_204_NO_CONTENT)

class Info(TokenReq):
    def get(self, request):
        return Response({"user": request.user.display_name})
    
    
