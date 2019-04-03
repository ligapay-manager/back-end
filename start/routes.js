const Route = use('Route');

Route.get('/', () => ({ Hi: 'Adonis' }));

Route.post('/users', 'UserController.create');
Route.post('/sessions', 'SessionController.create');
Route.post('/leagues', 'LeagueController.create');
