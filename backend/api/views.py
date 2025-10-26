from django.shortcuts import render
from .models import Note
from .serializers import NoteSerailizers, UserRegisterSerailizer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getnotes(request):
    user = request.user
    note = Note.objects.filter(owner = user)
    serializer = NoteSerailizers(note, many=True)
    return Response(serializer.data)

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **Kwargs):
        try:
            response = super().post(request, *args, **Kwargs)
            token = response.data
            access_token = token['access']
            refresh_token = token['refresh']
            res = Response()
            res.data = {'Success':True}
            res.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )
            res.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )
            return res
        except Exception as e:
            return Response({'Success':False,'Error':str(e)})

class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh_token')
            request.data['refresh'] = refresh_token
            response = super().post(request, *args, **kwargs)
            token = response.data
            access_token = token['access']
            res = Response()
            res.data = {'Refreshed':True}
            res.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )
            return res
        except Exception as e:
            return Response({'Refreshed':False, 'Error':str(e)})
        
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        res = Response()
        res.delete_cookie('access_token', path='/', samesite='None')
        res.delete_cookie('refresh_token', path='/', samesite = 'None')
        res.data = {"Logout":True}
        return res
    except Exception as e:
        return Response({'Logout':False, 'Error':str(e)})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def auth(request):
    return Response({'Authenticated User': True})

@api_view(['POST'])
@permission_classes([AllowAny])
def Register(request):
    serializer = UserRegisterSerailizer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        print(serializer.data)
        return Response(serializer.data)
    print(serializer.data)
    return Response(serializer.errors)
