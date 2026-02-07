# Specification

## Summary
**Goal:** Refresh and complete the KindKart frontend UX by standardizing marketplace terminology, fixing NGO navigation 404s, adding delivery status and tracking access, enhancing trust signals (testimonials + seller ratings), and improving donation/buy checkout flows with clear payment details and richer dummy data.

**Planned changes:**
- Rename marketplace UI language from “Products” to “Necessity Items” across relevant pages/components while keeping routes unchanged.
- Fix NGO navbar links so “Post Requirements” and “Delivery Tracking” route to the existing paths and no longer hit Not Found.
- Add a user-facing Delivery section that lists deliveries with statuses (dummy/seeded data) and links into the existing tracking details route by trackingId.
- Add a public testimonials section (at least 4 entries) including name, role/type, short quote, and a visible rating.
- Add seller authenticity star ratings + review counts to marketplace listings and ensure consistent seller rating display on item detail pages, including a short review summary/list (dummy data).
- Ensure every marketplace item detail page shows a clear description section, with a sensible fallback when missing.
- Add a donor budget UI that lets users set a budget and shows recommended donation necessity items that update client-side (UI-only, dummy data).
- Update checkout initiation from item detail to offer “Buy for yourself” vs “Donate”; if Donate, require choosing “Donate anonymously” vs “Show my name,” and reflect it in confirmation/summary.
- Add coherent payment details panels for both buying and donating flows (breakdown + payer/donor details; dummy values).
- Populate dashboards/analytics and delivery/map-related UIs with realistic dummy datasets so primary views don’t look empty, including dummy route/markers where maps are shown.
- Apply a cohesive warm/neutral visual theme refresh (avoid blue/purple) across the newly added/modified UI sections with consistent typography, spacing, and components.

**User-visible outcome:** Users see “Necessity Items” throughout the marketplace, can view delivery status lists and open tracking details, read testimonials, evaluate sellers via ratings/reviews, always see item descriptions, set a donation budget to browse recommended items, and complete buy/donate flows with anonymity choice and clear payment breakdowns—while NGO navigation no longer leads to Not Found and dashboards show meaningful dummy data.
