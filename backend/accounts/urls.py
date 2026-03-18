from django.urls import path
from .views import TestAuthView, GoogleLoginView, MeView #, login_page


urlpatterns = [
    path('auth/test/', TestAuthView.as_view(), name='auth_test'),
    path('auth/google/', GoogleLoginView.as_view(), name='google_login'),
    path('auth/me/', MeView.as_view(), name='auth_me'),
     # path('custom-login/', login_page, name='custom_login'),
]