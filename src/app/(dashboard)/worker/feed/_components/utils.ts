export function formatCurrency(amount: number | null | undefined): string {
    if (amount === null || amount === undefined) {
      return "€0"
    }
  
    // Convert to euros (assuming 1 USD = 0.92 EUR)
    const amountInEuros = amount * 0.92;
    
    // Convert to hundreds of pounds (assuming 1 EUR = 0.86 GBP)
    const amountInPounds = amountInEuros * 0.86;
    const amountInHundredsOfPounds = amountInPounds / 100;
  
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amountInEuros) + ` (${amountInHundredsOfPounds.toFixed(1)} hundred £)`
  }
  