from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.
  

    
class Track(models.Model):
    id = models.BigAutoField(help_text="Track ID", primary_key=True)
    name = models.CharField(help_text="Track name", max_length=100)
    artist = models.CharField(help_text="Track artist", max_length=100)
    album = models.CharField(help_text="Track album", max_length=100)
    image = models.TextField(help_text="Track image")
    preview_url = models.TextField(help_text="Track preview_url", blank=True, null=True)
    
class Category(models.Model):
    id = models.BigAutoField(help_text="Category ID", primary_key=True)
    tag = models.CharField(help_text="Category tag", max_length=100)
    
class Playlist(models.Model):
    id = models.BigAutoField(help_text="Playlist ID", primary_key=True)
    title = models.CharField(help_text="Playlist title", max_length=100)
    desc = models.TextField(help_text="Playlist description", blank=True, null=True)    
    public = models.BooleanField(help_text="Playlist public", default=True)
    user_id = models.CharField(help_text="User ID", max_length=100)
    
    
    tracks = models.ManyToManyField(Track, related_name="track", through='PlaylistTrack')
    category = models.ManyToManyField(Category, related_name="category")
    like = models.ManyToManyField(User, related_name="like")
    
class PlaylistTrack(models.Model):
    playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE)
    track = models.ForeignKey(Track, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    

#friend

# url playlist_api/friend

class Relation(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    friends = models.ManyToManyField(User, related_name="user_friend")

@receiver(post_save, sender=User)
def create_user_relation(sender, instance, created, **kwargs):
    if created:
        Relation.objects.create(user=instance)
        
def save_relation(sender, instance, **kwargs):
    instance.relation.save()

    
   
    
#recommend model


class FeaturedItems(models.Model):
    id = models.CharField(help_text="spotify track id", primary_key=True, max_length=100)
    name = models.CharField(help_text="Track name", max_length=100)
    artist = models.CharField(help_text="Track artist", max_length=100)
    album = models.CharField(help_text="Track album", max_length=100)
    image = models.TextField(help_text="Track image")
    preview_url = models.TextField(help_text="preview_url")
    
    danceability = models.FloatField(help_text="audio features danceability")
    energy = models.FloatField(help_text="audio features energy")
    key = models.FloatField(help_text="audio features key")
    loudness = models.FloatField(help_text="audio features loudness")
    mode = models.FloatField(help_text="audio features mode")
    speechiness = models.FloatField(help_text="audio features speechiness")
    acousticness = models.FloatField(help_text="audio features acousticness")
    instrumentalness = models.FloatField(help_text="audio features instrumentalness")
    liveness = models.FloatField(help_text="audio features liveness")
    valence = models.FloatField(help_text="audio features valence")
    tempo = models.FloatField(help_text="audio features tempo")
    duration_ms = models.FloatField(help_text="audio features duration_ms")
    time_signature = models.FloatField(help_text="audio features time_signature")
    
    