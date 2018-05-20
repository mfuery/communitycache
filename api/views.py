# Create your views here.
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response

from api.serializers import DepotSerializer, ItemSerializer, PledgeSerializer, NeedSerializer, UserProfileSerializer
from core.models import Depot, Item, Pledge, Need, UserProfile


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


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
