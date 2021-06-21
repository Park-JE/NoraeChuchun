from django.shortcuts import render
import requests
import base64
import json


client_id = "2cabea8509e340e4ad25d9f4356c9ce8"
client_secret = "6b7b0c1aa5fa4058857c097e52cffdb2"
endpoint = "https://accounts.spotify.com/api/token"
    
encoded = base64.b64encode("{}:{}".format(client_id, client_secret).encode('utf-8')).decode('ascii')
headers = {"Authorization": "Basic {}".format(encoded)}
payload = {"grant_type": "client_credentials"}
    
res = requests.post(endpoint, data=payload, headers=headers)
access_token = json.loads(res.text)['access_token']

