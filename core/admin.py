from django.contrib import admin

from core.models import PledgeGroup, Depot, UserProfile, NeededItem


class PledgeGroupAdmin(admin.ModelAdmin):
    model = PledgeGroup


class NeededItemAdmin(admin.ModelAdmin):
    model = NeededItem


class DepotAdmin(admin.ModelAdmin):
    model = Depot


class UserProfileAdmin(admin.ModelAdmin):
    model = UserProfile
