import type { TurboModule } from 'react-native'
import { TurboModuleRegistry } from 'react-native'

/**
 * No `onPress` here. Codegen rejects a function inside an object type
 * (`UnsupportedObjectPropertyValueTypeAnnotationParserError`), which failed
 * `pod install` and Gradle codegen before a single line of Swift or Kotlin was
 * compiled — so the whole native layer was unreachable.
 *
 * The callback never needed to cross the bridge: the manager keeps it keyed by
 * toast id and runs it when native emits `TurboToast:ActionPressed`.
 */
export interface NativeToastAction {
  text: string
  style?: 'default' | 'cancel' | 'destructive'
}

export interface NativeToastOptions {
  id?: string
  message: string
  duration?: 'short' | 'long' | number
  position?: 'top' | 'center' | 'bottom'
  type?: 'success' | 'error' | 'warning' | 'info' | 'default'
  backgroundColor?: string
  textColor?: string
  icon?: string
  action?: NativeToastAction
  actions?: NativeToastAction[]
  dismissOnPress?: boolean
  swipeToDismiss?: boolean
  animationDuration?: number
  accessibilityLabel?: string
  accessibilityHint?: string
  accessibilityRole?: 'alert' | 'status'
}

export interface Spec extends TurboModule {
  show(options: NativeToastOptions): Promise<void>
  hide(): void
  hideAll(): void
}

export default TurboModuleRegistry.getEnforcing<Spec>('TurboToast')
