from django.contrib import admin
from .models import Folder, Bookmark, CaptureSession

# Register your models here.

admin.site.register(Folder)
admin.site.register(Bookmark)
admin.site.register(CaptureSession)