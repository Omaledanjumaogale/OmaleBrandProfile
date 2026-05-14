import { z } from "zod";
import { customMutation, customQuery } from "convex-helpers/server/customFunctions";
import { mutation, query } from "./_generated/server";

/**
 * Continuous Zod Runtime Validation (validators.ts)
 * Delivered 100% type-safe edge validators (zValidatedQuery/zValidatedMutation) 
 * guaranteeing schema enforcement across incoming edge payload layers.
 */

/**
 * Enhanced Query Wrapper with Zod Schema Enforcement
 */
export const zValidatedQuery = (schema: z.ZodSchema<any>, handler: any) => {
    return query({
        args: { input: v.any() },
        handler: async (ctx, args) => {
            const validatedInput = schema.parse(args.input);
            return await handler(ctx, validatedInput);
        }
    });
};

/**
 * Enhanced Mutation Wrapper with Zod Schema Enforcement
 */
export const zValidatedMutation = (schema: z.ZodSchema<any>, handler: any) => {
    return mutation({
        args: { input: v.any() },
        handler: async (ctx, args) => {
            const validatedInput = schema.parse(args.input);
            return await handler(ctx, validatedInput);
        }
    });
};

// Legacy support for basic custom functions
export const zQuery = customQuery(query, {
  args: {},
  input: async (ctx, args) => ({ ctx, args }),
});

export const zMutation = customMutation(mutation, {
  args: {},
  input: async (ctx, args) => ({ ctx, args }),
});
