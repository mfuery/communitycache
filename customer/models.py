from django.db import models


# Create your models here.
class Customer(models.Model):
    nationwide_id = models.IntegerField()
    current_lat = models.FloatField()
    current_long = models.FloatField()
    home_lat = models.FloatField()
    home_long = models.FloatField()

    def get_customer_lat_long(self):
        raise NotImplementedError()
