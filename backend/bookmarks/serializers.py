from rest_framework import serializers
from .models import Folder, Bookmark

# 這裡的serializers 是為了把model 轉換成 JSON 格式，方便前端使用
class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = '__all__'
        read_only_fields = ['user'] # 基本登入之後就是固定一位user, 所以user資料是read-only, 不可以被改動

class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = '__all__'
        read_only_fields = ['user']
