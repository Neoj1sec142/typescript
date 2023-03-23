from django.urls import path
from .views import GraphQLCustomView
from django.views.decorators.csrf import csrf_exempt
urlpatterns = [
    path('graphql/', csrf_exempt(GraphQLCustomView.as_view(graphiql=True))),
]