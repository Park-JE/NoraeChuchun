from django.urls import path, include
from . import views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
#    path('logout/', views.logout, name='logout'),
    path('delete/', views.delete, name='delete'),
    path('password/', views.update_password, name='update_password'),
#    path('update/', views.update, name='update'),
    
    #소셜로그인
    path('accounts/', include('allauth.urls')),
    
    path('mypage', views.mypage, name='mypage'),
    #path('myplaylist', views.myplaylist, name='myplaylist'),
    path('myplaylist-list', views.myplaylist_list, name='myplaylist_list'),
    path('playlist', views.playlist, name='playlist'),
    path('search', views.search, name='search'),
    path('secession', views.secession, name='secession'),
    path('share', views.share, name='share'),
    
]

