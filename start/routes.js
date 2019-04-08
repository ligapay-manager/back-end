const Route = use('Route');
const GraphQLServer = use('GraphQLServer');

Route.group(() => {
  Route.post('/', context => GraphQLServer.handle(context, {
    passHeader: `'Authorization': '${context.request.header('Authorization')}'`,
  }));

  Route.get('/ui', context => GraphQLServer.handleUI(context));
}).prefix('gql');
