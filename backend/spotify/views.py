from django.shortcuts import render, redirect
from .credentials import CLIENT_SECRET, CLIENT_ID
from rest_framework.views import APIView
from requests import Request, post, get
from rest_framework import status
from rest_framework.response import Response
import base64
import pprint


    
class search(APIView):
    def get(self, request):
        endpoint = "https://accounts.spotify.com/api/token" 
        encoded = base64.b64encode("{}:{}".format(CLIENT_ID, CLIENT_SECRET).encode('utf-8')).decode('ascii')
        headers = {"Authorization": "Basic {}".format(encoded)}
        payload = {"grant_type": "client_credentials"}
        response = post(endpoint, headers=headers, data=payload).json()
        token = response.get('access_token')
        
        q = request.GET['q']     
        
        endpoint = "https://api.spotify.com/v1/search"
        headers = {"Authorization": "Bearer {}".format(token)}
        query_params ={
            'q': q,
            'type':'track',
            'market':'KR',
        }
        r = get(url=endpoint, params=query_params, headers=headers).json()
        return Response(r)
        
 
class featuredPlaylist(APIView):
    def get(self, request):     
        endpoint = "https://accounts.spotify.com/api/token"
        encoded = base64.b64encode("{}:{}".format(CLIENT_ID, CLIENT_SECRET).encode('utf-8')).decode('ascii')
        headers = {"Authorization": "Basic {}".format(encoded)}
        payload = {"grant_type": "client_credentials"}

        response = post(endpoint, headers=headers, data=payload).json()
        token = response.get('access_token')
        response = post(endpoint, headers=headers, data=payload).json()
        token = response.get('access_token')    
        endpoint = "https://api.spotify.com/v1/browse/featured-playlists"
        headers = {
            "Authorization": "Bearer {}".format(token)
        }
        """
        query_params ={
            'country': 'KR',
            'limit': 6,
        }
        r = get(url=endpoint, params=query_params, headers=headers).json()
        
        playlist = list(r['playlists']['items'])
        for x in playlist:
            pid.append(x['id'])
        """
        pid = []
        tid = []
        track_info = []
        feature_list = []
        pid = [ 
                #"37i9dQZF1DXdlsL6CGuL98", 
                "37i9dQZF1DX4RDXswvP6Mj",
                "37i9dQZF1DXbirtHQBuwCo",
                "37i9dQZF1DWWEcRhUVtL8n",
                "37i9dQZF1DX8j2fTnASZ3f" 
               ]
                
        for x in pid:
            endpoint = "https://api.spotify.com/v1/playlists/{}/tracks".format(x)
            query_params ={
                'market': 'KR',
                'limit': 100,
            }
            r = get(url=endpoint, params=query_params, headers=headers).json()
            itemlist = list(r['items'])  
            tmp = []
            for y in itemlist:
                if y['track']['id'] != "3kUJ9u148oaHwdKFT45qb3":
                    track_info.append(y)
                    tmp.append(y['track']['id'])
            tid.append(tmp) 
        
        cnt = 0
        for x in tid:
            str = ",".join(x)
            endpoint = "https://api.spotify.com/v1/audio-features"
            query_params ={
                "ids": "{}".format(str)
            }
            r = get(url=endpoint, params=query_params, headers=headers).json()
            for y in r['audio_features']:
                feature_list.append(y)
                        
        for i in range(0, len(track_info)):
            track_info[i].update(feature_list[i])
            
        return Response(track_info)


class getItem(APIView):
    def get(self, request):                
        endpoint = "https://api.spotify.com/v1/browse/featured-playlists"
        headers = {
            "Authorization": "Bearer {}".format(token)
        }
        query_params ={
            'country': 'KR',
            'limit': 6,
        }
        r = get(url=endpoint, params=query_params, headers=headers).json()
        return Response(r)
    