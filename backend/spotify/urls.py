from django.urls import path, include
from . import views

urlpatterns = [
    path('search', views.search.as_view()),
    path('featured', views.featuredPlaylist.as_view()),
]