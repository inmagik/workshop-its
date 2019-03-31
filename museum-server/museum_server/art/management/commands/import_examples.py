from django.core.management.base import BaseCommand, CommandError
from art.models import Artist, Artwork
from django.core import files
from django.core.files.temp import NamedTemporaryFile
import csv
import requests

class Command(BaseCommand):
    help = 'Closes the specified poll for voting'

    def add_arguments(self, parser):
        parser.add_argument('filename', type=str)

    def handle(self, *args, **options):
        filename = options['filename']

        
        with open(filename, "r") as csvFile:
            reader = csv.DictReader(csvFile)

            for row in reader:
                artist_name = row['artist']
                title = row['title']
                url = row['url']
                year = row.get('year', None)
                media = row.get('media', None)

                try:
                    artwork = Artwork.objects.get(title=title)
                    self.stdout.write(self.style.WARNING('Skipping existing artwork: "%s"' % artwork.title))
                    continue
                except Artwork.DoesNotExist:
                    pass

                try:
                    artist = Artist.objects.get(name__iexact=artist_name)
                except Artist.DoesNotExist:
                    self.stdout.write(self.style.ERROR('Missing artist "%s"' % artist_name))
                    continue

                image_temp_file = NamedTemporaryFile(delete=True)
                in_memory_image = requests.get(url, stream=True)
                # Write the in-memory file to the temporary file
                # Read the streamed image in sections
                for block in in_memory_image.iter_content(1024 * 8):
                    # If no more file then stop
                    if not block:
                        break
                    # Write image block to temporary file
                    image_temp_file.write(block)
                
                file_name = url.split("/")[-1]  # Choose a unique name for the file
                image_temp_file.flush()
                temp_file = files.File(image_temp_file, name=file_name)
                artwork = Artwork.objects.create(
                    title=title,
                    artist=artist,
                    year=year,
                    media=media,
                    image=temp_file
                )

                self.stdout.write(self.style.SUCCESS('Successfully imported "%s"' % artwork.title))
