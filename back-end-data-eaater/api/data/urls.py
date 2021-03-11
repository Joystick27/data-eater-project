from django.urls import path

from .views import DataCreateApiView, DataListApiView, ManageDataView

app_name = 'transaction'

urlpatterns = [
    path('create/', DataCreateApiView.as_view(), name='create'),
    path('list/', DataListApiView.as_view(), name='list'),
    path('manage/<int:pk>/', ManageDataView.as_view(), name='manage'),
]
