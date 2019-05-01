const Model = use('Model');

class Team extends Model {
  user() {
    return this.belongsTo('App/Models/User');
  }

  scores() {
    return this.hasMany('App/Models/Score');
  }

  subscriptions() {
    return this.hasMany('App/Models/Subscription');
  }
}

module.exports = Team;
