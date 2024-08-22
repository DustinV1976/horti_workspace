from django.contrib.auth import authenticate
from .models import CustomUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_404_NOT_FOUND,
    HTTP_204_NO_CONTENT,
)
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.permissions import AllowAny



class Sign_up(APIView):
    permission_classes = [AllowAny] 
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        if CustomUser.objects.filter(email=email).exists():
            return Response({"message": "User with this email already exists."}, status=status.HTTP_400_BAD_REQUEST)
        
        user = CustomUser.objects.create_user(username=email, email=email, password=password)
        token, _ = Token.objects.get_or_create(user=user)
        
        return Response({
            "message": "User created successfully",
            "token": token.key,
            "user": user.email
        }, status=status.HTTP_201_CREATED)




# class Sign_up(APIView):
#     def post(self, request):
#         request.data["username"] = request.data["email"]
#         custom_user = CustomUser.objects.create_user(**request.data)
#         token = Token.objects.create(user=custom_user)
#         return Response(
#             {"custom_user": custom_user.email, "token": token.key}, status=HTTP_201_CREATED
#         )
        
    


class Log_in(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        custom_user = authenticate(username=email, password=password)
        if custom_user:
            token, created = Token.objects.get_or_create(user=custom_user)
            return Response({"token": token.key, "custom_user": custom_user.email})
        else:
            return Response("No user matching credentials", status=HTTP_404_NOT_FOUND)
        
        
    
class Info(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"email": request.user.email})


class Log_out(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=HTTP_204_NO_CONTENT)
    
    
class Master_Sign_Up(APIView):

    def post(self, request):
        master_gardener = CustomUser.objects.create_user(**request.data)
        master_gardener.is_staff = True
        master_gardener.is_superuser = True
        master_gardener.save()
        token = Token.objects.create(user=master_gardener)
        return Response(
            {"master_gardener": master_gardener.email, "token": token.key}, status=HTTP_201_CREATED
        )