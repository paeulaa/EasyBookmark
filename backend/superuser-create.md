最快救法：重建一個 superuser

在 backend/ 跑：

`python manage.py createsuperuser`

然後照提示輸入：

```
username

email

password
```
建完之後就可以再登入：

http://localhost:8000/admin/
如果它說 email 或 username 已存在

那代表你刪掉的可能不是全部，或資料還有殘留。
先進 Django shell 看一下目前 users：

`python manage.py shell`

然後輸入：
```
from django.contrib.auth import get_user_model
User = get_user_model()
User.objects.all().values('id', 'username', 'email', 'is_superuser', 'is_staff')
```
如果看到還有別的 admin user，就可以直接用那個。
如果沒有，就退出 shell：

exit()

然後再跑：xw

`python manage.py createsuperuser`