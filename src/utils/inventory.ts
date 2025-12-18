import type { EntityType, Inventory } from '@/types/state'
import { invariant } from '@/utils/invariant'

export function inventoryAdd(
  inventory: Inventory,
  entityType: EntityType,
  amount: number = 1,
): void {
  // prettier-ignore
  {
    invariant(amount > 0, 'Amount to add must be positive')
    invariant(amount === Math.floor(amount), 'Amount to add must be an integer')
    inventory[entityType] = (inventory[entityType] ?? 0) + amount
  }
}

export function inventoryCount(
  inventory: Inventory,
  entityType: EntityType,
): number {
  return inventory[entityType] ?? 0
}
