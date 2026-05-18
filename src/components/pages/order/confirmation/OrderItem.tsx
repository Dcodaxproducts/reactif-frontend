import type { OrderItemData } from "@/types/component-props";

export function OrderItem({ name, qty, price }: OrderItemData) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 items-center px-4 py-4 border-t border-neutral-50/10 text-neutral-50/60 gap-2">
      <span>{name}</span>
      <span className="md:text-center">Qty: {qty}</span>
      <span className="md:text-right">{price}</span>
    </div>
  );
}
