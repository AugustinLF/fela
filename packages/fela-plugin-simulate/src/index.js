/* @flow */
import { isObject } from 'fela-utils'

import { DOMRenderer } from '../../../flowtypes/DOMRenderer'
import { NativeRenderer } from '../../../flowtypes/NativeRenderer'

type Type = 'KEYFRAME' | 'RULE' | 'STATIC'
function resolveSimulation(
  style: Object,
  type: Type,
  renderer: DOMRenderer | NativeRenderer,
  props: Object
): Object {
  if (props.simulate) {
    for (const property in style) {
      const value = style[property]

      if (isObject(value) && props.simulate[property]) {
        const resolvedValue = resolveSimulation(value, type, renderer, props)

        renderer._mergeStyle(style, resolvedValue)
        delete style[property]
      }
    }
  }

  return style
}

export default () => resolveSimulation
