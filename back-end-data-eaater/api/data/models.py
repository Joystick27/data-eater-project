from django.db import models
from django.conf import settings


class Data(models.Model):
    """This is model for subjects"""
    owner = models.ForeignKey(settings.AUTH_USER_MODEL,
                              on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    mobile_no = models.IntegerField()
    description = models.CharField(max_length=255)

    def __str__(self):
        return self.email
