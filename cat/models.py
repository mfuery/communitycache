from django.db import models


# Create your models here.

class Catastrophe(models.Model):
    # TODO change this to geoip later
    latitude = models.FloatField()
    longitude = models.FloatField()
    start = models.DateTimeField()
    end = models.DateTimeField()


class NeededItem(models.Model):
    customer = models.ForeignKey()
    catastrophe = models.ForeignKey()


