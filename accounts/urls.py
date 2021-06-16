from django.urls import path, include
from . import views

urlpatterns = [
    path('main/', views.index, name='index'),
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('delete/', views.delete, name='delete'),
    path('password/', views.update_password, name='update_password'),
#    path('update/', views.update, name='update'),
    
    #소셜로그인
    path('accounts/', include('allauth.urls')),
]