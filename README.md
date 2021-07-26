# ⛅️ NOCHU - 날씨에 맞는 노래 추천

  <div align="center">
    <a href="https://www.youtube.com/watch?v=RCN3c2r-Li8">
      <img 
      src="https://user-images.githubusercontent.com/76957739/126946969-00e0d11a-0a24-42bc-b001-a43f1159070f.png" 
      alt="NOCHU" style="width:85%;">
    </a>
    <div> 📹 이미지를 클릭해 영상으로 확인하세요!</div> 
  </div>
</br>
</br>

## 💻 프로젝트 개요

<b>NOCHU</b>는 자신의 분위기에 맞는 플레이리스트를 생성하고 공유하는 <b>사용자 참여형 웹사이트</b>입니다. 유저들은 날씨, 시간, 계절 정보를 이용하여 자신의 개성을 드러낼 수 있는 플레이리스트를 생성하고 친구와 이를 공유할 수 있습니다. 또한 사이트 자체적으로 날씨/시간/계절을 기반으로한 알고리즘을 활용해 현재 사용자가 위치한 **날씨와 어울리는 플레이리스트와 음악을 추천**해줍니다.
</br>
</br>

## 📑 기능 설명

[ 메인 기능 ]

- 현재 위치와 날씨에 기반한 노래/ 플레이리스트 추천
- 새로운 플레이리스트 생성
- 검색을 통한 음악 검색 및 노래 내 플레이리스트에 담기
- 유저들의 플레이리스트를 외부로 공유
- 친구의 플레이리스트 조회
- 회원가입 및 로그인/로그아웃 - 장고 auth 사용

[ 세부 기능]

- 나의 플레이리스트 수정/삭제/공유
- 카테고리별 회원들의 플레이리스트 분류
- 친구 검색 및 추가/삭제
- 사용자 비밀번호 변경/ 탈퇴
- 다크모드/라이트모드 지원
- 모바일/ 테블릿/ PC 크기에 따른 반응형 렌더링 구현
- Spotify API 이용하여 노래 데이터 수집
- Django Rest Framework사용하여 Restful API 서버 구현
- 웹 보안 향상: letsencrypt 사용하여 https 적용
- SQLite3로 데이터 관리
- AWS EC2에 서버 배포
  </br>
  </br>

## 🛠 개발도구

<b>프론트엔드</b>

- JavaScript
- SCSS

<b>백엔드</b>

- Django
- SSLServer
- Django Rest Framework
- CORSHeader
- AWS EC2

<b>OpenAPI</b>

- 위치 검색 - OpenWeatherMap API
- 음악 검색, 감상 - 스포티파이 API
- 카카오톡 공유 - 카카오링크 API
  </br>
  </br>

## 서버 명세서

### DB 명세
  - **Track**
    - id : 노래 고유값
    - name : 노래 제목
    - artist : 가수명
    - album : 앨범명
    - image : 앨범아트
    - preview_url : 노래 미리듣기 url
- **Category**
    - id : 카테고리 고유값
    - tag : 카테고리명
- **Playlist**
    - id : 플레이리스트 고유값
    - title : 플레이리스트명
    - public : 공개여부
    - user_id : 생성자명
- **User**
    - id: 유저 고유값
    - username : 유저 아이디
    - password : 유저 비밀번호
- **Friend**
    - user : 친구 아이디
    <br>
### API 명세
- **Playlist**
    - 전체 플레이리스트 조회
      - GET api/playlist
    - 플레이리스트 생성
      - POST api/playlist
    - 특정 플레이리스트 조회
      - GET api/playlist/{playlist_id}
    - 특정 플레이리스트 일부 수정
      - PATCH api/playlist/{playlist_id}
    - 특정 플레이리스트 삭제
      - DELETE api/playlist/{playlist_id}
    - 플레이리스트에 곡이나 카테고리 추가
      - PATCH api/playlist/{playlist_id}/add
    - 플레이리스트에 곡이나 카테고리 삭제
      - PATCH api/playlist/{playlist_id}/delete
- **Friend**
    - 전체 유저 조회
      - GET api/friend
    - 친구 추가
      - PATCH api/friend/{username}/add
    - 친구 삭제
      - PATCH api/friend/{username}/delete
- **Spotify**
    - 노래 검색 결과 조회
      - GET spotify/search?q={string}
    - 추천 음악 목록 조회
      - GET spotify/featured
<br>
<br>

## 🌿 자세한 정보가 궁금하다면?

- [DB & API 명세서 & 서버 부하 테스트](https://nickel-saturnalia-707.notion.site/808ad53c024640d5ad3924a29a8354b7)
- [기능 설명서](https://www.notion.so/64c0d17613e3475eb165de9cfe9e7030)
- [날씨에 맞는 음악 추천 알고리즘](https://www.notion.so/4dcdc7323194489f95d95c2949ae14cd)
