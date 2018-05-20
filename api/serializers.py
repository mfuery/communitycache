from rest_framework import serializers

from core.models import Depot, Item, Pledge, Need, UserProfile


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'


class PledgeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Pledge
        # depth = 2
        fields = '__all__'


class NeedSerializer(serializers.ModelSerializer):
    pledges = PledgeSerializer(read_only=True, many=True)
    item = ItemSerializer('item')
    class Meta:
        model = Need
        depth = 2
        fields = '__all__'


class DepotSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=200)
    item_set = serializers.RelatedField(source='item', read_only=True)
    need_set = NeedSerializer(many=True, read_only=True)

    class Meta:
        model = Depot
        fields = '__all__'


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'



