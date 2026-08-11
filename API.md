# 📚 API Reference

Complete developer-friendly API documentation for react-native-turbo-toast.

## 📋 Quick Navigation

- [🎯 Core Methods](#-core-methods)
- [🎨 Template Methods](#-template-methods)
- [📊 Queue Management](#-queue-management)
- [📈 Progress Methods](#-progress-methods)
- [🪝 React Hooks](#-react-hooks)
- [🧩 Components](#-components)
- [⚙️ Configuration](#️-configuration)
- [📝 Types](#-types)

## 🎯 Core Methods

### `Toast.show(options)`

Display a toast with full customization.

```tsx
// Simple message
const id = Toast.show('Hello World!')

// Full options
const id = Toast.show({
  message: '🎉 Success!',
  type: 'success',
  duration: 3000,
  position: 'top',
  priority: 10,
  group: 'notifications',
  animationPreset: 'bounce',
  actions: [
    { text: 'Undo', onPress: handleUndo },
    { text: 'Dismiss', style: 'cancel' }
  ]
})
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `options` | `ToastOptions \| string` | Configuration object or simple message |

**Returns:** `string` - Unique toast ID

**Options:**
```typescript
interface ToastOptions {
  message: string              // 📝 Toast message (required)
  type?: ToastType            // 🎨 Visual style
  position?: ToastPosition    // 📍 Screen position
  duration?: number | string  // ⏱️ Display time
  priority?: number           // 🎯 Queue priority (higher = sooner)
  group?: string             // 📱 Group identifier
  icon?: string              // 🖼️ Custom icon
  backgroundColor?: string   // 🎨 Background color
  textColor?: string         // 🎨 Text color
  hapticFeedback?: HapticType // 📳 Haptic feedback
  dismissOnPress?: boolean   // 👆 Tap to dismiss
  swipeToDismiss?: boolean   // 👉 Swipe to dismiss
  animationPreset?: AnimationPreset // 🎬 Animation style
  animationDuration?: number // ⏱️ Animation speed
  actions?: ToastAction[]    // 🔘 Action buttons
  customView?: ReactNode     // 🎨 Custom component
  showProgressBar?: boolean  // 📊 Show progress
  progress?: number          // 📈 Progress value (0-1)
  progressColor?: string     // 🎨 Progress bar color
  preventDuplicate?: boolean // 🛡️ Prevent duplicates
  stackingEnabled?: boolean  // 📚 Visual stacking
  onShow?: () => void       // ✨ Show callback
  onHide?: () => void       // 👋 Hide callback
  onPress?: () => void      // 👆 Press callback
  onError?: (error: Error) => void // ❌ Error callback
}
```

---

### `Toast.hide(id?)`

Hide a specific toast or the most recent one.

```tsx
// Hide specific toast
Toast.hide('toast-123')

// Hide most recent
Toast.hide()
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `string?` | Optional toast ID |

**Returns:** `void`

---

### `Toast.hideAll()`

Clear all toasts immediately.

```tsx
Toast.hideAll()  // 🧹 Clear everything
```

**Returns:** `void`

---

### `Toast.update(id, options)`

Update an active toast's properties.

```tsx
Toast.update('toast-123', {
  message: '✅ Upload complete!',
  progress: 1.0,
  type: 'success'
})
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `string` | Toast ID to update |
| `options` | `Partial<ToastOptions>` | Properties to change |

**Returns:** `boolean` - Success status

---

### `Toast.isActive(id)`

Check if a toast is currently visible.

```tsx
if (Toast.isActive('toast-123')) {
  console.log('Toast is showing!')
}
```

**Returns:** `boolean`

---

### `Toast.getActiveToasts()`

Get all currently visible toasts.

```tsx
const active = Toast.getActiveToasts()
console.log(`📊 ${active.length} toasts visible`)
```

**Returns:** `QueuedToast[]`

---

### `Toast.getQueuedToasts()`

Get all pending toasts in queue.

```tsx
const queued = Toast.getQueuedToasts()
console.log(`⏳ ${queued.length} toasts waiting`)
```

**Returns:** `QueuedToast[]`

## 🎨 Template Methods

Convenient shortcuts for common toast types.

### `Toast.success(message, options?)`

Show a green success toast with ✅ icon.

```tsx
Toast.success('Operation completed!')
```

### `Toast.error(message, options?)`

Show a red error toast with ❌ icon.

```tsx
Toast.error('Something went wrong')
```

### `Toast.warning(message, options?)`

Show an orange warning toast with ⚠️ icon.

```tsx
Toast.warning('Low battery')
```

### `Toast.info(message, options?)`

Show a blue info toast with ℹ️ icon.

```tsx
Toast.info('New update available')
```

### `Toast.loading(message?, options?)`

Show a persistent loading toast with ⏳ spinner.

```tsx
const id = Toast.loading('Processing...')
// Later: Toast.hide(id)
```

### `Toast.promise(promise, messages, options?)`

Automatically handle promise states with toasts.

```tsx
const result = await Toast.promise(
  fetchUserData(),
  {
    loading: '⏳ Fetching user...',
    success: (data) => `✅ Welcome, ${data.name}!`,
    error: (err) => `❌ Error: ${err.message}`
  }
)
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `promise` | `Promise<T>` | Promise to track |
| `messages` | `PromiseMessages<T>` | State messages |
| `options` | `Partial<ToastOptions>` | Additional options |

## 📊 Queue Management

Advanced queue control methods.

### `Toast.getQueueStats()`

Get comprehensive queue statistics.

```tsx
const stats = Toast.getQueueStats()
console.log(`
  📦 Total: ${stats.total}
  📊 Active: ${stats.active}
  ⏳ Pending: ${stats.pending}
  🎯 By Priority: ${JSON.stringify(stats.byPriority)}
  📱 By Group: ${JSON.stringify(stats.byGroup)}
`)
```

**Returns:**
```typescript
interface QueueStats {
  total: number           // active + pending
  active: number          // Currently visible
  pending: number         // Waiting in queue
  byPriority: Record<number, number>  // Count by priority
  byGroup: Record<string, number>     // Count by group
  oldestTimestamp?: number
  newestTimestamp?: number
}
```

---

### `Toast.pauseQueue()`

Pause toast processing.

```tsx
Toast.pauseQueue()  // ⏸️ Stop showing new toasts
```

---

### `Toast.resumeQueue()`

Resume toast processing.

```tsx
Toast.resumeQueue()  // ▶️ Continue showing toasts
```

---

### `Toast.clearGroup(group)`

Remove all toasts in a specific group.

```tsx
Toast.clearGroup('notifications')  // 🗑️ Clear group
```

---

### `Toast.findByGroup(group)`

Find all toasts in a group.

```tsx
const notifications = Toast.findByGroup('notifications')
console.log(`📬 ${notifications.length} notifications`)
```

---

### `Toast.reorderToast(id, priority)`

Change a toast's priority in the queue.

```tsx
Toast.reorderToast('toast-123', 10)  // 🔝 Move to higher priority
```

---

### `Toast.updateToast(id, updates)`

Update a queued (not yet shown) toast.

```tsx
Toast.updateToast('toast-123', {
  message: '📝 Updated message',
  priority: 5
})
```

---

### `Toast.getToastPosition(id)`

Get a toast's position in the queue.

```tsx
const position = Toast.getToastPosition('toast-123')
console.log(`📍 Position ${position} in queue`)
```

**Returns:** `number` - Zero-based position, or -1 if not found

## 📈 Progress Methods

Methods for progress-based toasts.

### `Toast.showProgress(message, progress?, options?)`

Show a toast with progress bar.

```tsx
const id = Toast.showProgress('Uploading...', 0)
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `message` | `string` | Progress message |
| `progress` | `number?` | Initial progress (0-1) |
| `options` | `Partial<ToastOptions>` | Additional options |

---

### `Toast.updateProgress(id, progress, message?)`

Update progress value and optionally the message.

```tsx
for (let i = 0; i <= 100; i += 10) {
  await delay(100)
  Toast.updateProgress(id, i / 100, `Uploading... ${i}%`)
}
```

## 🪝 React Hooks

Hooks for React component integration. `Toast.show`/`Toast.hide`/etc. work
outside components too — these two hooks exist for subscribing a component to
queue state.

### `useToastQueue(options?)`

Complete queue management hook.

```tsx
function QueueManager() {
  const {
    stats,      // 📊 Queue statistics
    events,     // 📡 Recent events
    actions     // 🎮 Control functions
  } = useToastQueue({
    refreshInterval: 100  // Update frequency
  })

  return (
    <View>
      <Text>Active: {stats.active}</Text>
      <Text>Pending: {stats.pending}</Text>
      <Button onPress={actions.pauseQueue}>Pause</Button>
      <Button onPress={actions.resumeQueue}>Resume</Button>
    </View>
  )
}
```

---

### `useToastStats(refreshInterval?)`

Statistics-only hook.

```tsx
function StatsDisplay() {
  const stats = useToastStats(100)

  return <Text>📊 {stats.active} active</Text>
}
```

## 🧩 Components

React components for advanced features.

### `<ToastContainer>`

Portal for custom toast views.

```tsx
function App() {
  return (
    <ToastContainer>
      <YourApp />
    </ToastContainer>
  )
}
```

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | App content |
| `style` | `ViewStyle?` | Container style |

---

### `<QueueMonitor>`

Visual debugging component.

```tsx
function DebugScreen() {
  return (
    <QueueMonitor
      showStats={true}
      showEvents={true}
      maxEvents={20}
      refreshInterval={100}
    />
  )
}
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showStats` | `boolean` | `true` | Show statistics |
| `showEvents` | `boolean` | `true` | Show events |
| `maxEvents` | `number` | `10` | Event history size |
| `refreshInterval` | `number` | `100` | Update frequency |

## ⚙️ Configuration

### `Toast.configure(config)`

Set global configuration for all toasts.

```tsx
Toast.configure({
  // 🎯 Queue Settings
  maxConcurrent: 3,        // Max visible toasts
  maxQueueSize: 100,       // Max queued toasts
  queueTimeout: 30000,     // Queue expiry (ms)

  // 🎨 Default Options
  defaultOptions: {
    position: 'bottom',
    duration: 3000,
    animationPreset: 'slide',
    hapticFeedback: 'light'
  },

  // 📚 Stacking
  stackingEnabled: true,
  stackingOffset: 10,
  stackingMaxVisible: 3,

  // 💾 Persistence
  persistenceEnabled: true,
  persistenceInterval: 1000,

  // 📈 Analytics
  analyticsEnabled: true,

  // 🔄 Retry Logic
  maxRetries: 3,
  retryDelay: 1000,

  // 🛡️ Deduplication
  preventDuplicates: true,
  groupDeduplication: true,

  // 📡 Events
  onQueueEvent: (event) => {
    console.log('Queue event:', event)
  }
})
```

**Configuration Options:**
```typescript
interface ToastConfig {
  // Queue Control
  maxConcurrent?: number
  maxQueueSize?: number
  queueTimeout?: number

  // Defaults
  defaultOptions?: Partial<ToastOptions>

  // Stacking
  stackingEnabled?: boolean
  stackingOffset?: number
  stackingMaxVisible?: number

  // Persistence
  persistenceEnabled?: boolean
  persistenceInterval?: number

  // Analytics
  analyticsEnabled?: boolean

  // Retry
  maxRetries?: number
  retryDelay?: number

  // Deduplication
  preventDuplicates?: boolean
  groupDeduplication?: boolean

  // Events
  onQueueEvent?: (event: QueueEvent) => void
}
```

## 📝 Types

### Core Types

```typescript
// Toast types
type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info'

// Positions
type ToastPosition = 'top' | 'center' | 'bottom'

// Duration
type ToastDuration = 'short' | 'long' | number  // short=2000ms, long=3500ms

// Animations
type AnimationPreset = 'fade' | 'slide' | 'bounce' | 'zoom' | 'spring' | 'none'

// Haptics
type HapticType = 'success' | 'warning' | 'error' | 'light' | 'medium' | 'heavy' | 'selection'

// Action styles
type ActionStyle = 'default' | 'destructive' | 'cancel'
```

### Object Types

```typescript
interface ToastAction {
  text: string
  style?: ActionStyle
  onPress: () => void
}

interface QueuedToast extends ToastOptions {
  id: string
  timestamp: number
  status: 'pending' | 'active' | 'dismissed' | 'failed'
  retryCount: number
  expiresAt?: number
}

interface QueueEvent {
  type: 'added' | 'removed' | 'updated' | 'cleared'
  toast?: QueuedToast
  stats: QueueStats
  timestamp: number
}
```

## 📱 Platform-Specific Notes

### iOS
- ✅ Full swipe-to-dismiss support
- ✅ Native haptic feedback via UIKit
- ✅ UIView-based custom views

### Android
- ✅ Swipe-to-dismiss support (`GestureDetector`)
- ✅ Haptic via Vibration API
- ✅ Custom WindowManager overlays

### Web
- ✅ Full swipe support via touch events
- ✅ Haptic via Navigator.vibrate (if supported)
- ⚠️ No AsyncStorage (use localStorage adapter)

## 💡 Best Practices

### 1️⃣ Use Priority for Important Messages

```tsx
// Critical errors get shown first
Toast.show({
  message: '🚨 Critical error!',
  type: 'error',
  priority: 10  // High priority
})

// Info messages can wait
Toast.show({
  message: 'ℹ️ FYI',
  type: 'info',
  priority: 1   // Low priority
})
```

### 2️⃣ Group Related Toasts

```tsx
// Group notifications for bulk management
Toast.show({
  message: '📧 New email',
  group: 'notifications'
})

// Clear all at once
Toast.clearGroup('notifications')
```

### 3️⃣ Prevent Spam with Deduplication

```tsx
Toast.configure({
  preventDuplicates: true,
  groupDeduplication: true
})

// These won't create duplicates
Toast.show('Same message')
Toast.show('Same message')  // Ignored
```

### 4️⃣ Handle Promises Elegantly

```tsx
// Let the library handle all states
await Toast.promise(
  api.saveData(data),
  {
    loading: '💾 Saving...',
    success: '✅ Saved!',
    error: (e) => `❌ ${e.message}`
  }
)
```

### 5️⃣ Use Custom Views for Rich Content

```tsx
Toast.show({
  customView: ({ toast, onDismiss }) => (
    <Card>
      <Avatar uri={user.photo} />
      <Text>{user.name} sent a message</Text>
      <Button title="Reply" onPress={handleReply} />
      <Button title="Dismiss" onPress={onDismiss} />
    </Card>
  )
})
```

## 🔧 Troubleshooting

### Toast not showing?
```tsx
// Check if queue is paused
console.log('Queue paused?', Toast.getQueueStats())

// Check max concurrent limit
Toast.configure({ maxConcurrent: 5 })
```

### Custom view not rendering?
```tsx
// Ensure ToastContainer wraps your app
<ToastContainer>
  <App />
</ToastContainer>
```

### Persistence not working?
```bash
# Install peer dependency
npm install @react-native-async-storage/async-storage

# Enable in config
Toast.configure({ persistenceEnabled: true })
```

---

<div align="center">
  <sub>📚 API documentation for react-native-turbo-toast</sub><br/>
  <sub>🐛 Found an issue? <a href="https://github.com/anivar/react-native-turbo-toast/issues">Report it</a></sub>
</div>