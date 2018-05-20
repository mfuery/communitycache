from logging import getLogger
from math import sin, cos, atan2, sqrt

from django.contrib.auth.models import User
from django.db import models
from django.db.models import Sum
from django.db.models.signals import post_save
from django.dispatch import receiver

logger = getLogger()


def get_distance(lat1, lon1, lat2, lon2):
    # approximate radius of earth in km
    R = 6373.0

    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return R * c


class Pledge(models.Model):
    """
    M:M Users<->Needs
    """
    quantity = models.IntegerField(default=1)
    user_profile = models.ForeignKey('UserProfile', on_delete=models.CASCADE)
    need = models.ForeignKey('Need', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.need.item.name}[{self.quantity}]'


class Item(models.Model):
    """
    Ex: a roll of toilet paper
    """
    name = models.CharField(max_length=255)
    cost = models.DecimalField(max_digits=9, decimal_places=2)
    image = models.ImageField()

    def __str__(self):
        return f'{self.name}[${self.cost}]'


class Depot(models.Model):
    """
    Nationwide is on your side.
    """
    name = models.CharField(max_length=255)
    lat = models.DecimalField(max_digits=9, decimal_places=6)
    lon = models.DecimalField(max_digits=9, decimal_places=6)

    def get_pledges(self):
        pledges = Pledge.objects.filter(
            need__depot=self
        )

        # for pledge in pledges:
        # Todo: Adorn with distance data?

        return pledges

    def get_needed_items(self):
        items = Need.objects.filter(depot=self)
        return items

    def __str__(self):
        return f'{self.name}[{self.lat},{self.lon}]'


class Need(models.Model):
    """
    Ex: Nationwide Depot needs 100 rolls of toilet paper
    """
    item = models.ForeignKey(Item, on_delete=models.DO_NOTHING)
    is_fulfilled = models.BooleanField(default=False)
    quantity = models.IntegerField(default=1)
    depot = models.ForeignKey(Depot, on_delete=models.DO_NOTHING)

    @property
    def quantity_fulfilled_so_far(self):
        pledges = Pledge.objects.filter(need=self).aggregate(
            quantity_sum=Sum('quantity')
        )

        return pledges['quantity_sum']

    @property
    def progress(self):
        pledges = Pledge.objects.filter(need=self).aggregate(
            quantity_sum=Sum('quantity')
        )

        return 0 if not pledges['quantity_sum'] \
            else round((pledges['quantity_sum'] / self.quantity) * 100, ndigits=2)

    def __str__(self):
        return f'{self.item.name}[{self.depot.name}]'


class UserProfile(models.Model):
    """
    User's location defines where the needed items are. (The user is carrying them)
    A user might have 12 rolls... that creates a new Pledge.
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    lat = models.DecimalField(max_digits=9, decimal_places=6, default=0.0)
    lon = models.DecimalField(max_digits=9, decimal_places=6, default=0.0)

    def get_closest_depot(self):
        """
        :return: Depot model
        """
        # Only 1 depot for the demo.
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
        return closest_depot

    def get_closest_needed_items(self, count=10):
        items = Item.objects.all()
        closest_depot = self.get_closest_depot()

        distances = {}

        for item in items:
            distances[item.id] = get_distance(self.lat, self.lon, closest_depot.lat, closest_depot.lon)

        nearby_items = min(distances, key=distances.get)
        return nearby_items

    def __str__(self):
        return f'{self.user.username}[{self.lat},{self.lon}]'


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)


# @receiver(post_save, sender=User)
# def save_user_profile(sender, instance, **kwargs):
#     instance.user_profile.save()
