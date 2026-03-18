from django.urls import path
from .views import FolderListView, BookmarkListView, FolderDetailView, BookmarkDetailView

urlpatterns = [
    path('folders/', FolderListView.as_view(), name='folder-list'),
    path('bookmarks/', BookmarkListView.as_view(), name='bookmark-list'),
    path('folders/<int:pk>/', FolderDetailView.as_view(), name='folder-detail'),
    path('bookmarks/<int:pk>/', BookmarkDetailView.as_view(), name='bookmark-detail'),
]