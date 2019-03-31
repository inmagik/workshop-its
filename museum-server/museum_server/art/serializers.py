from rest_framework.serializers import ModelSerializer
from art.models import Artist, Artwork


class ArtworkSerializer(ModelSerializer):
    class Meta:
        model = Artwork
        fields = "__all__"


class ArtistSerializer(ModelSerializer):
    
    artworks = ArtworkSerializer(many=True, read_only=True)
    
    class Meta:
        model = Artist
        fields = "__all__"


