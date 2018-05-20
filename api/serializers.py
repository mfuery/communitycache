from rest_framework import serializers
from rest_framework.fields import SerializerMethodField

from core.models import Depot, Item, Pledge, Need


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'


class PledgeSerializer(serializers.ModelSerializer):
    depot_set = serializers.PrimaryKeyRelatedField(source='depot', read_only=True)
    user_set = serializers.PrimaryKeyRelatedField(source='user_profile', read_only=True)

    class Meta:
        model = Pledge
        fields = '__all__'


class NeedSerializer(serializers.ModelSerializer):
    pledges = PledgeSerializer(read_only=True, many=True)
    class Meta:
        model = Need
        fields = '__all__'


class DepotSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=200)
    item_set = serializers.RelatedField(source='item', read_only=True)
    need_set = NeedSerializer(many=True, read_only=True)

    class Meta:
        model = Depot
        fields = '__all__'
