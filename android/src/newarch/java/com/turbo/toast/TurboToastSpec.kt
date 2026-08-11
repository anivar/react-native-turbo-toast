package com.turbo.toast

import com.facebook.react.bridge.ReactApplicationContext

/**
 * New-architecture half of the spec pair. `build.gradle` puts `src/newarch/java`
 * on the compile path when the new architecture is on and `src/oldarch/java`
 * when it is off, so `TurboToastModule` can extend one name in both modes.
 *
 * This directory did not exist, so every new-architecture build failed on an
 * unresolved `TurboToastSpec` — and the new architecture is the only mode
 * React Native 0.80+ has.
 *
 * `NativeTurboToastSpec` is generated from `src/NativeTurboToast.ts` by codegen.
 */
abstract class TurboToastSpec(context: ReactApplicationContext) :
    NativeTurboToastSpec(context)
