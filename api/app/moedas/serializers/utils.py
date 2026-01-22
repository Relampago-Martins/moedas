from rest_framework import serializers
from rest_framework.relations import PKOnlyObject


class MyPrimaryKeyRelatedField(serializers.PrimaryKeyRelatedField):
    """This is a custom PrimaryKeyRelatedField that
    receves a serializer as argument and uses it into the
    to_representation method.
    """

    def __init__(self, serializer, **kwargs):
        self.serializer = serializer
        super().__init__(**kwargs)

    def to_representation(self, value):
        """Return the representation of the value."""
        pk = value
        if isinstance(value, PKOnlyObject):
            pk = value.pk
        obj = self.get_queryset().get(pk=pk)
        return self.serializer(obj).data
