# Requirements Document

## Introduction

This feature enhances the existing React + Vite portfolio website to feel more modern and professional. The enhancement preserves the current UI structure, routing, and component hierarchy while layering in GPU-accelerated 3D scroll animations, parallax depth effects, smooth section reveals, and performance optimizations. The goal is a visually premium experience with zero perceptible lag on both desktop and mobile.

## Glossary

- **Portfolio_App**: The React + Vite single-page application comprising Home, About, Projects, and Contact pages.
- **Scroll_Animation_System**: The set of Framer Motion hooks (`useScroll`, `useTransform`, `useSpring`) that drive scroll-linked visual transforms.
- **Section**: A top-level `<section>` element within a page component (e.g., HeroSection, HomeBioSection, HomeServicesSection).
- **TiltCard**: The existing `TiltCard.jsx` component that applies 3D perspective tilt and glare on mouse interaction.
- **Hero3D_Canvas**: The Three.js `<Canvas>` rendered by `Hero3D.jsx` as a fixed background layer.
- **Viewport_Trigger**: The Framer Motion `whileInView` / `useInView` mechanism that fires when an element enters the browser viewport.
- **Parallax_Layer**: A DOM element whose CSS `transform: translateY()` value is driven by scroll progress, creating a depth illusion.
- **GPU_Acceleration**: The use of CSS `transform` and `opacity` properties (and `will-change`) so the browser compositor handles animation without triggering layout or paint.
- **Reduced_Motion**: A state where heavy 3D and particle effects are scaled back, applied on mobile viewports (width < 768 px) or when `prefers-reduced-motion` is set.
- **Page_Transition**: The animated overlay that plays when the React Router route changes.

---

## Requirements

### Requirement 1: Scroll-Linked Parallax Depth on Hero Section

**User Story:** As a visitor, I want the hero section to respond to my scroll with a subtle depth effect, so that the page feels immersive and three-dimensional from the first interaction.

#### Acceptance Criteria

1. WHEN the user scrolls down from the top of the page, THE Scroll_Animation_System SHALL translate the hero text column upward by a value proportional to `scrollY`, using `useTransform` with an output range of `[0, 50]` pixels.
2. WHEN the user scrolls down from the top of the page, THE Scroll_Animation_System SHALL scale the hero text column from `1.0` to `1.1` using `useTransform`, applied only on viewports wider than 768 px.
3. WHEN the user scrolls past 300 px from the top, THE Scroll_Animation_System SHALL fade the hero container opacity from `1` to `0` using `useTransform` over the range `[0, 300]` px.
4. THE Scroll_Animation_System SHALL apply all parallax transforms exclusively via CSS `transform` and `opacity` properties to ensure GPU_Acceleration.
5. THE Scroll_Animation_System SHALL attach the scroll listener with `{ passive: true }` to avoid blocking the main thread.

---

### Requirement 2: Section Reveal Animations on Scroll

**User Story:** As a visitor, I want each content section to animate into view as I scroll, so that the page feels dynamic and guides my attention naturally.

#### Acceptance Criteria

1. WHEN a Section enters the viewport, THE Scroll_Animation_System SHALL animate the section from `opacity: 0, y: 50px` to `opacity: 1, y: 0` using a spring-eased transition of duration ≤ 0.8 s.
2. WHEN a Section enters the viewport, THE Scroll_Animation_System SHALL trigger the reveal animation only once per page load (`once: true` on the Viewport_Trigger).
3. WHEN multiple child elements exist within a Section, THE Scroll_Animation_System SHALL stagger their reveal with a delay increment of 0.1–0.2 s between children.
4. THE Scroll_Animation_System SHALL use `viewport={{ margin: "-100px" }}` so reveals begin slightly before the element is fully visible.
5. IF a Section has already been revealed, THEN THE Scroll_Animation_System SHALL preserve the final animated state and not re-animate on subsequent scrolls.

---

### Requirement 3: Scroll-Driven Section Scale and Opacity (Bio & Services)

**User Story:** As a visitor, I want the About Bio and Services sections to subtly scale and fade as I scroll through them, so that the reading experience feels cinematic.

#### Acceptance Criteria

1. WHEN the HomeBioSection is between `start end` and `end start` scroll offsets, THE Scroll_Animation_System SHALL interpolate its opacity from `0 → 1 → 1 → 0` across scroll progress values `[0, 0.2, 0.8, 1]`.
2. WHEN the HomeBioSection is between `start end` and `end start` scroll offsets, THE Scroll_Animation_System SHALL interpolate its scale from `0.8 → 1 → 1 → 0.8` across scroll progress values `[0, 0.2, 0.8, 1]`.
3. WHEN the HomeServicesSection is between `start end` and `end start` scroll offsets, THE Scroll_Animation_System SHALL interpolate its opacity from `0 → 1 → 1 → 0` across scroll progress values `[0, 0.2, 0.8, 1]`.
4. WHEN the HomeServicesSection is between `start end` and `end start` scroll offsets, THE Scroll_Animation_System SHALL interpolate its scale from `0.9 → 1 → 1 → 0.9` across scroll progress values `[0, 0.2, 0.8, 1]`.
5. THE Scroll_Animation_System SHALL use `useScroll` with a `target` ref and `offset: ["start end", "end start"]` for each section to scope the scroll progress correctly.

---

### Requirement 4: 3D Tilt Interaction on All Interactive Cards

**User Story:** As a visitor, I want cards to tilt in 3D toward my cursor when I hover, so that the interface feels tactile and premium.

#### Acceptance Criteria

1. THE TiltCard SHALL apply a `rotateX` transform in the range `[-15deg, 15deg]` driven by the vertical mouse position relative to the card.
2. THE TiltCard SHALL apply a `rotateY` transform in the range `[-15deg, 15deg]` driven by the horizontal mouse position relative to the card.
3. THE TiltCard SHALL use `useSpring` with `stiffness: 120` and `damping: 25` to smooth the tilt motion.
4. WHEN the cursor leaves a TiltCard, THE TiltCard SHALL animate `rotateX` and `rotateY` back to `0` using the same spring configuration.
5. THE TiltCard SHALL render a radial-gradient glare overlay that follows the cursor position without triggering React re-renders (using Framer Motion `useMotionValue` and `useTransform`).
6. THE Portfolio_App SHALL wrap all ServiceCard, StatCard, FeaturedProjectCard, and ProjectGridItem elements in a TiltCard component.

---

### Requirement 5: Hero3D Canvas Performance

**User Story:** As a visitor, I want the 3D particle background to run smoothly without dropping frames, so that the page feels fast and polished.

#### Acceptance Criteria

1. THE Hero3D_Canvas SHALL set `frameloop="demand"` so Three.js only renders frames when motion values change, reducing idle GPU usage.
2. THE Hero3D_Canvas SHALL cap the device pixel ratio at `[1, 1.5]` on desktop and `[1, 1]` on mobile to limit fill-rate cost.
3. THE Hero3D_Canvas SHALL render no more than 400 particles on desktop and no more than 150 particles on mobile.
4. WHEN the user scrolls, THE Hero3D_Canvas SHALL update particle rotation using a `scrollRef` (updated via a passive scroll listener) inside `useFrame`, avoiding React state updates.
5. THE Hero3D_Canvas SHALL apply `THREE.AdditiveBlending` and `depthWrite: false` on the particle material to avoid overdraw sorting overhead.
6. THE Hero3D_Canvas SHALL set `performance={{ min: 0.5 }}` to allow Three.js to automatically reduce resolution under load.

---

### Requirement 6: Scroll Progress Indicator

**User Story:** As a visitor, I want a thin progress bar at the top of the page that fills as I scroll, so that I always know how far through the content I am.

#### Acceptance Criteria

1. THE Scroll_Animation_System SHALL render a fixed-position bar at `top: 0` with `height: 3px` that scales from `scaleX: 0` to `scaleX: 1` as `scrollYProgress` goes from `0` to `1`.
2. THE Scroll_Animation_System SHALL smooth the `scrollYProgress` value using `useSpring` with `stiffness: 100` and `damping: 30` before applying it to `scaleX`.
3. THE Scroll_Animation_System SHALL style the bar with a `linear-gradient` from `var(--primary-accent)` to `var(--secondary-accent)` and a matching `box-shadow` glow.
4. FOR ALL scroll positions p in [0, 1], the rendered `scaleX` value SHALL be within 0.05 of p after the spring settles (round-trip property: scroll position maps to bar fill).

---

### Requirement 7: Smooth Page Transition Animations

**User Story:** As a visitor, I want a smooth visual transition when navigating between pages, so that route changes feel intentional rather than abrupt.

#### Acceptance Criteria

1. WHEN the React Router route changes, THE Portfolio_App SHALL display a full-screen overlay that fades in and out over 600 ms using a CSS `@keyframes` animation.
2. WHEN the route changes, THE Portfolio_App SHALL reset `window.scrollY` to `0` before the new page renders.
3. THE Portfolio_App SHALL set `window.history.scrollRestoration = 'manual'` to prevent the browser from restoring scroll position on navigation.
4. IF the overlay animation completes, THEN THE Portfolio_App SHALL remove the overlay from the DOM by setting `isTransitioning` to `false`.

---

### Requirement 8: Reduced Motion on Mobile and Accessibility

**User Story:** As a mobile visitor or a user with motion sensitivity, I want heavy animations to be reduced or disabled, so that the site remains usable and does not cause discomfort.

#### Acceptance Criteria

1. WHERE the viewport width is less than 768 px, THE Hero3D_Canvas SHALL render no 3D mesh geometries (octahedron, torus) and SHALL reduce particle count to 150.
2. WHERE the viewport width is less than 768 px, THE Scroll_Animation_System SHALL disable the hero text parallax scale and Y-translate transforms (output ranges set to `[1, 1]` and `[0, 0]`).
3. WHERE the CSS media feature `prefers-reduced-motion: reduce` is active, THE Portfolio_App SHALL disable all `animate` prop transitions on Framer Motion components by setting `transition.duration` to `0`.
4. THE Portfolio_App SHALL not use `position: fixed` animations that cover interactive content on mobile viewports.

---

### Requirement 9: Preserve Existing UI Structure and Routing

**User Story:** As the site owner, I want all existing pages, routes, and visual design tokens to remain intact after the enhancement, so that the brand identity is not disrupted.

#### Acceptance Criteria

1. THE Portfolio_App SHALL retain all four routes: `/`, `/about`, `/projects`, and `/contact`.
2. THE Portfolio_App SHALL retain all existing CSS custom properties defined in `src/index.css` (color tokens, glass variables, font variables).
3. THE Portfolio_App SHALL retain all existing component class names so that existing CSS rules continue to apply without modification.
4. WHEN the enhancement is applied, THE Portfolio_App SHALL not introduce any new npm dependencies beyond those already listed in `package.json` (`framer-motion`, `@react-three/fiber`, `@react-three/drei`, `three`).
5. THE Portfolio_App SHALL retain the `CustomCursor`, `Topbar`, `Hero3D`, `TiltCard`, and `ModernCounter` components without removing or renaming them.
