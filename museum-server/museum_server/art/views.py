from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.viewsets import ReadOnlyModelViewSet
from art.serializers import ArtistSerializer, ArtworkSerializer
from art.models import Artist, Artwork


def hello_there(request):
    return HttpResponse("Hello there!")


class ArtistViewSet(ReadOnlyModelViewSet):
    serializer_class = ArtistSerializer
    queryset = Artist.objects.all()


class ArtworkViewSet(ReadOnlyModelViewSet):
    serializer_class = ArtworkSerializer
    queryset = Artwork.objects.all()