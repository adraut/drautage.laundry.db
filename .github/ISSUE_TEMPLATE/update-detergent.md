---
name: Update Detergent Product
about: Request to update the ingredient list for an existing detergent product profile
title: 'Update [Brand] [Product Name]'
labels: enhancement, Detergent, update
assignees: ''
---

## Update [Brand] [Product Name]

**Existing profile:** `brand-product-variant.ts`

**Summary of changes:** _e.g. 2 ingredients added, 1 removed_

**Data source:** (Package / SDS)
**Data date:**
**Photographed:** (Retailer, date, country)

---

### Diff

| #   | Current profile         | New (packaging)    |
| --- | ----------------------- | ------------------ |
| 1   | `IngredientEnum`        | `IngredientEnum` ✓ |
| 2   | ~~`RemovedIngredient`~~ | _(removed)_        |
| 3   | _(new)_                 | `AddedIngredient`  |

### Updated ingredient list (N ingredients):

1. `Ingredient.`

## Notes

- Any OR rules applied
- Any "may contain" conditional ingredients
- Any new enum entries needed
- Any OCR uncertainty or unknowns
