from django.contrib import admin
from .models import Track, Playlist, Category, PlaylistTrack, Relation

admin.site.register(Track)
admin.site.register(Playlist)
admin.site.register(Category)
admin.site.register(PlaylistTrack)
admin.site.register(Relation)

# Register your models here.
