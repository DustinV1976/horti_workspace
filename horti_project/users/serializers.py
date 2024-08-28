from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'password')  
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        try:
            print(f"Creating user with data: {validated_data}")
            user = CustomUser.objects.create_user(
                username=validated_data['username'],  
                email=validated_data['email'],
                password=validated_data['password']
            )
            return user
        except Exception as e:
            print(f"Error during user creation: {e}")
            raise serializers.ValidationError("Failed to create user. Please check the data provided.")
