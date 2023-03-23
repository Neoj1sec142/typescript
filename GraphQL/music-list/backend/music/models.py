from django.db import models

class Artist(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    songs = models.ManyToManyField('Song', related_name='artist_songs', blank=True, null=True)
    def __str__(self):
        return self.name

class Album(models.Model):
    title = models.CharField(max_length=255)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, blank=True, null=True)
    release_date = models.DateField()
    songs = models.ManyToManyField('Song', related_name='album_songs', blank=True, null=True)
    def __str__(self):
        return self.title


class Song(models.Model):
    title = models.CharField(max_length=255)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, blank=True, null=True)
    album = models.ForeignKey(Album, on_delete=models.CASCADE, blank=True, null=True)
    track_number = models.IntegerField()
    length = models.DurationField()

    def __str__(self):
        return self.title
