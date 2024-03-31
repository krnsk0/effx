import { Model, model, modelAction, tProp, types } from 'mobx-keystone';
import { Voice } from './voice';

@model('sound')
export class Sound extends Model({
  voices: tProp(types.array(types.model(Voice)), () => [new Voice({})]),
}) {
  @modelAction
  addVoice() {
    this.voices.push(new Voice({}));
  }
}
