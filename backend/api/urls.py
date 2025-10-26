from django.urls import path
from .views import getnotes, CustomTokenObtainPairView, CustomTokenRefreshView,logout, auth, Register


urlpatterns = [
    path('getdata/',getnotes, name='getnotes'),
    path('token/',CustomTokenObtainPairView.as_view(),name='token'),
    path('token/refresh/',CustomTokenRefreshView.as_view(),name='refresh'),
    path('logout/', logout, name='logout'),
    path('auth/',auth, name='Is Authenticated'),
    path('register/', Register, name='Register'),
]