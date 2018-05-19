from django.contrib.auth.models import User
from django.test import TestCase


class UserProfileModelTestCase(TestCase):

    def test_get_closest_depot(self):
        """
        Todo
        """
        test_cases = [
            {
                'lat1': 37.383825,
                'lon1': -122.012746,
                'lat2': 37.383825,
                'lon2': -122.012746,
                'distance': 0,
            }
        ]

        user = User()
        user.save()
