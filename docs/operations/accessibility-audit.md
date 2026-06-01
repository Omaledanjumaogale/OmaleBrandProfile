# Accessibility Audit

## Scope
- Public routes: `/`, `/platforms`, `/apply`, `/services`, `/faq`
- Protected routes: `/admin/login`, `/admin`

## Automated Coverage
- Playwright route smoke coverage
- Axe-based accessibility checks for critical and serious issues

## Manual Verification Checklist
- Keyboard-only navigation across primary forms and admin controls
- Focus visibility on buttons, links, and dialog controls
- Screen-reader announcement of headings, labels, and status changes
- Contrast checks on gold-on-dark controls and system status badges
- Mobile touch-target review for 44px minimum interactive controls

## Release Gate
- No critical accessibility findings
- No serious automated Axe findings on audited routes
- Manual keyboard path verified for admin login and IAM application flows
