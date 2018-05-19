from rest_framework import serializers

from core.models import Depot, Item, Pledge


class DepotSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=200)
    items = serializers.RelatedField(source='item')

    class Meta:
        model = Depot


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item


class PledgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pledge
