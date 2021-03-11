from rest_framework import viewsets, generics, authentication, views, permissions
from django.shortcuts import render
from rest_framework.response import Response
from pyexcel_xlsx import get_data as xlsx_get
from rest_framework import views
import csv
import codecs
import io

from .serializers import DataSerializer, DataListSerializer
from .models import Data


class DataCreateApiView(views.APIView):
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticated, ]

    def post(self, request, format=None):
        try:
            data_file = request.FILES['file']
            data = xlsx_get(data_file, column_limit=4)
            rows = data.get('Sheet1')
            print(rows)
            for row in rows:
                data = {
                    "name": row[0],
                    "email": row[1],
                    "mobile_no": row[2],
                    "description": row[3],
                    "owner": self.request.user.id
                }
                serializer = DataSerializer(
                    data=data)
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
            return Response({"status": "confirmed"})
        except:
            return Response({"status": "invalid_file_format"})


class DataListApiView(generics.ListAPIView):
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = DataListSerializer

    def get_queryset(self):
        return Data.objects.all()


class ManageDataView(generics.RetrieveUpdateDestroyAPIView):
    """Manage the authenticated user"""
    serializer_class = DataListSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Data.objects.all()
