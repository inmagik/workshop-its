from rest_framework import routers
from art.views import ArtistViewSet, ArtworkViewSet


router = routers.SimpleRouter()
router.register('artists', ArtistViewSet)
router.register('artworks', ArtworkViewSet)

urlpatterns = router.urls
