import re
from django.contrib.auth import get_user_model, authenticate, logout
from rest_framework.response import Response
from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the user object"""
    confirm_password = serializers.CharField(write_only=True, required=False)
    new_password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = get_user_model()
        fields = ('email', 'password', 'confirm_password', 'new_password')
        extra_kwargs = {
            'password': {'write_only': True, 'min_length': 5},
            'confirm_password': {'write_only': True, 'min_length': 5},
            'new_password': {'write_only': True, 'min_length': 5},
        }

    def validate(self, attrs):

        if not re.search("^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$",
                         attrs['email']):
            raise serializers.ValidationError('email_invalid', code='signup')
        if not re.search("^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@!#$%^&*()_+-=]{8,}$",
                         attrs['password']):
            raise serializers.ValidationError(
                'password_invalid', code='signup')
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError(
                'password_do_not_match', code='signup')
        return attrs

    def create(self, validated_data):
        """Create a new user with encrypted password and return it"""
        password = validated_data.pop('confirm_password', None)

        return get_user_model().objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        """Update a user, setting the password correctly and return it"""
        password = validated_data.pop('password', None)
        if not instance.check_password(password):
            raise serializers.ValidationError(
                'invalid_credentials', code='signup')

        new_password = validated_data.pop('new_password', None)
        confirm_password = validated_data.pop('confirm_password', None)

        if new_password and confirm_password and \
                new_password == confirm_password:
            instance.set_password(new_password)
            instance.save()
        return instance


class AuthTokenSerializer(serializers.Serializer):
    """Serializer for the user authentication object"""
    email = serializers.CharField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False
    )

    def validate(self, attrs):
        """Validate and authenticate the user"""
        email = attrs.get('email')
        password = attrs.get('password')
        try:
            User.objects.get(email=email)
        except:
            raise serializers.ValidationError(
                "invalid_credentials", code='authentication')

        if User.objects.get(email=email).is_active == False:
            raise serializers.ValidationError(
                "user_not_activated", code='authentication')
        user = authenticate(
            request=self.context.get('request'),
            username=email,
            password=password
        )
        if not user:
            raise serializers.ValidationError(
                'invalid_credentials', code='authentication')

        attrs['user'] = user
        attrs['username'] = user.get_username()
        attrs['email'] = user.email
        return attrs
