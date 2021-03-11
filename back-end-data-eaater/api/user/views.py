from rest_framework import (views,
                            generics,
                            authentication,
                            permissions)
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.settings import api_settings
from rest_framework.response import Response


from .serializers import UserSerializer, AuthTokenSerializer


class CreateUserView(generics.CreateAPIView):
    """Create a new user in the system"""
    serializer_class = UserSerializer


class CreateTokenView(ObtainAuthToken):
    serializer_class = AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        email = serializer.validated_data['email']

        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key,
                         'email': email
                         })


class LogoutView(views.APIView):
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        request.user.auth_token.delete()
        return Response({"logout": "successfull"}, 200)


class ManageUserView(generics.RetrieveUpdateAPIView):
    """Manage the authenticated user"""
    serializer_class = UserSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        """Retrive and return authenticated user"""
        return self.request.user
