from rest_framework import serializers


class MyPrimaryKeyRelatedField(serializers.PrimaryKeyRelatedField):
    """
    This is a custom PrimaryKeyRelatedField that
    receves a serializer as argument and uses it into the
    to_representation method.
    """

    def __init__(self, serializer, **kwargs):
        self.serializer = serializer
        super().__init__(**kwargs)

    def to_representation(self, value):
        obj = self.get_queryset().get(pk=value)
        return self.serializer(obj).data
