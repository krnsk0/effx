import { Model, model, tProp, types } from 'mobx-keystone';
import { Adsr } from './adsr';
import { OscillatorTypes } from '../../lib/Voice';

@model('voice')
export class Voice extends Model({
  oscillatorType: tProp(
    types.enum(OscillatorTypes),
    OscillatorTypes.Sine
  ).withSetter(),
  frequency: tProp(types.number, 220).withSetter(),
  adsr: tProp(types.model(Adsr), () => new Adsr({})),
}) {}
