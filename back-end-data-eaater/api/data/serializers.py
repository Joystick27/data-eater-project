from rest_framework import serializers
import re
from .models import Data


class DataSerializer(serializers.ModelSerializer):
    """This is serializer for data model"""

    class Meta:
        model = Data
        fields = ("name", "email", "mobile_no", "description", "owner")

    def validate(self, attrs):
        if not re.search("^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$",
                         attrs['email']):
            raise serializers.ValidationError('email_invalid', code='signup')
        if not re.search("^[1-9]{1}[0-9]{9}$", str(attrs['mobile_no'])):
            raise serializers.ValidationError(
                'phone_no_invalid', code='signup')
        return super().validate(attrs)


class DataListSerializer(serializers.ModelSerializer):
    """This is serializer for data model"""

    class Meta:
        model = Data
        fields = ("name", "email", "mobile_no", "description", "pk")


