// Implemented by Gemini.
'use server';
/**
 * @fileOverview Suggests related elements based on input element properties.
 *
 * - suggestElements - A function that suggests related elements.
 * - SuggestElementsInput - The input type for suggestElements function.
 * - SuggestElementsOutput - The return type of the suggestElements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestElementsInputSchema = z.object({
  properties: z
    .string()
    .describe(
      'The properties of the element(s) the user is interested in. Should include state, group, electronegativity, etc.'
    ),
});
export type SuggestElementsInput = z.infer<typeof SuggestElementsInputSchema>;

const SuggestElementsOutputSchema = z.object({
  suggestions: z
    .string()
    .describe('A list of suggested related elements and why they are related.'),
});
export type SuggestElementsOutput = z.infer<typeof SuggestElementsOutputSchema>;

export async function suggestElements(input: SuggestElementsInput): Promise<SuggestElementsOutput> {
  return suggestElementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestElementsPrompt',
  input: {schema: SuggestElementsInputSchema},
  output: {schema: SuggestElementsOutputSchema},
  prompt: `You are a chemistry expert. A user is interested in elements with certain properties.

  Suggest other elements that share those properties, and explain why they are related.

  Properties: {{{properties}}}`,
});

const suggestElementsFlow = ai.defineFlow(
  {
    name: 'suggestElementsFlow',
    inputSchema: SuggestElementsInputSchema,
    outputSchema: SuggestElementsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
