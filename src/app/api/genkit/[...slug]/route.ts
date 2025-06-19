// src/app/api/genkit/[...slug]/route.ts
import {createNextHandler} from '@genkit-ai/next';
import '@/ai/genkit'; // Ensure Genkit is configured

export const POST = createNextHandler();
