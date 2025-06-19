// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview Provides example prompt suggestions for new users.
 *
 * - generateInitialPrompt - A function that generates example prompts.
 * - GenerateInitialPromptInput - The input type for the generateInitialPrompt function. (void)
 * - GenerateInitialPromptOutput - The return type for the generateInitialPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInitialPromptInputSchema = z.void();
export type GenerateInitialPromptInput = z.infer<typeof GenerateInitialPromptInputSchema>;

const GenerateInitialPromptOutputSchema = z.object({
  prompts: z.array(z.string()).describe('An array of example prompt suggestions.'),
});
export type GenerateInitialPromptOutput = z.infer<typeof GenerateInitialPromptOutputSchema>;

export async function generateInitialPrompt(input: GenerateInitialPromptInput): Promise<GenerateInitialPromptOutput> {
  return generateInitialPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInitialPromptPrompt',
  input: {schema: GenerateInitialPromptInputSchema},
  output: {schema: GenerateInitialPromptOutputSchema},
  prompt: `You are a helpful assistant that provides example prompts to new users of a chat interface.

  Generate an array of 3 diverse and interesting prompt suggestions that showcase the AI's capabilities.  The prompts should be appropriate for a general audience.

  Example Output:
  {
    "prompts": [
      "Summarize the plot of the movie Inception.",
      "Explain the theory of relativity in simple terms.",
      "Write a short poem about the beauty of nature.",
    ]
  }`,
});

const generateInitialPromptFlow = ai.defineFlow(
  {
    name: 'generateInitialPromptFlow',
    inputSchema: GenerateInitialPromptInputSchema,
    outputSchema: GenerateInitialPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
