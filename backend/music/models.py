from django.db import models

# Create your models here.
class UserPlaylist(models.Model): 
    listid = models.AutoField(primary_key=True)
    username=models.CharField(max_length=64, verbose_name='사용자명') 
    playlist=models.CharField(max_length=64, verbose_name='플레이리스트명') 
    desc=models.CharField(max_length=64, verbose_name='설명', null=True, blank=True)
    
class Playlist(models.Model):
    listid = models.IntegerField(verbose_name='플레이리스트id')
    song = models.IntegerField(verbose_name='노래번호')
    registered=models.DateTimeField(auto_now_add=True, verbose_name='등록')
    
class Music(models.Model):
    id = models.IntegerField(primary_key=True)
    title=models.CharField(max_length=64, verbose_name='제목') 
    artist=models.CharField(max_length=64, verbose_name='가수') 
    album=models.CharField(max_length=64, verbose_name='앨범명') 
    data=models.CharField(max_length=64, verbose_name='출시일') 
    cover=models.CharField(max_length=64, verbose_name='앨범커버') 