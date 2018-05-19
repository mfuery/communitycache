from django.contrib.auth.models import User
from django.db import models


# class ItemStatus(models.Model):
#     """
#     Probably not needed
#
#     Needed
#     Pledged
#     Fulfilled
#     """
#     status = models.CharField(max_length=255)


class PledgeGroup(models.Model):
    """
    Ex: Many users contribute to the total need of 100 rolls
    """
    users = models.ManyToManyField(User)


class NeededItem(models.Model):
    """
    Ex: Nationwide Depot needs 100 rolls of toilet paper
    """
    name = models.CharField(max_length=255)
    is_fulfilled = models.BooleanField(default=False)
    expires_on = models.DateTimeField()
    quantity = models.IntegerField(default=1)
    value_per_unit = models.FloatField(default=0.00)
    pledge_group = models.ForeignKey(PledgeGroup, on_delete=models.CASCADE)


class Depot(models.Model):
    """
    Nationwide is on your side.
    """
    name = models.CharField(max_length=255)
    lat = models.FloatField()
    lon = models.FloatField()
    items = models.ManyToManyField(NeededItem)


class UserProfile(models.Model):
    """
    User's lat/lon defines where the NeededItems are. (The user is carrying them)
    A user might have 12 rolls... that contributes to the PledgeGroup.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    lat = models.FloatField()
    lon = models.FloatField()
