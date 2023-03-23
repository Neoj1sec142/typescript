from django.urls import path
from .views import GraphQLCustomView

urlpatterns = [
    path('graphql/', GraphQLCustomView.as_view(graphiql=True)),
]