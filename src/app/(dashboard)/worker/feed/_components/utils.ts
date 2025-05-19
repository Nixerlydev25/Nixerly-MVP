export function formatCurrency(amount: number | null | undefined): string {
    if (amount === null || amount === undefined) {
      return "$0"
    }
  
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }
  