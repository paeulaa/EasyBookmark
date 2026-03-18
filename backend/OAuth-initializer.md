0. 先把 server 開起來

在 backend/ 這層跑：

1python manage.py runserver1

確認瀏覽器打得開：

`http://127.0.0.1:8000/api/auth/google/`

如果這頁打得開，就可以繼續。

1. 去拿新的 Google code

因為 code 通常只能用一次，所以 server 關掉後，要重新拿一組新的。

把這個網址貼到瀏覽器，記得把 YOUR_CLIENT_ID 換成你自己的 Google client id：
```
https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://localhost:8000/accounts/google/login/callback/&prompt=consent&response_type=code&client_id=YOUR_CLIENT_ID&scope=openid%20email%20profile&access_type=offline
```
接著：

用 Google 帳號登入

按同意

瀏覽器會跳到像這樣的網址：

http://localhost:8000/accounts/google/login/callback/?iss=...&code=4/xxxxx&scope=...
2. 只複製 code= 後面的那一段

例如如果 callback URL 長這樣：

http://localhost:8000/accounts/google/login/callback/?iss=...&code=4/0Afrxxxxxxx&scope=...

你只要複製：

4/0Afrxxxxxxx

不要複製整串 URL。

3. 把 code 貼到 /api/auth/google/

打開：

http://127.0.0.1:8000/api/auth/google/

在頁面裡：

Access token 留空

Code 貼上剛剛那串 4/xxxxx

Id token 留空

然後按 POST

4. 成功後你會拿到 access token

成功的話會看到類似：
```
{
  "access": "eyJ....",
  "refresh": "",
  "user": {
    "pk": 5,
    "username": "paula9",
    "email": "xxx@gmail.com",
    "first_name": "paula",
    "last_name": "chen"
  }
}
```
這時候把：

access

那整串複製起來。

5. 用 access token 去打 /api/bookmarks/

最穩的是用 terminal 測。

把 YOUR_ACCESS_TOKEN 換成你剛剛拿到的 token：
```
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" http://127.0.0.1:8000/api/bookmarks/
```
如果成功，應該會回 bookmarks 的 JSON。

你這次最容易忘的 3 個點
1. code 要重新拿

舊的通常不能重用。

2. 只貼 code 那段

不是整個 callback URL。

3. /api/bookmarks/ 不能直接瀏覽器裸打

因為它需要：

Authorization: Bearer <access token>
如果你又看到這幾種錯誤
Third-Party Login Failure

先不用慌，重點是 callback URL 裡有沒有 code=。
有的話就繼續拿 code 去 POST。

User is already registered with this e-mail address.

代表那個 email 對應的舊 user 還在，要先刪測試 user，或改 allauth 設定。

/api/bookmarks/ 回 401

代表你沒帶 Bearer token，不是 bookmarks 壞掉。

極簡版口訣

你可以把這次記成：

runserver → 開 Google 授權網址 → 複製 code → POST 到 /api/auth/google/ → 複製 access → curl 打 /api/bookmarks/

如果你現在要，我也可以直接幫你把「Google 授權網址」那行換成你目前 localhost 版本的最終模板。