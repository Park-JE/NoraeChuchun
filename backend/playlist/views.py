from django.shortcuts import render
from rest_framework import viewsets
from .models import Playlist, PlaylistTrack, Track, Category, Relation
from .serializers import PlaylistSerializer, TrackSerializer, PlaylistTrackSerializer, CategorySerializer, UserSerializer, RelationSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
import pprint
from rest_framework.decorators import action
# Create your views here.
    
    
class PlaylistViewSet(viewsets.ModelViewSet):

    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer  
    def get_queryset(self):
        queryset = self.queryset
        uid = self.request.query_params.get('uid', None)
        title = self.request.query_params.get('title', None)
        if uid: 
            queryset = queryset.filter(user_id=uid)
            if title:
                queryset = queryset.filter(title=title) 
        return queryset
    
    
    def create(self, request):
        data = request.data     
        
        new_playlist = Playlist.objects.create(
            title = data['title'],
            user_id = data['user_id'],
            public = data['public'],
        )        
        new_playlist.save()
        
        if 'category' in data:
            for c in data['category']:
                tag_obj = Category.objects.get(tag = c['tag'])
                new_playlist.category.add(tag_obj)
        
        if 'tracks' in data:
            for t in data['tracks']:
                track_obj = Track.objects.get(name=t['track_name'], artist=t['track_artist'])
                new_playlist.tracks.add(track_obj)
        
        serializer = PlaylistSerializer(new_playlist)
        return Response(serializer.data)           
    
    
    # url playlist_api/playlist/{playlist_id}/add_record/
    @action(detail=True, methods=['patch'])
    def add(self, request, *args, **kwargs):
        id = kwargs['pk']
        playlist_obj = Playlist.objects.get(id = id)
        data = request.data
        
        if 'category' in data:
            for c in data['category']:
                tag_obj = Category.objects.get(tag = c['tag'])
                playlist_obj.category.add(tag_obj)
        if 'tracks' in data:
            for t in data['tracks']:
                if Track.objects.filter(name=t['track_name'], artist=t['track_artist']).exists():
                    track_obj = Track.objects.get(name=t['track_name'], artist=t['track_artist'])
                else:
                    if 'audio' in t:
                        track_obj = Track.objects.create(
                            name = t['track_name'],
                            artist = t['track_artist'],
                            album = t['track_album'],
                            image = t['track_image'],
                            preview_url = t['audio'],
                        )   
                    else:
                        track_obj = Track.objects.create(
                            name = t['track_name'],
                            artist = t['track_artist'],
                            album = t['track_album'],
                            image = t['track_image'],
                        )    
                playlist_obj.tracks.add(track_obj)
                
        if 'like' in data:
            for l in data['like']:
                user_obj = User.objects.get(username = l['username'])
                playlist_obj.like.add(user_obj)
                
        playlist_obj.save()        
        serializer = PlaylistSerializer(playlist_obj)
        return Response(serializer.data)           
    
    @action(detail=True, methods=['patch'])
    def delete(self, request, *args, **kwargs):
        id = kwargs['pk']
        playlist_obj = Playlist.objects.get(id = id)
        data = request.data
        
        if 'category' in data:
            for c in data['category']:
                tag_obj = Category.objects.get(tag = c['tag'])
                playlist_obj.category.remove(tag_obj)
        if 'tracks' in data:
            for t in data['tracks']:
                track_obj = Track.objects.get(name=t['track_name'], artist=t['track_artist'])
                playlist_obj.tracks.remove(track_obj)
                
        if 'like' in data:
            for l in data['like']:
                user_obj = User.objects.get(username = l['username'])
                playlist_obj.like.remove(user_obj)
                
        playlist_obj.save()        
        serializer = PlaylistSerializer(playlist_obj)
        return Response(serializer.data)           
        
class TrackViewSet(viewsets.ModelViewSet):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer
    
class PlaylistTrackViewSet(viewsets.ModelViewSet):
    queryset = PlaylistTrack.objects.all()
    serializer_class = PlaylistTrackSerializer
    

from django.contrib.auth.models import User
class RelationViewSet(viewsets.ModelViewSet):
    queryset = Relation.objects.all()
    serializer_class = RelationSerializer
    
    def get_queryset(self):
        queryset = self.queryset
        uid = self.request.query_params.get('uid', None)
        if uid: 
            queryset = queryset.filter(user__username=uid)
        return queryset

    # url playlist_api/friend/{username}/add_friend/
    @action(detail=True, methods=['patch'])
    def add(self, request, *args, **kwargs):
        id = kwargs['pk']
        relation_obj = Relation.objects.get(user__username = id)
        data = request.data
        for f in data['friends']:
            friend_obj = User.objects.get(username = f['username'])
            relation_obj.friends.add(friend_obj)
        serializer = RelationSerializer(relation_obj)
        return Response(serializer.data)
        
    # url playlist_api/friend/{username}/delete_friend/
    @action(detail=True, methods=['patch'])
    def delete(self, request, *args, **kwargs):
        id = kwargs['pk']
        relation_obj = Relation.objects.get(user__username = id)
        data = request.data
        for f in data['friends']:
            friend_obj = User.objects.get(username = f['username'])
            relation_obj.friends.remove(friend_obj)
        serializer = RelationSerializer(relation_obj)
        return Response(serializer.data)
       