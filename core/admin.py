from django.contrib import admin

from core.models import Pledge, Depot, Need, UserProfile, Item


class PledgeAdmin(admin.ModelAdmin):
    model = Pledge


class NeedAdmin(admin.ModelAdmin):
    model = Need


class DepotAdmin(admin.ModelAdmin):
    model = Depot


class ItemAdmin(admin.ModelAdmin):
    model = Item


class UserProfileAdmin(admin.ModelAdmin):
    model = UserProfile


admin.site.register(Depot, DepotAdmin)
admin.site.register(Item, ItemAdmin)
admin.site.register(Need, NeedAdmin)
admin.site.register(Pledge, PledgeAdmin)
admin.site.register(UserProfile, UserProfileAdmin)
