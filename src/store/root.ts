import { Model, model, modelAction, tProp, types } from 'mobx-keystone';
import { Sound } from './sound';

@model('root')
export class Root extends Model({
  sound: tProp(types.model(Sound), () => new Sound({})),
}) {
  @modelAction
  reset() {
    this.sound = new Sound({});
  }
}
