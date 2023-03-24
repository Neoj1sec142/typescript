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
    song = graphene.Field(SongType, id=graphene.ID())
    album = graphene.Field(AlbumType, id=graphene.ID())
    artist = graphene.Field(ArtistType, id=graphene.ID())
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

class CreateSongMutation(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        artistId = graphene.ID(required=True)
        albumId = graphene.ID(required=True)
        trackNumber = graphene.Int(required=True)
        length = graphene.String(required=True)
    song = graphene.Field(SongType)
    
    def mutate(self, info, title,\
        artistId, albumId, trackNumber,\
            length):
        artist = Artist.objects.get(id=artistId)
        album = Album.objets.get(id=albumId)
        song = Song.objects.create(
            title=title,
            artist=artist,
            album=album,
            track_number=trackNumber,
            length=length)
        return CreateSongMutation(song=song)

class UpdateSongMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        title = graphene.String()
        artist_id = graphene.ID()
        album_id = graphene.ID()
        track_number = graphene.Int()
        length = graphene.String()
    song = graphene.Field(SongType)
    
    def mutate(self, info, id, title=None,\
        artist_id=None, album_id=None,\
            track_number=None, length=None):
        song = Song.objects.get(id=id)
        if title:
            song.title = title
        if artist_id:
            song.artist = Artist.objects.get(id=artist_id)
        if album_id:
            song.album = Album.objects.get(id=album_id)
        if track_number:
            song.track_number = track_number
        if length:
            song.length = length
        song.save()
        return UpdateSongMutation(song=song)

class DeleteSongMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
    success = graphene.Boolean()
    
    def mutate(self, info, id):
        song = Song.objects.get(id=id)
        song.delete()
        return DeleteSongMutation(success=True)

class CreateArtistMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String()
        description = graphene.String()
    artist = graphene.Field(ArtistType)
    
    def mutate(self, info, name=None, description=None):
        
        artist = Artist.objects.create(
            name=name,
            description=description)
        return CreateArtistMutation(artist=artist)
    
class DeleteArtistMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
    success = graphene.Boolean()
    
    def mutate(self, info, id):
        artist = Artist.obejcts.get(id=id)
        artist.delete()
        return DeleteArtistMutation(success=True)

class CreateAlbumMutation(graphene.Mutation):
    class Arguments:
        title = graphene.String()
        artistId = graphene.ID()
        releaseDate = graphene.DateTime()
    album = graphene.Field(AlbumType)
    def mutate(self, info, title, artistId, releaseDate):
        artist = Artist.objects.get(id=artistId)
        album = Album.objects.create(
            title=title,
            artist=artist,
            release_date=releaseDate
        )
        return CreateAlbumMutation(album=album)

class DeleteAlbumMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
    success = graphene.Boolean()
    
    def mutate(self, info, id):
        album = Album.obejcts.get(id=id)
        album.delete()
        return DeleteAlbumMutation(success=True)

class Mutation(graphene.ObjectType):
    create_song = CreateSongMutation.Field()
    update_song = UpdateSongMutation.Field()
    delete_song = DeleteSongMutation.Field() 
    create_artist = CreateArtistMutation.Field()
    delete_artist = DeleteArtistMutation.Field()
    create_album = CreateAlbumMutation.Field()
    delete_album = DeleteAlbumMutation.Field()

schema = graphene.Schema(query=Query, mutation=Mutation, types=[graphene.ID])