from django.urls import path
from .views import TestAuthView, GoogleLoginView, MeView, GoogleLoginCallbackView


urlpatterns = [
    path('auth/test/', TestAuthView.as_view(), name='auth_test'),
    path('auth/google/', GoogleLoginView.as_view(), name='google_login'),
    path('auth/me/', MeView.as_view(), name='auth_me'),
    path("auth/google/success/", GoogleLoginCallbackView.as_view(), name="google_login_success"),
]