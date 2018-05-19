from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, serializers
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from api.serializers import DepotSerializer, ItemSerializer, PledgeSerializer
from core.models import Depot, Item, Pledge


class DepotViewSet(viewsets.ModelViewSet):
    queryset = Depot.objects.all()
    serializers = DepotSerializer


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class PledgeViewSet(viewsets.ModelViewSet):
    queryset = Pledge.objects.all()
    serializer_class = PledgeSerializer
