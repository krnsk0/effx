import { Model, model, tProp, types } from 'mobx-keystone';

@model('adsr')
export class Adsr extends Model({
  startTime: tProp(types.number, 0).withSetter(),
  startValue: tProp(types.number, 0).withSetter(),
  attackTime: tProp(types.number, 0.1).withSetter(),
  attackValue: tProp(types.number, 0.9).withSetter(),
  decayTime: tProp(types.number, 0.1).withSetter(),
  sustainTime: tProp(types.number, 0.2).withSetter(),
  sustainValue: tProp(types.number, 0.5).withSetter(),
  releaseTime: tProp(types.number, 0.1).withSetter(),
}) {}
