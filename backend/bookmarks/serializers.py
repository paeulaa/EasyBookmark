from rest_framework import serializers
from .models import Folder, Bookmark

# 這裡的serializers 是為了把model 轉換成 JSON 格式，方便前端使用
class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = '__all__'
        read_only_fields = ['user', 'created_at', 'updated_at'] # 基本登入之後就是固定一位user, 所以user資料是read-only, 不可以被改動

    # permission settings: for folder's parent parameter
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        request = self.context.get('request')
        if request and request.user.is_authenticated:
            self.fields['parent'].queryset = Folder.objects.filter(user=request.user)
        else:
            self.fields['parent'].queryset = Folder.objects.none()

    def validate_parent(self, value):
        request = self.context.get('request')
        if value and request and value.user != request.user:
            raise serializers.ValidationError("You can only use your own folder as parent.")
        return value

class BookmarkSerializer(serializers.ModelSerializer):
    folder = serializers.PrimaryKeyRelatedField(queryset=Folder.objects.none())
    class Meta:
        model = Bookmark
        fields = '__all__'
        read_only_fields = ['user', 'created_at', 'updated_at']

    #補 ownership: 當前登入使用者如果送
    # {
    #   "title": "test",
    #   "url": "https://example.com",
    #   "note": "hello",
    #   "folder": 999
    # }
    # 但 999 不是他自己的 folder，就會直接 validation error，不會存進 DB。
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            self.fields['folder'].queryset = Folder.objects.filter(user=request.user)
        else:
            self.fields['folder'].queryset = Folder.objects.none()
    # permission settings
    def validate_folder(self, value):
        request = self.context.get('request')
        if request and value.user != request.user:
            raise serializers.ValidationError("You can only use your own folder.")
        return value