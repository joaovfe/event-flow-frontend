export function formatCurrency(value: unknown): string {

  const num = typeof value === 'number' ? value : Number(value);


  return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}