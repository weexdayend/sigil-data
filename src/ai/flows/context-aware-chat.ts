// src/ai/flows/context-aware-chat.ts
'use server';

/**
 * @fileOverview An AI agent for context-aware chat.
 *
 * - contextAwareChat - A function that handles the context-aware chat process.
 * - ContextAwareChatInput - The input type for the contextAwareChat function.
 * - ContextAwareChatOutput - The return type for the contextAwareChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ContextAwareChatInputSchema = z.object({
  userInput: z.string().describe('The user input to be processed.'),
  context: z.string().describe('The context to be used for generating the response.'),
});
export type ContextAwareChatInput = z.infer<typeof ContextAwareChatInputSchema>;

const ContextAwareChatOutputSchema = z.object({
  response: z.string().describe('The AI generated response based on the user input and context.'),
});
export type ContextAwareChatOutput = z.infer<typeof ContextAwareChatOutputSchema>;

export async function contextAwareChat(input: ContextAwareChatInput): Promise<ContextAwareChatOutput> {
  return contextAwareChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contextAwareChatPrompt',
  input: {schema: ContextAwareChatInputSchema},
  output: {schema: ContextAwareChatOutputSchema},
  prompt: `You are an AI assistant that generates responses based on user input and provided context.

  User Input: {{{userInput}}}
  Context: {{{context}}}

  Generate a helpful and informative response based on the user input and context.`,
});

const contextAwareChatFlow = ai.defineFlow(
  {
    name: 'contextAwareChatFlow',
    inputSchema: ContextAwareChatInputSchema,
    outputSchema: ContextAwareChatOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
