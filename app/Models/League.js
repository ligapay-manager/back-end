const Model = use('Model');

class League extends Model {
  type() {
    return this.belongsTo('App/Models/LeagueType');
  }

  subscriptions() {
    return this.hasMany('App/Models/Subscription');
  }

  seasons() {
    return this.belongsToMany('App/Models/Season').pivotModel('App/Models/Subscription');
  }

  wallet() {
    return this.hasOne('App/Models/Wallet');
  }

  manager() {
    return this.belongsTo('App/Models/User');
  }
}

module.exports = League;
