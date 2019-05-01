const Model = use('Model');

class Season extends Model {
  scores() {
    return this.hasMany('App/Model/Score');
  }

  subscriptions() {
    return this.hasMany('App/Models/Subscriptions');
  }

  leagues() {
    return this.belongsToMany('App/Models/Season').pivotModel('App/Models/Subscriptions');
  }
}

module.exports = Season;
