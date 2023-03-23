import graphene
from graphene_django import DjangoObjectType
from .models import Artist, Album, Song

class SongType(DjangoObjectType):
    album = graphene.Field('music.schema.AlbumType')
    artist = graphene.Field('music.schema.ArtistType')
    class Meta:
        model = Song
        fields = ('id', 'title', 'track_number', 'length', 'album', 'artist')

    def resolve_album(self, info):
        return Album.objects.get(id=self.album.id)

    def resolve_artist(self, info):
        return Artist.objects.get(id=self.artist_id)


class AlbumType(DjangoObjectType):
    artist = graphene.Field('music.schema.ArtistType')
    songs = graphene.List(SongType)
    class Meta:
        model = Album
        fields = ('id', 'title', 'release_date', 'artist', 'songs')

    def resolve_artist(self, info):
        return Artist.objects.get(id=self.artist_id)

    def resolve_songs(self, info):
        return Song.objects.filter(album=self)

class ArtistType(DjangoObjectType):
    albums = graphene.List(AlbumType)
    songs = graphene.List(SongType)
    class Meta:
        model = Artist
        fields = ('id', 'name', 'description', 'albums')
    
    def resolve_albums(self, info):
        return Album.objects.filter(artist=self)

    def resolve_songs(self, info):
        return Song.objects.filter(artist=self)


class Query(graphene.ObjectType):
    artists = graphene.List(ArtistType)
    albums = graphene.List(AlbumType)
    songs = graphene.List(SongType)
    song = graphene.Field(SongType, id=graphene.Int())
    album = graphene.Field(AlbumType, id=graphene.Int())
    artist = graphene.Field(ArtistType, id=graphene.Int())
    def introspect(context):
        return schema.introspect()
    def resolve_artists(self, info):
        return Artist.objects.all()

    def resolve_albums(self, info):
        return Album.objects.all()

    def resolve_songs(self, info):
        return Song.objects.all()
    def resolve_artist(self, info, id):
        return Artist.objects.get(id=id)
    def resolve_song(self, info, id):
        return Song.objects.get(id=id)
    def resolve_album(self, info, id):
        return Album.objects.get(id=id)
    
schema = graphene.Schema(query=Query)