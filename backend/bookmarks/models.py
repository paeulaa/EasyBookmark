from django.db import models
from django.contrib.auth.models import User


class Folder(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE) # 如果 user 被刪掉，folder 要怎麼辦？ 所以通常用 CASCADE
    name = models.CharField(max_length=100) # max_length（100 很常見）
    parent = models.ForeignKey(
        'self', 
        on_delete=models.CASCADE, 
        related_name='subfolders', # 這個folder 可以有 children, 且會被命名為subfolders, 不會隨機取名
        null=True, # null 跟 blank是在設定，這個folder 可以沒有 parent
        blank=True
    ) # 如果 parent 被刪掉，folder 要怎麼辦？ 所以通常用 CASCADE
    created_at = models.DateTimeField(auto_now_add=True) # auto_now_add = 建立時自動填
    updated_at = models.DateTimeField(auto_now=True) # 每次更新會自動改

    def __str__(self):
        return self.name # 這樣在 admin 頁面會顯示 folder 的名稱，而不是 object(方便閱讀)

class Bookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE, related_name='bookmarks')
    title = models.CharField(max_length=200)
    url = models.URLField()
    note = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    capture_session = models.ForeignKey(
        'CaptureSession',
        on_delete=models.SET_NULL,  # 如果 capture session 被刪掉，bookmark 要怎麼辦？ 所以通常用 SET_NULL
        null=True,
        blank=True,
        related_name='bookmarks'
    ) # bookmark可以知道是哪一輪capture session抓的

    def __str__(self):
        return self.title # 顯示 bookmark 的標題

class CaptureSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    target_folder = models.ForeignKey(
        Folder, 
        on_delete=models.SET_NULL, 
        related_name='capture_sessions',
        null=True,
        blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.created_at}" # 顯示 capture session 的 id