from django.db import models
from django.contrib.auth.models import (AbstractBaseUser,
                                        BaseUserManager,
                                        PermissionsMixin)
from django.utils import timezone


class UserManager(BaseUserManager):

    def create_user(self, email, password=None, **extra_fields):
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.is_active = True
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password=None, **extra_fields):
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(max_length=255, unique=True)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)

    date_joined = models.DateTimeField(default=timezone.now)

    objects = UserManager()

    USERNAME_FIELD = 'email'

    def get_username(self):
        return self.email

    def confirm_user(self):
        try:
            self.is_active = True
            self.save()
            return True
        except e:
            return False

    def get_phone(self):
        return self.phone
