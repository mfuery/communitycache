# Create your views here.
from rest_framework import viewsets

from api.serializers import DepotSerializer, ItemSerializer, PledgeSerializer, NeedSerializer
from core.models import Depot, Item, Pledge, Need


class DepotViewSet(viewsets.ModelViewSet):
    queryset = Depot.objects.all()
    serializer_class = DepotSerializer


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class PledgeViewSet(viewsets.ModelViewSet):
    queryset = Pledge.objects.all()
    serializer_class = PledgeSerializer


class NeedViewSet(viewsets.ModelViewSet):
    queryset = Need.objects.all()
    serializer_class = NeedSerializer
