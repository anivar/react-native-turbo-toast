# 📜 Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.2]

### Fixed
- Codegen now accepts `NativeToastAction`: `onPress` moved off the spec (a
  function inside an object type isn't representable there); the callback is
  still resolved by toast id when native emits `TurboToast:ActionPressed`.
- `duration` is now a plain number at the native boundary. `'short'`/`'long'`
  are resolved to milliseconds in `manager.ts` before crossing the bridge,
  which is also what codegen requires for a TurboModule spec field.
- Android: fixed a missing import and a class-name collision in the custom
  toast view, removed a Gradle plugin reference that predates React Native
  0.71, and added the new-architecture Kotlin spec class.
- `CustomToastView`'s action-button handler now takes the `ReactContext`
  directly instead of deriving it from the activity, which relied on an
  API that isn't accessible outside `ReactActivity` itself.
- iOS: the multi-action array is now threaded through to the view builder
  as its own parameter alongside the single-action one.
- Added `.github/workflows/native.yml`, which compiles a real host app for
  iOS and Android on every push.

### Documentation
- Corrected `API.md`, `FEATURES.md`, and `FEATURE_COMPARISON.md`: removed the
  unexported `useToast()`/`useGroupToasts()`/`useQueueEvents()` hooks, fixed the
  `QueueStats`/`QueueEvent`/`ToastAction` shapes to match `src/types.ts`, and
  corrected Android's swipe-to-dismiss and custom-view/action-button support
  (all real, previously documented as absent or iOS/web-only).
- `CONTRIBUTING.md`: fixed the Node version requirement (`>=24.0.0`) and the
  native method examples (`show`, not `showToast`).
- `SECURITY.md`: replaced the stale `security@openslm.ai` contact and version
  table.

## [1.1.1]

### Changed
- Move repo from `openslm-ai/react-native-turbo-toast` to `anivar/react-native-turbo-toast`.
- Update `package.json` `homepage` / `repository` / `bugs` URLs to the new namespace.
- Update README badges, drop the OpenSLM section, and refresh native-source headers.

## [1.1.0]

### Added
- TurboModule spec: `actions?: NativeToastAction[]` field for native multi-action toasts (the JS-side feature already existed; the spec now matches it).

### Changed
- Drop dead `lib/{commonjs,module,typescript}/wasm/*` artifacts from the published build.
- Override vulnerable transitive deps (`basic-ftp`, `brace-expansion`, `js-yaml`, `picomatch`, `yaml`) at patched versions.
- Brand: README and native entry points carry the OpenSLM project mark.

## [1.0.1]

### Fixed
- Maintenance release (no changelog entry was authored at the time).

## 🎉 [1.0.0]

### ✨ Added
- **🔘 Multi-action support** - Multiple buttons per toast with style variants (default, destructive, cancel)
- **🎬 Animation presets** - 6 pre-built animations: fade, slide, bounce, zoom, spring, none
- **📚 Toast stacking** - Visual stacking with configurable offset and max visible count
- **💾 Persistence** - Save/restore queue across app restarts (iOS, Android)
- **📈 Analytics integration** - Pluggable provider system for usage tracking
- **📱 Toast grouping** - Organize toasts by logical groups
- **🛡️ Deduplication** - Prevent spam with message and group-based deduplication
- **🎯 Priority queue** - Higher priority toasts show first

### 🔄 Changed
- 📚 Improved documentation with accurate platform feature matrix
- 🎨 Enhanced TypeScript definitions for new features
- 📦 Updated bundle size optimization

### 🐛 Fixed
- 🤖 Android multi-action button implementation
- 📝 TypeScript type definitions for analytics
- 🧠 Memory cleanup in queue management
- 🧹 Linting issues with Biome

### 📱 Platform Notes
- **🍎 iOS**: Full feature support including swipe-to-dismiss
- **🤖 Android**: All features except swipe-to-dismiss (tap-to-dismiss only)
- **🌐 Web**: All features except persistence (no AsyncStorage in browser)

## 🚀 [0.2.0]

### ✨ Added

#### 🎯 Advanced Queue Management System
- Priority-based queue with automatic sorting
- Group management for organizing toasts
- Queue size limits with smart eviction
- Pause/resume queue processing
- Queue statistics and monitoring
- Event system for state changes
- Automatic cleanup of expired toasts

#### 🎨 Custom React Component Support
- Render any React component as toast
- Interactive components with full event support
- ToastContainer portal system
- Dynamic updates while displayed
- Callback props for custom interactions

#### 🛠️ Visual Developer Tools
- QueueMonitor component for debugging
- Visual statistics dashboard
- Event history with timestamps
- Interactive queue controls
- React hooks for integration

#### 📊 Progress Toast System
- Progress bars with 0-1 scale
- Dynamic progress updates
- Custom progress colors
- Auto-hide on completion
- Cross-platform support

#### 🎉 Template Shortcuts
- `Toast.success()` - ✅ Green success toast
- `Toast.error()` - ❌ Red error toast
- `Toast.warning()` - ⚠️ Orange warning toast
- `Toast.info()` - ℹ️ Blue info toast
- `Toast.loading()` - ⏳ Persistent loading toast
- `Toast.promise()` - 🎯 Promise-based toasts

### 🔄 Changed
- 🤖 Enhanced Android implementation with custom views
- 📳 Improved haptic feedback across platforms
- ♿ Better accessibility support
- 🧠 Optimized memory management

### 🐛 Fixed
- 🍎 iOS pod installation issues
- 📝 TypeScript declaration exports
- ⏱️ Memory leaks in timer management

## 🔧 [0.1.1]

### 🐛 Fixed
- 🏗️ Build configuration improvements
- 🍎 iOS pod installation issues
- 📝 TypeScript declaration exports

### 🔄 Changed
- 📦 Updated npm package configuration
- 🎯 Improved bundle size optimization

## 🎊 [0.1.0]

### ✨ Added
- 🚀 Initial release with basic toast functionality
- ⚡ TurboModule implementation for iOS, Android, and Web
- 📝 TypeScript support
- 🎨 Basic positioning and styling options
- 📱 Cross-platform compatibility

---

*For detailed API documentation, see [API.md](API.md)*
*For complete feature overview, see [FEATURES.md](FEATURES.md)*