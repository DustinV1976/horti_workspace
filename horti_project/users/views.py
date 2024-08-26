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

# Create your views here.
class Sign_up(APIView):
    def post(self, request):
        data = request.data.copy()
        data['username'] = request.data.get("username", request.data.get("email"))
        new_user = CustomUser(**data)
        try:    
            new_user.full_clean()
            new_user.set_password(data.get("password"))
            new_user.save()
            login(request, new_user)
            token = Token.objects.create(user=new_user)
            return Response({"user": new_user.display_name, "token": token.key}, status=HTTP_201_CREATED)
        except ValidationError as e:
            # Log the error for debugging and return a user-friendly message
            print(e)
            return Response({"error": "Registration failed. Please ensure the data is correct."}, status=HTTP_400_BAD_REQUEST)

class Log_in(APIView):
    def post(self, request):
        data = request.data.copy()
        data['username'] = request.data.get("username", request.data.get("email"))
        user = authenticate(username=data.get("username"), password=data.get("password"))
        if user:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            return Response({"user": user.display_name, "token": token.key}, status=HTTP_200_OK)
        return Response({"error": "Invalid credentials. Please try again."}, status=HTTP_400_BAD_REQUEST)

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
    
    
