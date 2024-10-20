import { z } from "zod";

export const OPTIONAL_STRING = z.string().optional();
export const OPTIONAL_BOOLEAN = z.boolean().optional();
export const OPTIONAL_NUMBER = z.number().optional();
export const OPTIONAL_INTEGER_REGEX = z
  .string()
  .regex(/^\d+$/)
  .optional();
export const OPTIONAL_NUMBER_REGEX = z
  .string()
  .regex(/^\d+(\.\d+)?$/)
  .optional();
