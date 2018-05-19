from logging import getLogger
from math import sin, cos, atan2, sqrt

from django.contrib.auth.models import User
from django.db import models

logger = getLogger()


def get_distance(lat1, lon1, lat2, lon2):
    # approximate radius of earth in km
    R = 6373.0

    lat2 = lat1
    lon2 = lon1
    dlon = lon2 - lon1
    dlat = lat2 - lat1

    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return R * c


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
    pledge_group = models.ForeignKey(PledgeGroup, on_delete=models.DO_NOTHING)


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
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    lat = models.FloatField()
    lon = models.FloatField()
    home_depot = models.ForeignKey(Depot, on_delete=models.DO_NOTHING)

    def get_closest_depot(self):
        """
        Call to google maps api
        :return:
        """
        distances = {}
        depots = Depot.objects.all()

        for depot in depots:
            distances[depot.id] = get_distance(self.lat, self.lon, depot.lat, depot.lon)

            logger.debug(
                f'lat/lon user:{self.lat},{self.lon} | '
                f'depot{depot.id}:{depot.lat},{depot.lon} | '
                f'dist={distances[depot.id]}km')

        depot_id = min(distances, key=distances.get)
        closest_depot = Depot.objects.get(pk=depot_id)
        return {
            'name': closest_depot.name,
            'lat': closest_depot.lat,
            'lon': closest_depot.lon,
        }

    def get_closest_needed_items(self, count=10):
        return [{
            'name': '',
            'image_url': '',
            'quantity': '',
            'lat': '',
            'lon': '',
            'distance': '',
        }]
