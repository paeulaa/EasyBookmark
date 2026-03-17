from django.urls import path
from .views import FolderListView, BookmarkListView

urlpatterns = [
    path('folders/', FolderListView.as_view(), name='folder-list'),
    path('bookmarks/', BookmarkListView.as_view(), name='bookmark-list'),
]