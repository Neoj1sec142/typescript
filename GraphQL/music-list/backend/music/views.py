from graphene_django.views import GraphQLView
from .schema import schema

class GraphQLCustomView(GraphQLView):
    schema = schema
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, introspection_result=schema.Query.introspect(request), **kwargs)

    # def get_root_value(self):
    #     return self.request

    def get_context(self, request):
        return request
    