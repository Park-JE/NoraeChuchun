from rest_framework import serializers
from .models import Playlist, Track, Category, PlaylistTrack, Relation
from django.contrib.auth.models import User
 

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)
        
class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = ("id", "name", "artist", "album", "image", "preview_url")

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("tag",)

class PlaylistTrackSerializer(serializers.ModelSerializer):
    track_id = serializers.ReadOnlyField(source='track.id')
    track_name = serializers.ReadOnlyField(source='track.name')
    track_artist = serializers.ReadOnlyField(source='track.artist')
    track_album = serializers.ReadOnlyField(source='track.album')
    track_image = serializers.ReadOnlyField(source='track.image')
    audio = serializers.ReadOnlyField(source='track.preview_url')
    
    class Meta:
        model = PlaylistTrack
        fields = ('track_id', 'track_name', 'track_artist', 'track_album', 'track_image', 'audio', 'created_at')
    
    
class PlaylistSerializer(serializers.ModelSerializer):
    tracks = PlaylistTrackSerializer(source='playlisttrack_set', many=True)
    category = CategorySerializer(many=True)
    
    class Meta:
        model = Playlist
        fields = ("id", "title", "desc", "user_id", "tracks", "category", "public")
"""
    def create(self, validated_data):
        tracks_data = validated_data.pop('tracks')
        category_data = validated_data.pop('category')
        playlist = Playlist.objects.create(**validated_data)
        for track_data in tracks_data:
            Track.objects.create(playlist=playlist, **track_data)
        for tag_data in category_data:
            Track.objects.create(playlist=playlist, **track_data)
        return playlist
"""
        
class RelationSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    friends = UserSerializer(many=True)
    
    class Meta:
        model = Relation
        fields = ('user', 'friends')