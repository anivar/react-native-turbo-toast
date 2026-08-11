"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
/**
 * No `onPress` here. Codegen rejects a function inside an object type
 * (`UnsupportedObjectPropertyValueTypeAnnotationParserError`), which failed
 * `pod install` and Gradle codegen before a single line of Swift or Kotlin was
 * compiled — so the whole native layer was unreachable.
 *
 * The callback never needed to cross the bridge: the manager keeps it keyed by
 * toast id and runs it when native emits `TurboToast:ActionPressed`.
 */
var _default = exports.default = _reactNative.TurboModuleRegistry.getEnforcing('TurboToast');
//# sourceMappingURL=NativeTurboToast.js.map