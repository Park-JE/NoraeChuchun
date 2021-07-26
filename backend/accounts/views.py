from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, PasswordChangeForm
from django.contrib import auth
from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required
from django.contrib.auth.hashers import check_password
from django.contrib.auth import update_session_auth_hash

def index(req):
    return render(req, 'index.html')
    
def redirect_index(req):
    return redirect('/')

def signup(req):
    if req.method == "POST":
        if User.objects.filter(username = req.POST['username']).exists():
            return render(req, 'signup.html', {'error':'이미 사용중이거나 탈퇴한 아이디입니다.'})
        if req.POST['password1'] == req.POST['password2']:
            user = User.objects.create_user(username = req.POST['username'], password = req.POST['password1'])
            auth.login(req, user, backend="django.contrib.auth.backends.ModelBackend")
            return redirect('/')
        else:
            return render(req, 'signup.html')#, {'error':'비밀번호가 일치하지 않습니다.'})
    else:
        return render(req, 'signup.html')


def login(req):
    if req.method == "POST":
        username = req.POST['username']
        password = req.POST['password']
        user = auth.authenticate(req, username = username, password = password)
        if user is not None:
            auth.login(req, user)
            return redirect('/')
        else:
            return render(req, 'login.html', {'error': '가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.'})
    else:
        return render(req, 'login.html')
        
@login_required
def logout(req):
    auth.logout(req)
    return redirect('/')
    
@require_POST
def delete(req):
    if req.user.is_authenticated:
        req.user.delete()
        auth.logout(req)
    return redirect('/')
 
@login_required
def update_password(req):
    if req.method=="POST":
        form = PasswordChangeForm(req.user, req.POST)
        if form.is_valid():
            user = form.save() #로그아웃됨
            update_session_auth_hash(req, user) #세션유지
            return redirect('/')
    else:
        form = PasswordChangeForm(req.user)
        return render(req, 'update_password.html', {'form':form})

@login_required
def mypage(req):
    user = req.user
    if req.method == "GET":
        return render(req, 'mypage.html', {'username' : user.username})
    else:
        print("POST")
        oldPassword = req.POST['oldPassword']
        newPassword = req.POST['newPassword']
        if check_password(oldPassword, user.password):
            print("before")
            user.set_password(newPassword)
            user.save()
            update_session_auth_hash(req, user)
            
            print("after")
            notice = "비밀번호가 변경되었습니다."
        else:
            print("error")
            notice = "기존 비밀번호가 일치하지 않습니다."
        context = {
            'username' : req.user.username,
            'notice' : notice,
        }
        return render(req, 'mypage.html', context)


@login_required
def secession(req):
    context = {
        'username' : req.user.username,
    }
    return render(req, 'secession.html', context)
    
@login_required    
def myplaylist_list(req):
    return render(req, 'myplaylist-list.html')
    
def playlist(req):
    return render(req, 'playlist.html')
    
def search(req):
    return render(req, 'search.html')
    
    
@login_required
def share(req):
    userlist = User.objects.exclude(username__in=['root', req.user.username])
    if req.method == "POST":
        userlist = User.objects.filter(username=req.POST['finduser'])
    context = {
        'userlist' : userlist,
    }
    return render(req, 'share.html', context)
    
    
from django.template.loader import render_to_string

def friendplaylist(req):
    return render(req, 'friendplaylist.html')

def friendplaylist_list(req):
    return render(req, 'friendplaylist-list.html')

def test(req):
    #str = render_to_string('test.js', {"userid":req.user.username,})
    return render(req, "test.html")#, {"str":str})
    
    
def redirct_signup(req):
    return redirect('/signup')

def redirct_login(req):
    return redirect('/login')

def redirct_mypage(req):
    return redirect('/mypage')

def redirct_playlist(req):
    return redirect('/playlist')

def redirct_secession(req):
    return redirect('/secession')

def redirct_share(req):
    return redirect('/share')
    
def redirct_friendplaylist(req):
    return redirect('/friendplaylist')

def redirct_friendplaylist_list(req):
    return redirect('/friendplaylist-list')

def redirct_logout(req):
    return redirect('/logout')

        
