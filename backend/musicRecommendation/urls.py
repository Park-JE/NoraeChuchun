"""musicRecommendation URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
import accounts.views
import spotify.views
import music.views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', accounts.views.index, name='index'),
    path('spotify/', include('spotify.urls')),
    path('api/', include('playlist.urls')),
    
    #path('user/', include('accounts.urls')),
    path('delete', accounts.views.delete, name='delete'),
    
    path('index', accounts.views.redirect_index, name='redirct_index'),
    path('signup', accounts.views.signup, name='signup'),
    path('login', accounts.views.login, name='login'),        
    path('mypage', accounts.views.mypage, name='mypage'),
    path('myplaylist', music.views.myplaylist, name='myplaylist'),
    path('myplaylist-list', music.views.myplaylist_list, name='myplaylist_list'),
    path('playlist', accounts.views.playlist, name='playlist'),
    path('search', music.views.search, name='search'),
    path('secession', accounts.views.secession, name='secession'),
    path('share', accounts.views.share, name='share'),
    path('friendplaylist', accounts.views.friendplaylist, name='friendplaylist'),
    path('friendplaylist-list', accounts.views.friendplaylist_list, name='friendplaylist-list'),
    path('logout/', accounts.views.logout, name='logout'),
    
    path('index.html', accounts.views.redirect_index, name='redirct_index'),
    path('signup.html', accounts.views.redirct_signup, name='redirct_signup'),
    path('login.html', accounts.views.redirct_login, name='redirct_login'),        
    path('mypage.html', accounts.views.redirct_mypage, name='redirct_mypage'),
    path('myplaylist.html', music.views.redirct_myplaylist, name='redirct_myplaylist'),
    path('friendplaylist.html', accounts.views.redirct_friendplaylist, name='redirct_friendplaylist'),
    path('myplaylist-list.html', music.views.redirct_myplaylist_list, name='redirct_myplaylist_list'),
    path('playlist.html', accounts.views.redirct_playlist, name='redirct_playlist'),
    path('search.html', music.views.redirct_search, name='redirct_search'),
    path('secession.html', accounts.views.redirct_secession, name='redirct_secession'),
    path('share.html', accounts.views.redirct_share, name='redirct_share'),
    path('friendplaylist-list.html', accounts.views.redirct_friendplaylist_list, name='redirct_friendplaylist-list'),
    path('logout.html', accounts.views.redirct_logout, name='logout'),
    
    
    path('test', accounts.views.test, name='test'),
]
