from django.shortcuts import render
from django.contrib.auth import login, logout, authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from .models import CustomUser

class Sign_up(APIView):
    permission_classes = [AllowAny]  
    
    def post(self, request):
        data = request.data.copy()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        
        print(f"Received data: username={username}, email={email}, password={password}")

        if not username or not email or not password:
            return Response({"error": "Username, email, and password are required."}, status=HTTP_400_BAD_REQUEST)

        try:
            if CustomUser.objects.filter(email=email).exists():
                return Response({"error": "Email is already registered."}, status=HTTP_400_BAD_REQUEST)

            new_user = CustomUser.objects.create_user(
                username=username,
                email=email,
                password=password
            )
            login(request, new_user)
            token, _ = Token.objects.get_or_create(user=new_user)
            return Response({
                "user": {
                    "id": new_user.id,
                    "username": new_user.username,
                    "email": new_user.email
                },
                "token": token.key
            }, status=HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response({"error": "Registration failed. Please ensure the data is correct."}, status=HTTP_400_BAD_REQUEST)

class Log_in(APIView):
    permission_classes = [AllowAny] 

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response({"error": "Email and password are required."}, status=HTTP_400_BAD_REQUEST)

        user = authenticate(username=email, password=password)
        if user:
            login(request, user)
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email
                },
                "token": token.key
            }, status=HTTP_200_OK)
        return Response({"error": "Invalid credentials"}, status=HTTP_400_BAD_REQUEST)

class Log_out(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        logout(request)
        return Response(status=HTTP_204_NO_CONTENT)

class Info(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"user": request.user.username})
