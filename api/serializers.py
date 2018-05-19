from rest_framework import serializers

from core.models import Depot, Item, Pledge


class DepotSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=200)
    items = serializers.RelatedField(source='item', read_only=True)

    class Meta:
        model = Depot
        fields = '__all__'


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'



class PledgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pledge
        fields = '__all__'

