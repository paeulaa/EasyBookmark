from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import redirect
from django.conf import settings
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken

class GoogleLoginView(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client
    callback_url = "http://localhost:8000/accounts/google/login/callback/"

class GoogleLoginCallbackView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        user = request.user

        if not user.is_authenticated:
            return redirect(f'{settings.FRONTEND_URL}/login?error=google_auth_failed')
        
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)
        return redirect(
            f'{settings.FRONTEND_URL}/auth/callback?access={access_token}&refresh={refresh_token}'
        )



class TestAuthView(APIView):
    def get(self, request):
        return Response({"message": "accounts app works!"})

class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
        })


