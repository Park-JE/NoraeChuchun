from django.shortcuts import render, redirect
import requests
from .models import UserPlaylist, Playlist, Music
from django.contrib.auth.decorators import login_required

@login_required
def myplaylist(req):
    username = req.user.username
    playlists = UserPlaylist.objects.filter(username=username)
    if req.method=='POST':
        print(req.POST)
        listname = req.POST.get('newTitle')
        desc = req.POST.get('newDesc')
        playlist = UserPlaylist( username=username, playlist=listname, desc=desc)
        playlist.save()
    context = {
        'playlists' : playlists,
    }
    return render(req, 'myplaylist.html', context)



def search(req):
    return render(req, 'search.html')
    
@login_required    
def myplaylist_list(req):
    return render(req, 'myplaylist-list.html')
    
def redirct_myplaylist(req):
    return redirect('/myplaylist')
    
def redirct_myplaylist_list(req):
    return redirect('/myplaylist-list')
    
def redirct_search(req):
    return redirect('/search')

"""

def deletePlaylist(req, playlist_id):
    Userplaylist = UserPlaylist.objects.get(listid=playlist_id)
    Userplaylist.delete()
    playlist = Playlist.objects.filter(listid=playlist_id)
    playlist.delete()
    return redirect('/myplaylist')
"""