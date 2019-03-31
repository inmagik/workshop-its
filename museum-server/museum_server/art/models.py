from django.db import models


class Artist(models.Model):
    """
    Modello dati per la gestione di un artista
    """
    name = models.CharField(max_length=300, unique=True)
    birth_date = models.DateField(blank=True, null=True)
    death_date = models.DateField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(blank=True, null=True, upload_to="artists")

    def __str__(self):
        return self.name


class Artwork(models.Model):
    """
    Modello dati per la gestione delle opere
    """
    artist = models.ForeignKey(Artist, models.CASCADE, related_name="artworks")
    title = models.CharField(max_length=300, default="Senza titolo")
    year = models.IntegerField(blank=True, null=True)
    
    MEDIA_CHOICES = [
        ('painting', 'Dipinto'), 
        ('photography', 'Fotografia'),
    ]
    
    media = models.CharField(max_length=20, choices=MEDIA_CHOICES, blank=True, null=True)
    image = models.ImageField(blank=True, null=True, upload_to='artworks')

    def __str__(self):
        return self.title