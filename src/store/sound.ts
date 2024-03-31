import { Model, model, tProp, types } from 'mobx-keystone';
import { Voice } from './voice';

@model('sound')
export class Sound extends Model({
  voices: tProp(types.array(types.model(Voice)), () => [new Voice({})]),
}) {}
