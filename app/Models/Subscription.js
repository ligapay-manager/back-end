const Model = use('Model');

class Subscription extends Model {
  team() {
    return this.belongsTo('App/Models/Team');
  }

  season() {
    return this.belongsTo('App/Models/Season');
  }

  league() {
    return this.belongsTo('App/Models/League');
  }
}

module.exports = Subscription;
