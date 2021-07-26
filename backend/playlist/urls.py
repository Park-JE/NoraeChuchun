from django.urls import path, include
from .views import PlaylistViewSet, TrackViewSet, PlaylistTrackViewSet, RelationViewSet
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register("playlist", PlaylistViewSet, basename="playlist")
router.register("friend", RelationViewSet, basename="friend")
urlpatterns = router.urls











"""
urlpatterns = [
    path('', playlist),
    path('<int:pk>', playlist_detail),
    path('track', TrackViewSet.as_view({'get':'list', 'post':'create'})),
    path('playlist_track', PlaylistTrackViewSet.as_view({'get':'list', 'post':'create'})),
]"""