import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const SettingScalarFieldEnumSchema = z.enum(['key','language']);

export const ChannelScalarFieldEnumSchema = z.enum(['id','name','user','url']);

export const VideoScalarFieldEnumSchema = z.enum(['id','title','description','url','channelId']);

export const UserScalarFieldEnumSchema = z.enum(['id','name']);

export const RequestScalarFieldEnumSchema = z.enum(['id','videoId','userId','createdAt']);

export const QueueScalarFieldEnumSchema = z.enum(['id','requestId','order']);

export const HistoryScalarFieldEnumSchema = z.enum(['id','requestId','playedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const LanguageSchema = z.enum(['EN','JA']);

export type LanguageType = `${z.infer<typeof LanguageSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// SETTING SCHEMA
/////////////////////////////////////////

export const SettingSchema = z.object({
  language: LanguageSchema,
  key: z.string(),
})

export type Setting = z.infer<typeof SettingSchema>

/////////////////////////////////////////
// CHANNEL SCHEMA
/////////////////////////////////////////

export const ChannelSchema = z.object({
  id: z.string(),
  name: z.string(),
  user: z.string(),
  url: z.string(),
})

export type Channel = z.infer<typeof ChannelSchema>

/////////////////////////////////////////
// VIDEO SCHEMA
/////////////////////////////////////////

export const VideoSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  url: z.string(),
  channelId: z.string(),
})

export type Video = z.infer<typeof VideoSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// REQUEST SCHEMA
/////////////////////////////////////////

export const RequestSchema = z.object({
  id: z.string().uuid(),
  videoId: z.string(),
  userId: z.string(),
  createdAt: z.coerce.date(),
})

export type Request = z.infer<typeof RequestSchema>

/////////////////////////////////////////
// QUEUE SCHEMA
/////////////////////////////////////////

export const QueueSchema = z.object({
  id: z.string().uuid(),
  requestId: z.string(),
  order: z.number().int(),
})

export type Queue = z.infer<typeof QueueSchema>

/////////////////////////////////////////
// HISTORY SCHEMA
/////////////////////////////////////////

export const HistorySchema = z.object({
  id: z.string().uuid(),
  requestId: z.string(),
  playedAt: z.coerce.date(),
})

export type History = z.infer<typeof HistorySchema>
