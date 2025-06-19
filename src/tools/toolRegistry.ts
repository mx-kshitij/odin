export const toolRegistry: Record<string, (input: any) => Promise<string>> = {
  'calculator': async (input) => {
    // Example: input = { a: number, b: number }
    if (typeof input.a === 'number' && typeof input.b === 'number') {
      return `Result: ${input.a + input.b}`;
    }
    return 'Invalid input for calculator tool.';
  },
  // Add more tools here
}; 