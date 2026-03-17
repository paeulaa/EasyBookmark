from django.shortcuts import render
from rest_framework import generics
from .models import Folder, Bookmark
from rest_framework.permissions import IsAuthenticated
from .serializers import FolderSerializer, BookmarkSerializer

# ListAPIView意思是：
# 幫你做一個「讀取多筆資料列表」的 API
# 所以：
# Folder.objects.all() = 取全部 folders
# Bookmark.objects.all() = 取全部 bookmarks

class FolderListView(generics.ListCreateAPIView): 
    # generics.ListAPIView只能GET, generics.ListCreateAPIView可以GET和POST
    # queryset = Folder.objects.all() 移除這種所有人都能看到的模式
    serializer_class = FolderSerializer
    permission_classes = [IsAuthenticated] # 只有登入的人才能使用
    def get_queryset(self):
        return Folder.objects.filter(user=self.request.user) # 只有登入的人才能看到自己的folder
    def perform_create(self, serializer):
        serializer.save(user=self.request.user) # 建立folder時，自動填入user

class BookmarkListView(generics.ListCreateAPIView):
    serializer_class = BookmarkSerializer
    permission_classes = [IsAuthenticated] # 只有登入的人才能使用
    def get_queryset(self):
        return Bookmark.objects.filter(user=self.request.user) # 只有登入的人才能看到自己的bookmark
    def perform_create(self, serializer):
        serializer.save(user=self.request.user) # 建立bookmark時，自動填入user
# Create your views here.
