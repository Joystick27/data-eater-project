from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext as _

from .models import UserManager, User


class UserAdmin(UserAdmin):

    ordering = ['id']
    list_display = ['email', ]
    fieldsets = (
        (None, {'fields': ('email', 'password',)}),
        (_('Permissions'), {
            'fields': ('is_active', 'is_staff', 'is_superuser',)
        }),
        (_('Important dates'), {'fields': ('last_login',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2')
        })
    )


admin.site.register(User, UserAdmin)
