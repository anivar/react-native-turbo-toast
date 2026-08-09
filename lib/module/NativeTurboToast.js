"use strict";

import { TurboModuleRegistry } from 'react-native';

/**
 * No `onPress` here. Codegen rejects a function inside an object type
 * (`UnsupportedObjectPropertyValueTypeAnnotationParserError`), which failed
 * `pod install` and Gradle codegen before a single line of Swift or Kotlin was
 * compiled — so the whole native layer was unreachable.
 *
 * The callback never needed to cross the bridge: the manager keeps it keyed by
 * toast id and runs it when native emits `TurboToast:ActionPressed`.
 */

export default TurboModuleRegistry.getEnforcing('TurboToast');
//# sourceMappingURL=NativeTurboToast.js.map