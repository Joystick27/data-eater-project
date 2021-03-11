from django.urls import path

from .views import CreateUserView, CreateTokenView, ManageUserView, LogoutView

app_name = 'user'

urlpatterns = [
    path('create/', CreateUserView.as_view(), name='create'),
    path('login/', CreateTokenView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('me/', ManageUserView.as_view(), name='me'),
]
