# Design System Reference

## Color Palette

### Primary Palette (Premium Dark)

| Token | Hex | Tailwind Class | Usage |
|-------|-----|----------------|-------|
| Main Background | `#080D18` | `bg-background` | App background |
| Secondary Background | `#0E1626` | `bg-sidebar` | Sidebar, secondary sections |
| Card Background | `#121D30` | `bg-card` | Cards, panels |
| Elevated Surface | `#18253A` | `bg-popover` | Modals, dropdowns |
| Border | `#26364C` | `border-border` | All borders, dividers |
| Foreground (text) | `#F3F6FC` | `text-foreground` | Primary text |
| Muted Foreground | `#A4B1C5` | `text-muted-foreground` | Secondary text |

### Brand Accents

| Token | Hex | Usage |
|-------|-----|-------|
| Primary | `#4D8DFF` | Links, primary buttons, focus rings |
| Accent | `#35D6C5` | Cyan highlights, secondary CTAs |
| Violet | `#8B7BFF` | AI Copilot accent |
| Success | `#34D399` | Verified, paid, complete |
| Warning | `#F2B441` | Pending, closing soon |
| Danger | `#F45B6B` | Errors, reversed, expired |

### Usage Examples

```tsx
// Backgrounds
<div className="bg-background" />
<div className="bg-card/40" />          // 40% opacity
<div className="bg-sidebar" />

// Borders
<div className="border border-border" />
<div className="border-[#4D8DFF]/40" /> // brand-tinted border

// Text
<p className="text-foreground" />
<p className="text-muted-foreground" />
<p className="text-[#4D8DFF]" />        // brand text

// Status badges
<StatusBadge variant="success" />       // green
<StatusBadge variant="warning" />       // amber
<StatusBadge variant="danger" />        // red
<StatusBadge variant="primary" />       // blue
<StatusBadge variant="violet" />        // purple
<StatusBadge variant="accent" />        // cyan
<StatusBadge variant="neutral" />       // gray
```

## Typography

- **Primary font**: Geist Sans (loaded via `next/font/google`)
- **Mono font**: Geist Mono
- **Font feature settings**: `cv11`, `ss01`, `ss03` for improved readability
- **Anti-aliasing**: `-webkit-font-smoothing: antialiased`

### Type Scale

| Element | Class | Size |
|---------|-------|------|
| H1 (page) | `text-xl font-bold tracking-tight` | 20px |
| H2 (section) | `text-lg font-semibold tracking-tight` | 18px |
| H3 (subsection) | `text-sm font-semibold` | 14px |
| Body | `text-sm` | 14px |
| Small | `text-xs` | 12px |
| Tiny | `text-[11px]` | 11px |
| Micro | `text-[10px]` | 10px |
| KPI value | `text-2xl font-semibold tabular-nums` | 24px |
| Hero headline | `text-4xl sm:text-5xl lg:text-6xl font-bold` | 36-60px |

## Spacing

Standard Tailwind spacing scale. Common patterns:

- Page padding: `px-4 py-5 sm:px-6 lg:px-8`
- Card padding: `p-4` (default) or `p-6` (large)
- Grid gaps: `gap-3` (tight), `gap-4` (default), `gap-6` (loose)
- Stack spacing: `space-y-2`, `space-y-3`, `space-y-4`

## Border Radius

```css
--radius: 0.5rem;          /* 8px base */
--radius-sm: calc(0.5rem - 4px);  /* 4px */
--radius-md: calc(0.5rem - 2px);  /* 6px */
--radius-lg: 0.5rem;              /* 8px */
--radius-xl: calc(0.5rem + 4px);  /* 12px */
```

Common usage:
- `rounded-md` for buttons, inputs, badges
- `rounded-lg` for cards, panels
- `rounded-full` for avatars, dots

## Shadows & Effects

### Glassmorphism Panel

```css
.gtos-panel {
  background: linear-gradient(180deg, rgba(24,37,58,0.6) 0%, rgba(18,29,48,0.7) 100%);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}
```

### Glow Effect

```css
.gtos-glow {
  box-shadow:
    0 0 0 1px rgba(77,141,255,0.15),
    0 8px 32px -8px rgba(77,141,255,0.25);
}
```

### Grid Background

```css
.gtos-grid-bg {
  background-image:
    linear-gradient(rgba(77,141,255,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(77,141,255,0.06) 1px, transparent 1px);
  background-size: 32px 32px;
}
```

### Gradient Text

```css
.gtos-text-gradient {
  background: linear-gradient(90deg, #F3F6FC 0%, #4D8DFF 60%, #35D6C5 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

## Animations

### Entrance (Framer Motion)

```tsx
<motion.div
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, delay: i * 0.04 }}
>
```

### View Transition (AnimatePresence)

```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={view}
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -6 }}
    transition={{ duration: 0.18 }}
  >
```

### CSS Animations

```css
@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
}
.pulse-dot { animation: pulse-dot 2s ease-in-out infinite; }

@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}
```

## Component Patterns

### KPI Card

```tsx
<KpiCard
  label="Active Opportunities"
  value="12"
  delta={{ value: "+3", direction: "up" }}
  icon={Target}
  accent="primary"
  trend={[6, 7, 6, 8, 9, 11, 12]}
  hint="Closing soon: 1"
/>
```

### Status Badge

```tsx
// Direct variant
<StatusBadge variant="success" dot>Active</StatusBadge>

// Via helper
<StatusBadge variant={stageBadge(rfq.status)} dot>{rfq.status}</StatusBadge>
<StatusBadge variant={verificationBadge(company.verification).variant}>
  {company.verification}
</StatusBadge>
```

### Page Card

```tsx
<PageCard className="hover:border-[#4D8DFF]/40 transition-colors">
  <SectionHeader title="Title" subtitle="Subtitle" actions={<button>...</button>} />
  {/* content */}
</PageCard>
```

### Empty State

```tsx
<EmptyState
  title="No results found"
  description="Try adjusting filters"
  icon={Search}
  action={<button>Reset</button>}
/>
```

## Custom Scrollbar

```css
::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb {
  background: #26364C;
  border-radius: 8px;
}
::-webkit-scrollbar-thumb:hover { background: #314458; }
```

## Iconography

All icons from [Lucide React](https://lucide.dev). Standard sizing:

| Context | Size | Class |
|---------|------|-------|
| Inline (in text) | 12px | `h-3 w-3` |
| Small button | 14px | `h-3.5 w-3.5` |
| Default | 16px | `h-4 w-4` |
| Card icon | 18px | `h-4.5 w-4.5` (use `h-4 w-4`) |
| Hero / large | 20px | `h-5 w-5` |

Color follows context:
- Default: `text-muted-foreground`
- Active: `text-foreground` or `text-[#4D8DFF]`
- Brand accent: `text-[#4D8DFF]`, `text-[#35D6C5]`, `text-[#8B7BFF]`
- Semantic: `text-[#34D399]`, `text-[#F2B441]`, `text-[#F45B6B]`
