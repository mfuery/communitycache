from rest_framework import routers

from api.views import (
    DepotViewSet,
    ItemViewSet,
    NeedViewSet,
    PledgeViewSet,
    UserProfileViewSet,
)

router = routers.DefaultRouter()
router.register(r'depots', DepotViewSet)
router.register(r'items', ItemViewSet)
router.register(r'pledges', PledgeViewSet)
router.register(r'needs', NeedViewSet)
router.register(r'user-profiles', UserProfileViewSet)

urlpatterns = [
    # more paths here
]

urlpatterns += router.urls
