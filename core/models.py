from django.contrib.auth.models import User
from django.db import models


class ItemStatus(models.Model):
    """
    Needed
    Pledged
    Fulfilled
    """
    status = models.CharField(max_length=255)


class PledgeGroup(models.Model):
    # name = models.CharField(max_length=255)
    users = models.ManyToManyField(User)


class NeededItem(models.Model):
    name = models.CharField(max_length=255)
    status = models.ForeignKey(ItemStatus, on_delete=models.CASCADE)
    expires_on = models.DateTimeField()
    quantity = models.IntegerField(default=1)
    pledge_group = models.ForeignKey(PledgeGroup, on_delete=models.CASCADE)


class Depot(models.Model):
    name = models.CharField(max_length=255)
    lat = models.FloatField()
    lon = models.FloatField()
    items = models.ManyToManyField(NeededItem)


class UserProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    lat = models.FloatField()
    lon = models.FloatField()
