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

// CHANNEL RELATION SCHEMA
//------------------------------------------------------

export type ChannelRelations = {
  Video: VideoWithRelations[];
};

export type ChannelWithRelations = z.infer<typeof ChannelSchema> & ChannelRelations

export const ChannelWithRelationsSchema: z.ZodType<ChannelWithRelations> = ChannelSchema.merge(z.object({
  Video: z.lazy(() => VideoWithRelationsSchema).array(),
}))

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

// VIDEO RELATION SCHEMA
//------------------------------------------------------

export type VideoRelations = {
  channel: ChannelWithRelations;
  Request: RequestWithRelations[];
};

export type VideoWithRelations = z.infer<typeof VideoSchema> & VideoRelations

export const VideoWithRelationsSchema: z.ZodType<VideoWithRelations> = VideoSchema.merge(z.object({
  channel: z.lazy(() => ChannelWithRelationsSchema),
  Request: z.lazy(() => RequestWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export type User = z.infer<typeof UserSchema>

// USER RELATION SCHEMA
//------------------------------------------------------

export type UserRelations = {
  Request: RequestWithRelations[];
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> = UserSchema.merge(z.object({
  Request: z.lazy(() => RequestWithRelationsSchema).array(),
}))

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

// REQUEST RELATION SCHEMA
//------------------------------------------------------

export type RequestRelations = {
  video: VideoWithRelations;
  requestedBy: UserWithRelations;
  Queue: QueueWithRelations[];
  History: HistoryWithRelations[];
};

export type RequestWithRelations = z.infer<typeof RequestSchema> & RequestRelations

export const RequestWithRelationsSchema: z.ZodType<RequestWithRelations> = RequestSchema.merge(z.object({
  video: z.lazy(() => VideoWithRelationsSchema),
  requestedBy: z.lazy(() => UserWithRelationsSchema),
  Queue: z.lazy(() => QueueWithRelationsSchema).array(),
  History: z.lazy(() => HistoryWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// QUEUE SCHEMA
/////////////////////////////////////////

export const QueueSchema = z.object({
  id: z.string().uuid(),
  requestId: z.string(),
  order: z.number().int(),
})

export type Queue = z.infer<typeof QueueSchema>

// QUEUE RELATION SCHEMA
//------------------------------------------------------

export type QueueRelations = {
  request: RequestWithRelations;
};

export type QueueWithRelations = z.infer<typeof QueueSchema> & QueueRelations

export const QueueWithRelationsSchema: z.ZodType<QueueWithRelations> = QueueSchema.merge(z.object({
  request: z.lazy(() => RequestWithRelationsSchema),
}))

/////////////////////////////////////////
// HISTORY SCHEMA
/////////////////////////////////////////

export const HistorySchema = z.object({
  id: z.string().uuid(),
  requestId: z.string(),
  playedAt: z.coerce.date(),
})

export type History = z.infer<typeof HistorySchema>

// HISTORY RELATION SCHEMA
//------------------------------------------------------

export type HistoryRelations = {
  request: RequestWithRelations;
};

export type HistoryWithRelations = z.infer<typeof HistorySchema> & HistoryRelations

export const HistoryWithRelationsSchema: z.ZodType<HistoryWithRelations> = HistorySchema.merge(z.object({
  request: z.lazy(() => RequestWithRelationsSchema),
}))

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// SETTING
//------------------------------------------------------

export const SettingSelectSchema: z.ZodType<Prisma.SettingSelect> = z.object({
  key: z.boolean().optional(),
  language: z.boolean().optional(),
}).strict()

// CHANNEL
//------------------------------------------------------

export const ChannelIncludeSchema: z.ZodType<Prisma.ChannelInclude> = z.object({
  Video: z.union([z.boolean(),z.lazy(() => VideoFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ChannelCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ChannelArgsSchema: z.ZodType<Prisma.ChannelArgs> = z.object({
  select: z.lazy(() => ChannelSelectSchema).optional(),
  include: z.lazy(() => ChannelIncludeSchema).optional(),
}).strict();

export const ChannelCountOutputTypeArgsSchema: z.ZodType<Prisma.ChannelCountOutputTypeArgs> = z.object({
  select: z.lazy(() => ChannelCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ChannelCountOutputTypeSelectSchema: z.ZodType<Prisma.ChannelCountOutputTypeSelect> = z.object({
  Video: z.boolean().optional(),
}).strict();

export const ChannelSelectSchema: z.ZodType<Prisma.ChannelSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  user: z.boolean().optional(),
  url: z.boolean().optional(),
  Video: z.union([z.boolean(),z.lazy(() => VideoFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ChannelCountOutputTypeArgsSchema)]).optional(),
}).strict()

// VIDEO
//------------------------------------------------------

export const VideoIncludeSchema: z.ZodType<Prisma.VideoInclude> = z.object({
  channel: z.union([z.boolean(),z.lazy(() => ChannelArgsSchema)]).optional(),
  Request: z.union([z.boolean(),z.lazy(() => RequestFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => VideoCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const VideoArgsSchema: z.ZodType<Prisma.VideoArgs> = z.object({
  select: z.lazy(() => VideoSelectSchema).optional(),
  include: z.lazy(() => VideoIncludeSchema).optional(),
}).strict();

export const VideoCountOutputTypeArgsSchema: z.ZodType<Prisma.VideoCountOutputTypeArgs> = z.object({
  select: z.lazy(() => VideoCountOutputTypeSelectSchema).nullish(),
}).strict();

export const VideoCountOutputTypeSelectSchema: z.ZodType<Prisma.VideoCountOutputTypeSelect> = z.object({
  Request: z.boolean().optional(),
}).strict();

export const VideoSelectSchema: z.ZodType<Prisma.VideoSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  url: z.boolean().optional(),
  channelId: z.boolean().optional(),
  channel: z.union([z.boolean(),z.lazy(() => ChannelArgsSchema)]).optional(),
  Request: z.union([z.boolean(),z.lazy(() => RequestFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => VideoCountOutputTypeArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  Request: z.union([z.boolean(),z.lazy(() => RequestFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  Request: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  Request: z.union([z.boolean(),z.lazy(() => RequestFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// REQUEST
//------------------------------------------------------

export const RequestIncludeSchema: z.ZodType<Prisma.RequestInclude> = z.object({
  video: z.union([z.boolean(),z.lazy(() => VideoArgsSchema)]).optional(),
  requestedBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  Queue: z.union([z.boolean(),z.lazy(() => QueueFindManyArgsSchema)]).optional(),
  History: z.union([z.boolean(),z.lazy(() => HistoryFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RequestCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const RequestArgsSchema: z.ZodType<Prisma.RequestArgs> = z.object({
  select: z.lazy(() => RequestSelectSchema).optional(),
  include: z.lazy(() => RequestIncludeSchema).optional(),
}).strict();

export const RequestCountOutputTypeArgsSchema: z.ZodType<Prisma.RequestCountOutputTypeArgs> = z.object({
  select: z.lazy(() => RequestCountOutputTypeSelectSchema).nullish(),
}).strict();

export const RequestCountOutputTypeSelectSchema: z.ZodType<Prisma.RequestCountOutputTypeSelect> = z.object({
  Queue: z.boolean().optional(),
  History: z.boolean().optional(),
}).strict();

export const RequestSelectSchema: z.ZodType<Prisma.RequestSelect> = z.object({
  id: z.boolean().optional(),
  videoId: z.boolean().optional(),
  userId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  video: z.union([z.boolean(),z.lazy(() => VideoArgsSchema)]).optional(),
  requestedBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  Queue: z.union([z.boolean(),z.lazy(() => QueueFindManyArgsSchema)]).optional(),
  History: z.union([z.boolean(),z.lazy(() => HistoryFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RequestCountOutputTypeArgsSchema)]).optional(),
}).strict()

// QUEUE
//------------------------------------------------------

export const QueueIncludeSchema: z.ZodType<Prisma.QueueInclude> = z.object({
  request: z.union([z.boolean(),z.lazy(() => RequestArgsSchema)]).optional(),
}).strict()

export const QueueArgsSchema: z.ZodType<Prisma.QueueArgs> = z.object({
  select: z.lazy(() => QueueSelectSchema).optional(),
  include: z.lazy(() => QueueIncludeSchema).optional(),
}).strict();

export const QueueSelectSchema: z.ZodType<Prisma.QueueSelect> = z.object({
  id: z.boolean().optional(),
  requestId: z.boolean().optional(),
  order: z.boolean().optional(),
  request: z.union([z.boolean(),z.lazy(() => RequestArgsSchema)]).optional(),
}).strict()

// HISTORY
//------------------------------------------------------

export const HistoryIncludeSchema: z.ZodType<Prisma.HistoryInclude> = z.object({
  request: z.union([z.boolean(),z.lazy(() => RequestArgsSchema)]).optional(),
}).strict()

export const HistoryArgsSchema: z.ZodType<Prisma.HistoryArgs> = z.object({
  select: z.lazy(() => HistorySelectSchema).optional(),
  include: z.lazy(() => HistoryIncludeSchema).optional(),
}).strict();

export const HistorySelectSchema: z.ZodType<Prisma.HistorySelect> = z.object({
  id: z.boolean().optional(),
  requestId: z.boolean().optional(),
  playedAt: z.boolean().optional(),
  request: z.union([z.boolean(),z.lazy(() => RequestArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const SettingWhereInputSchema: z.ZodType<Prisma.SettingWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SettingWhereInputSchema),z.lazy(() => SettingWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SettingWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SettingWhereInputSchema),z.lazy(() => SettingWhereInputSchema).array() ]).optional(),
  key: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  language: z.union([ z.lazy(() => EnumLanguageFilterSchema),z.lazy(() => LanguageSchema) ]).optional(),
}).strict();

export const SettingOrderByWithRelationInputSchema: z.ZodType<Prisma.SettingOrderByWithRelationInput> = z.object({
  key: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SettingWhereUniqueInputSchema: z.ZodType<Prisma.SettingWhereUniqueInput> = z.object({
  key: z.string().optional()
}).strict();

export const SettingOrderByWithAggregationInputSchema: z.ZodType<Prisma.SettingOrderByWithAggregationInput> = z.object({
  key: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SettingCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SettingMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SettingMinOrderByAggregateInputSchema).optional()
}).strict();

export const SettingScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SettingScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SettingScalarWhereWithAggregatesInputSchema),z.lazy(() => SettingScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SettingScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SettingScalarWhereWithAggregatesInputSchema),z.lazy(() => SettingScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  key: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  language: z.union([ z.lazy(() => EnumLanguageWithAggregatesFilterSchema),z.lazy(() => LanguageSchema) ]).optional(),
}).strict();

export const ChannelWhereInputSchema: z.ZodType<Prisma.ChannelWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ChannelWhereInputSchema),z.lazy(() => ChannelWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChannelWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChannelWhereInputSchema),z.lazy(() => ChannelWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Video: z.lazy(() => VideoListRelationFilterSchema).optional()
}).strict();

export const ChannelOrderByWithRelationInputSchema: z.ZodType<Prisma.ChannelOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  Video: z.lazy(() => VideoOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ChannelWhereUniqueInputSchema: z.ZodType<Prisma.ChannelWhereUniqueInput> = z.object({
  id: z.string().optional()
}).strict();

export const ChannelOrderByWithAggregationInputSchema: z.ZodType<Prisma.ChannelOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ChannelCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ChannelMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ChannelMinOrderByAggregateInputSchema).optional()
}).strict();

export const ChannelScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ChannelScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ChannelScalarWhereWithAggregatesInputSchema),z.lazy(() => ChannelScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChannelScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChannelScalarWhereWithAggregatesInputSchema),z.lazy(() => ChannelScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const VideoWhereInputSchema: z.ZodType<Prisma.VideoWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VideoWhereInputSchema),z.lazy(() => VideoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VideoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VideoWhereInputSchema),z.lazy(() => VideoWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  channelId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  channel: z.union([ z.lazy(() => ChannelRelationFilterSchema),z.lazy(() => ChannelWhereInputSchema) ]).optional(),
  Request: z.lazy(() => RequestListRelationFilterSchema).optional()
}).strict();

export const VideoOrderByWithRelationInputSchema: z.ZodType<Prisma.VideoOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  channelId: z.lazy(() => SortOrderSchema).optional(),
  channel: z.lazy(() => ChannelOrderByWithRelationInputSchema).optional(),
  Request: z.lazy(() => RequestOrderByRelationAggregateInputSchema).optional()
}).strict();

export const VideoWhereUniqueInputSchema: z.ZodType<Prisma.VideoWhereUniqueInput> = z.object({
  id: z.string().optional()
}).strict();

export const VideoOrderByWithAggregationInputSchema: z.ZodType<Prisma.VideoOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  channelId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VideoCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VideoMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VideoMinOrderByAggregateInputSchema).optional()
}).strict();

export const VideoScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VideoScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VideoScalarWhereWithAggregatesInputSchema),z.lazy(() => VideoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VideoScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VideoScalarWhereWithAggregatesInputSchema),z.lazy(() => VideoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  channelId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Request: z.lazy(() => RequestListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  Request: z.lazy(() => RequestOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.object({
  id: z.string().optional()
}).strict();

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const RequestWhereInputSchema: z.ZodType<Prisma.RequestWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RequestWhereInputSchema),z.lazy(() => RequestWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RequestWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RequestWhereInputSchema),z.lazy(() => RequestWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  videoId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  video: z.union([ z.lazy(() => VideoRelationFilterSchema),z.lazy(() => VideoWhereInputSchema) ]).optional(),
  requestedBy: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  Queue: z.lazy(() => QueueListRelationFilterSchema).optional(),
  History: z.lazy(() => HistoryListRelationFilterSchema).optional()
}).strict();

export const RequestOrderByWithRelationInputSchema: z.ZodType<Prisma.RequestOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  videoId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  video: z.lazy(() => VideoOrderByWithRelationInputSchema).optional(),
  requestedBy: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  Queue: z.lazy(() => QueueOrderByRelationAggregateInputSchema).optional(),
  History: z.lazy(() => HistoryOrderByRelationAggregateInputSchema).optional()
}).strict();

export const RequestWhereUniqueInputSchema: z.ZodType<Prisma.RequestWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const RequestOrderByWithAggregationInputSchema: z.ZodType<Prisma.RequestOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  videoId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RequestCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RequestMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RequestMinOrderByAggregateInputSchema).optional()
}).strict();

export const RequestScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RequestScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RequestScalarWhereWithAggregatesInputSchema),z.lazy(() => RequestScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RequestScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RequestScalarWhereWithAggregatesInputSchema),z.lazy(() => RequestScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  videoId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const QueueWhereInputSchema: z.ZodType<Prisma.QueueWhereInput> = z.object({
  AND: z.union([ z.lazy(() => QueueWhereInputSchema),z.lazy(() => QueueWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => QueueWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => QueueWhereInputSchema),z.lazy(() => QueueWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  requestId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  order: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  request: z.union([ z.lazy(() => RequestRelationFilterSchema),z.lazy(() => RequestWhereInputSchema) ]).optional(),
}).strict();

export const QueueOrderByWithRelationInputSchema: z.ZodType<Prisma.QueueOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  requestId: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  request: z.lazy(() => RequestOrderByWithRelationInputSchema).optional()
}).strict();

export const QueueWhereUniqueInputSchema: z.ZodType<Prisma.QueueWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const QueueOrderByWithAggregationInputSchema: z.ZodType<Prisma.QueueOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  requestId: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => QueueCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => QueueAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => QueueMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => QueueMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => QueueSumOrderByAggregateInputSchema).optional()
}).strict();

export const QueueScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.QueueScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => QueueScalarWhereWithAggregatesInputSchema),z.lazy(() => QueueScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => QueueScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => QueueScalarWhereWithAggregatesInputSchema),z.lazy(() => QueueScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  requestId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  order: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const HistoryWhereInputSchema: z.ZodType<Prisma.HistoryWhereInput> = z.object({
  AND: z.union([ z.lazy(() => HistoryWhereInputSchema),z.lazy(() => HistoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HistoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HistoryWhereInputSchema),z.lazy(() => HistoryWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  requestId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  playedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  request: z.union([ z.lazy(() => RequestRelationFilterSchema),z.lazy(() => RequestWhereInputSchema) ]).optional(),
}).strict();

export const HistoryOrderByWithRelationInputSchema: z.ZodType<Prisma.HistoryOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  requestId: z.lazy(() => SortOrderSchema).optional(),
  playedAt: z.lazy(() => SortOrderSchema).optional(),
  request: z.lazy(() => RequestOrderByWithRelationInputSchema).optional()
}).strict();

export const HistoryWhereUniqueInputSchema: z.ZodType<Prisma.HistoryWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const HistoryOrderByWithAggregationInputSchema: z.ZodType<Prisma.HistoryOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  requestId: z.lazy(() => SortOrderSchema).optional(),
  playedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => HistoryCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => HistoryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => HistoryMinOrderByAggregateInputSchema).optional()
}).strict();

export const HistoryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.HistoryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => HistoryScalarWhereWithAggregatesInputSchema),z.lazy(() => HistoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => HistoryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HistoryScalarWhereWithAggregatesInputSchema),z.lazy(() => HistoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  requestId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  playedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SettingCreateInputSchema: z.ZodType<Prisma.SettingCreateInput> = z.object({
  key: z.string().optional(),
  language: z.lazy(() => LanguageSchema).optional()
}).strict();

export const SettingUncheckedCreateInputSchema: z.ZodType<Prisma.SettingUncheckedCreateInput> = z.object({
  key: z.string().optional(),
  language: z.lazy(() => LanguageSchema).optional()
}).strict();

export const SettingUpdateInputSchema: z.ZodType<Prisma.SettingUpdateInput> = z.object({
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.lazy(() => LanguageSchema),z.lazy(() => EnumLanguageFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SettingUncheckedUpdateInputSchema: z.ZodType<Prisma.SettingUncheckedUpdateInput> = z.object({
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.lazy(() => LanguageSchema),z.lazy(() => EnumLanguageFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SettingCreateManyInputSchema: z.ZodType<Prisma.SettingCreateManyInput> = z.object({
  key: z.string().optional(),
  language: z.lazy(() => LanguageSchema).optional()
}).strict();

export const SettingUpdateManyMutationInputSchema: z.ZodType<Prisma.SettingUpdateManyMutationInput> = z.object({
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.lazy(() => LanguageSchema),z.lazy(() => EnumLanguageFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SettingUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SettingUncheckedUpdateManyInput> = z.object({
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.lazy(() => LanguageSchema),z.lazy(() => EnumLanguageFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChannelCreateInputSchema: z.ZodType<Prisma.ChannelCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  user: z.string(),
  url: z.string(),
  Video: z.lazy(() => VideoCreateNestedManyWithoutChannelInputSchema).optional()
}).strict();

export const ChannelUncheckedCreateInputSchema: z.ZodType<Prisma.ChannelUncheckedCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  user: z.string(),
  url: z.string(),
  Video: z.lazy(() => VideoUncheckedCreateNestedManyWithoutChannelInputSchema).optional()
}).strict();

export const ChannelUpdateInputSchema: z.ZodType<Prisma.ChannelUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Video: z.lazy(() => VideoUpdateManyWithoutChannelNestedInputSchema).optional()
}).strict();

export const ChannelUncheckedUpdateInputSchema: z.ZodType<Prisma.ChannelUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Video: z.lazy(() => VideoUncheckedUpdateManyWithoutChannelNestedInputSchema).optional()
}).strict();

export const ChannelCreateManyInputSchema: z.ZodType<Prisma.ChannelCreateManyInput> = z.object({
  id: z.string(),
  name: z.string(),
  user: z.string(),
  url: z.string()
}).strict();

export const ChannelUpdateManyMutationInputSchema: z.ZodType<Prisma.ChannelUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChannelUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ChannelUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VideoCreateInputSchema: z.ZodType<Prisma.VideoCreateInput> = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  url: z.string(),
  channel: z.lazy(() => ChannelCreateNestedOneWithoutVideoInputSchema),
  Request: z.lazy(() => RequestCreateNestedManyWithoutVideoInputSchema).optional()
}).strict();

export const VideoUncheckedCreateInputSchema: z.ZodType<Prisma.VideoUncheckedCreateInput> = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  url: z.string(),
  channelId: z.string(),
  Request: z.lazy(() => RequestUncheckedCreateNestedManyWithoutVideoInputSchema).optional()
}).strict();

export const VideoUpdateInputSchema: z.ZodType<Prisma.VideoUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  channel: z.lazy(() => ChannelUpdateOneRequiredWithoutVideoNestedInputSchema).optional(),
  Request: z.lazy(() => RequestUpdateManyWithoutVideoNestedInputSchema).optional()
}).strict();

export const VideoUncheckedUpdateInputSchema: z.ZodType<Prisma.VideoUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Request: z.lazy(() => RequestUncheckedUpdateManyWithoutVideoNestedInputSchema).optional()
}).strict();

export const VideoCreateManyInputSchema: z.ZodType<Prisma.VideoCreateManyInput> = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  url: z.string(),
  channelId: z.string()
}).strict();

export const VideoUpdateManyMutationInputSchema: z.ZodType<Prisma.VideoUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VideoUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VideoUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  Request: z.lazy(() => RequestCreateNestedManyWithoutRequestedByInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  Request: z.lazy(() => RequestUncheckedCreateNestedManyWithoutRequestedByInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Request: z.lazy(() => RequestUpdateManyWithoutRequestedByNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Request: z.lazy(() => RequestUncheckedUpdateManyWithoutRequestedByNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string(),
  name: z.string()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RequestCreateInputSchema: z.ZodType<Prisma.RequestCreateInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  video: z.lazy(() => VideoCreateNestedOneWithoutRequestInputSchema),
  requestedBy: z.lazy(() => UserCreateNestedOneWithoutRequestInputSchema),
  Queue: z.lazy(() => QueueCreateNestedManyWithoutRequestInputSchema).optional(),
  History: z.lazy(() => HistoryCreateNestedManyWithoutRequestInputSchema).optional()
}).strict();

export const RequestUncheckedCreateInputSchema: z.ZodType<Prisma.RequestUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  videoId: z.string(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  Queue: z.lazy(() => QueueUncheckedCreateNestedManyWithoutRequestInputSchema).optional(),
  History: z.lazy(() => HistoryUncheckedCreateNestedManyWithoutRequestInputSchema).optional()
}).strict();

export const RequestUpdateInputSchema: z.ZodType<Prisma.RequestUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  video: z.lazy(() => VideoUpdateOneRequiredWithoutRequestNestedInputSchema).optional(),
  requestedBy: z.lazy(() => UserUpdateOneRequiredWithoutRequestNestedInputSchema).optional(),
  Queue: z.lazy(() => QueueUpdateManyWithoutRequestNestedInputSchema).optional(),
  History: z.lazy(() => HistoryUpdateManyWithoutRequestNestedInputSchema).optional()
}).strict();

export const RequestUncheckedUpdateInputSchema: z.ZodType<Prisma.RequestUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  videoId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Queue: z.lazy(() => QueueUncheckedUpdateManyWithoutRequestNestedInputSchema).optional(),
  History: z.lazy(() => HistoryUncheckedUpdateManyWithoutRequestNestedInputSchema).optional()
}).strict();

export const RequestCreateManyInputSchema: z.ZodType<Prisma.RequestCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  videoId: z.string(),
  userId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const RequestUpdateManyMutationInputSchema: z.ZodType<Prisma.RequestUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RequestUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RequestUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  videoId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const QueueCreateInputSchema: z.ZodType<Prisma.QueueCreateInput> = z.object({
  id: z.string().uuid().optional(),
  order: z.number().int(),
  request: z.lazy(() => RequestCreateNestedOneWithoutQueueInputSchema)
}).strict();

export const QueueUncheckedCreateInputSchema: z.ZodType<Prisma.QueueUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  requestId: z.string(),
  order: z.number().int()
}).strict();

export const QueueUpdateInputSchema: z.ZodType<Prisma.QueueUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  request: z.lazy(() => RequestUpdateOneRequiredWithoutQueueNestedInputSchema).optional()
}).strict();

export const QueueUncheckedUpdateInputSchema: z.ZodType<Prisma.QueueUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  requestId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const QueueCreateManyInputSchema: z.ZodType<Prisma.QueueCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  requestId: z.string(),
  order: z.number().int()
}).strict();

export const QueueUpdateManyMutationInputSchema: z.ZodType<Prisma.QueueUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const QueueUncheckedUpdateManyInputSchema: z.ZodType<Prisma.QueueUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  requestId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HistoryCreateInputSchema: z.ZodType<Prisma.HistoryCreateInput> = z.object({
  id: z.string().uuid().optional(),
  playedAt: z.coerce.date().optional(),
  request: z.lazy(() => RequestCreateNestedOneWithoutHistoryInputSchema)
}).strict();

export const HistoryUncheckedCreateInputSchema: z.ZodType<Prisma.HistoryUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  requestId: z.string(),
  playedAt: z.coerce.date().optional()
}).strict();

export const HistoryUpdateInputSchema: z.ZodType<Prisma.HistoryUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  playedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  request: z.lazy(() => RequestUpdateOneRequiredWithoutHistoryNestedInputSchema).optional()
}).strict();

export const HistoryUncheckedUpdateInputSchema: z.ZodType<Prisma.HistoryUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  requestId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  playedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HistoryCreateManyInputSchema: z.ZodType<Prisma.HistoryCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  requestId: z.string(),
  playedAt: z.coerce.date().optional()
}).strict();

export const HistoryUpdateManyMutationInputSchema: z.ZodType<Prisma.HistoryUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  playedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HistoryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.HistoryUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  requestId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  playedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const EnumLanguageFilterSchema: z.ZodType<Prisma.EnumLanguageFilter> = z.object({
  equals: z.lazy(() => LanguageSchema).optional(),
  in: z.union([ z.lazy(() => LanguageSchema).array(),z.lazy(() => LanguageSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => LanguageSchema).array(),z.lazy(() => LanguageSchema) ]).optional(),
  not: z.union([ z.lazy(() => LanguageSchema),z.lazy(() => NestedEnumLanguageFilterSchema) ]).optional(),
}).strict();

export const SettingCountOrderByAggregateInputSchema: z.ZodType<Prisma.SettingCountOrderByAggregateInput> = z.object({
  key: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SettingMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SettingMaxOrderByAggregateInput> = z.object({
  key: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SettingMinOrderByAggregateInputSchema: z.ZodType<Prisma.SettingMinOrderByAggregateInput> = z.object({
  key: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const EnumLanguageWithAggregatesFilterSchema: z.ZodType<Prisma.EnumLanguageWithAggregatesFilter> = z.object({
  equals: z.lazy(() => LanguageSchema).optional(),
  in: z.union([ z.lazy(() => LanguageSchema).array(),z.lazy(() => LanguageSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => LanguageSchema).array(),z.lazy(() => LanguageSchema) ]).optional(),
  not: z.union([ z.lazy(() => LanguageSchema),z.lazy(() => NestedEnumLanguageWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumLanguageFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumLanguageFilterSchema).optional()
}).strict();

export const VideoListRelationFilterSchema: z.ZodType<Prisma.VideoListRelationFilter> = z.object({
  every: z.lazy(() => VideoWhereInputSchema).optional(),
  some: z.lazy(() => VideoWhereInputSchema).optional(),
  none: z.lazy(() => VideoWhereInputSchema).optional()
}).strict();

export const VideoOrderByRelationAggregateInputSchema: z.ZodType<Prisma.VideoOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChannelCountOrderByAggregateInputSchema: z.ZodType<Prisma.ChannelCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChannelMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ChannelMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChannelMinOrderByAggregateInputSchema: z.ZodType<Prisma.ChannelMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChannelRelationFilterSchema: z.ZodType<Prisma.ChannelRelationFilter> = z.object({
  is: z.lazy(() => ChannelWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ChannelWhereInputSchema).optional().nullable()
}).strict();

export const RequestListRelationFilterSchema: z.ZodType<Prisma.RequestListRelationFilter> = z.object({
  every: z.lazy(() => RequestWhereInputSchema).optional(),
  some: z.lazy(() => RequestWhereInputSchema).optional(),
  none: z.lazy(() => RequestWhereInputSchema).optional()
}).strict();

export const RequestOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RequestOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VideoCountOrderByAggregateInputSchema: z.ZodType<Prisma.VideoCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  channelId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VideoMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VideoMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  channelId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VideoMinOrderByAggregateInputSchema: z.ZodType<Prisma.VideoMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  channelId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const VideoRelationFilterSchema: z.ZodType<Prisma.VideoRelationFilter> = z.object({
  is: z.lazy(() => VideoWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => VideoWhereInputSchema).optional().nullable()
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserWhereInputSchema).optional().nullable()
}).strict();

export const QueueListRelationFilterSchema: z.ZodType<Prisma.QueueListRelationFilter> = z.object({
  every: z.lazy(() => QueueWhereInputSchema).optional(),
  some: z.lazy(() => QueueWhereInputSchema).optional(),
  none: z.lazy(() => QueueWhereInputSchema).optional()
}).strict();

export const HistoryListRelationFilterSchema: z.ZodType<Prisma.HistoryListRelationFilter> = z.object({
  every: z.lazy(() => HistoryWhereInputSchema).optional(),
  some: z.lazy(() => HistoryWhereInputSchema).optional(),
  none: z.lazy(() => HistoryWhereInputSchema).optional()
}).strict();

export const QueueOrderByRelationAggregateInputSchema: z.ZodType<Prisma.QueueOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HistoryOrderByRelationAggregateInputSchema: z.ZodType<Prisma.HistoryOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RequestCountOrderByAggregateInputSchema: z.ZodType<Prisma.RequestCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  videoId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RequestMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RequestMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  videoId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RequestMinOrderByAggregateInputSchema: z.ZodType<Prisma.RequestMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  videoId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const RequestRelationFilterSchema: z.ZodType<Prisma.RequestRelationFilter> = z.object({
  is: z.lazy(() => RequestWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => RequestWhereInputSchema).optional().nullable()
}).strict();

export const QueueCountOrderByAggregateInputSchema: z.ZodType<Prisma.QueueCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  requestId: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const QueueAvgOrderByAggregateInputSchema: z.ZodType<Prisma.QueueAvgOrderByAggregateInput> = z.object({
  order: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const QueueMaxOrderByAggregateInputSchema: z.ZodType<Prisma.QueueMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  requestId: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const QueueMinOrderByAggregateInputSchema: z.ZodType<Prisma.QueueMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  requestId: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const QueueSumOrderByAggregateInputSchema: z.ZodType<Prisma.QueueSumOrderByAggregateInput> = z.object({
  order: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const HistoryCountOrderByAggregateInputSchema: z.ZodType<Prisma.HistoryCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  requestId: z.lazy(() => SortOrderSchema).optional(),
  playedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HistoryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.HistoryMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  requestId: z.lazy(() => SortOrderSchema).optional(),
  playedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HistoryMinOrderByAggregateInputSchema: z.ZodType<Prisma.HistoryMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  requestId: z.lazy(() => SortOrderSchema).optional(),
  playedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const EnumLanguageFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumLanguageFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => LanguageSchema).optional()
}).strict();

export const VideoCreateNestedManyWithoutChannelInputSchema: z.ZodType<Prisma.VideoCreateNestedManyWithoutChannelInput> = z.object({
  create: z.union([ z.lazy(() => VideoCreateWithoutChannelInputSchema),z.lazy(() => VideoCreateWithoutChannelInputSchema).array(),z.lazy(() => VideoUncheckedCreateWithoutChannelInputSchema),z.lazy(() => VideoUncheckedCreateWithoutChannelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VideoCreateOrConnectWithoutChannelInputSchema),z.lazy(() => VideoCreateOrConnectWithoutChannelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VideoCreateManyChannelInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => VideoWhereUniqueInputSchema),z.lazy(() => VideoWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const VideoUncheckedCreateNestedManyWithoutChannelInputSchema: z.ZodType<Prisma.VideoUncheckedCreateNestedManyWithoutChannelInput> = z.object({
  create: z.union([ z.lazy(() => VideoCreateWithoutChannelInputSchema),z.lazy(() => VideoCreateWithoutChannelInputSchema).array(),z.lazy(() => VideoUncheckedCreateWithoutChannelInputSchema),z.lazy(() => VideoUncheckedCreateWithoutChannelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VideoCreateOrConnectWithoutChannelInputSchema),z.lazy(() => VideoCreateOrConnectWithoutChannelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VideoCreateManyChannelInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => VideoWhereUniqueInputSchema),z.lazy(() => VideoWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const VideoUpdateManyWithoutChannelNestedInputSchema: z.ZodType<Prisma.VideoUpdateManyWithoutChannelNestedInput> = z.object({
  create: z.union([ z.lazy(() => VideoCreateWithoutChannelInputSchema),z.lazy(() => VideoCreateWithoutChannelInputSchema).array(),z.lazy(() => VideoUncheckedCreateWithoutChannelInputSchema),z.lazy(() => VideoUncheckedCreateWithoutChannelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VideoCreateOrConnectWithoutChannelInputSchema),z.lazy(() => VideoCreateOrConnectWithoutChannelInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => VideoUpsertWithWhereUniqueWithoutChannelInputSchema),z.lazy(() => VideoUpsertWithWhereUniqueWithoutChannelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VideoCreateManyChannelInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => VideoWhereUniqueInputSchema),z.lazy(() => VideoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => VideoWhereUniqueInputSchema),z.lazy(() => VideoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => VideoWhereUniqueInputSchema),z.lazy(() => VideoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => VideoWhereUniqueInputSchema),z.lazy(() => VideoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => VideoUpdateWithWhereUniqueWithoutChannelInputSchema),z.lazy(() => VideoUpdateWithWhereUniqueWithoutChannelInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => VideoUpdateManyWithWhereWithoutChannelInputSchema),z.lazy(() => VideoUpdateManyWithWhereWithoutChannelInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => VideoScalarWhereInputSchema),z.lazy(() => VideoScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const VideoUncheckedUpdateManyWithoutChannelNestedInputSchema: z.ZodType<Prisma.VideoUncheckedUpdateManyWithoutChannelNestedInput> = z.object({
  create: z.union([ z.lazy(() => VideoCreateWithoutChannelInputSchema),z.lazy(() => VideoCreateWithoutChannelInputSchema).array(),z.lazy(() => VideoUncheckedCreateWithoutChannelInputSchema),z.lazy(() => VideoUncheckedCreateWithoutChannelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VideoCreateOrConnectWithoutChannelInputSchema),z.lazy(() => VideoCreateOrConnectWithoutChannelInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => VideoUpsertWithWhereUniqueWithoutChannelInputSchema),z.lazy(() => VideoUpsertWithWhereUniqueWithoutChannelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VideoCreateManyChannelInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => VideoWhereUniqueInputSchema),z.lazy(() => VideoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => VideoWhereUniqueInputSchema),z.lazy(() => VideoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => VideoWhereUniqueInputSchema),z.lazy(() => VideoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => VideoWhereUniqueInputSchema),z.lazy(() => VideoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => VideoUpdateWithWhereUniqueWithoutChannelInputSchema),z.lazy(() => VideoUpdateWithWhereUniqueWithoutChannelInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => VideoUpdateManyWithWhereWithoutChannelInputSchema),z.lazy(() => VideoUpdateManyWithWhereWithoutChannelInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => VideoScalarWhereInputSchema),z.lazy(() => VideoScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ChannelCreateNestedOneWithoutVideoInputSchema: z.ZodType<Prisma.ChannelCreateNestedOneWithoutVideoInput> = z.object({
  create: z.union([ z.lazy(() => ChannelCreateWithoutVideoInputSchema),z.lazy(() => ChannelUncheckedCreateWithoutVideoInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ChannelCreateOrConnectWithoutVideoInputSchema).optional(),
  connect: z.lazy(() => ChannelWhereUniqueInputSchema).optional()
}).strict();

export const RequestCreateNestedManyWithoutVideoInputSchema: z.ZodType<Prisma.RequestCreateNestedManyWithoutVideoInput> = z.object({
  create: z.union([ z.lazy(() => RequestCreateWithoutVideoInputSchema),z.lazy(() => RequestCreateWithoutVideoInputSchema).array(),z.lazy(() => RequestUncheckedCreateWithoutVideoInputSchema),z.lazy(() => RequestUncheckedCreateWithoutVideoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RequestCreateOrConnectWithoutVideoInputSchema),z.lazy(() => RequestCreateOrConnectWithoutVideoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RequestCreateManyVideoInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RequestWhereUniqueInputSchema),z.lazy(() => RequestWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RequestUncheckedCreateNestedManyWithoutVideoInputSchema: z.ZodType<Prisma.RequestUncheckedCreateNestedManyWithoutVideoInput> = z.object({
  create: z.union([ z.lazy(() => RequestCreateWithoutVideoInputSchema),z.lazy(() => RequestCreateWithoutVideoInputSchema).array(),z.lazy(() => RequestUncheckedCreateWithoutVideoInputSchema),z.lazy(() => RequestUncheckedCreateWithoutVideoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RequestCreateOrConnectWithoutVideoInputSchema),z.lazy(() => RequestCreateOrConnectWithoutVideoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RequestCreateManyVideoInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RequestWhereUniqueInputSchema),z.lazy(() => RequestWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ChannelUpdateOneRequiredWithoutVideoNestedInputSchema: z.ZodType<Prisma.ChannelUpdateOneRequiredWithoutVideoNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChannelCreateWithoutVideoInputSchema),z.lazy(() => ChannelUncheckedCreateWithoutVideoInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ChannelCreateOrConnectWithoutVideoInputSchema).optional(),
  upsert: z.lazy(() => ChannelUpsertWithoutVideoInputSchema).optional(),
  connect: z.lazy(() => ChannelWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ChannelUpdateWithoutVideoInputSchema),z.lazy(() => ChannelUncheckedUpdateWithoutVideoInputSchema) ]).optional(),
}).strict();

export const RequestUpdateManyWithoutVideoNestedInputSchema: z.ZodType<Prisma.RequestUpdateManyWithoutVideoNestedInput> = z.object({
  create: z.union([ z.lazy(() => RequestCreateWithoutVideoInputSchema),z.lazy(() => RequestCreateWithoutVideoInputSchema).array(),z.lazy(() => RequestUncheckedCreateWithoutVideoInputSchema),z.lazy(() => RequestUncheckedCreateWithoutVideoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RequestCreateOrConnectWithoutVideoInputSchema),z.lazy(() => RequestCreateOrConnectWithoutVideoInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RequestUpsertWithWhereUniqueWithoutVideoInputSchema),z.lazy(() => RequestUpsertWithWhereUniqueWithoutVideoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RequestCreateManyVideoInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RequestWhereUniqueInputSchema),z.lazy(() => RequestWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RequestWhereUniqueInputSchema),z.lazy(() => RequestWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RequestWhereUniqueInputSchema),z.lazy(() => RequestWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RequestWhereUniqueInputSchema),z.lazy(() => RequestWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RequestUpdateWithWhereUniqueWithoutVideoInputSchema),z.lazy(() => RequestUpdateWithWhereUniqueWithoutVideoInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RequestUpdateManyWithWhereWithoutVideoInputSchema),z.lazy(() => RequestUpdateManyWithWhereWithoutVideoInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RequestScalarWhereInputSchema),z.lazy(() => RequestScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RequestUncheckedUpdateManyWithoutVideoNestedInputSchema: z.ZodType<Prisma.RequestUncheckedUpdateManyWithoutVideoNestedInput> = z.object({
  create: z.union([ z.lazy(() => RequestCreateWithoutVideoInputSchema),z.lazy(() => RequestCreateWithoutVideoInputSchema).array(),z.lazy(() => RequestUncheckedCreateWithoutVideoInputSchema),z.lazy(() => RequestUncheckedCreateWithoutVideoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RequestCreateOrConnectWithoutVideoInputSchema),z.lazy(() => RequestCreateOrConnectWithoutVideoInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RequestUpsertWithWhereUniqueWithoutVideoInputSchema),z.lazy(() => RequestUpsertWithWhereUniqueWithoutVideoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RequestCreateManyVideoInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RequestWhereUniqueInputSchema),z.lazy(() => RequestWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RequestWhereUniqueInputSchema),z.lazy(() => RequestWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RequestWhereUniqueInputSchema),z.lazy(() => RequestWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RequestWhereUniqueInputSchema),z.lazy(() => RequestWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RequestUpdateWithWhereUniqueWithoutVideoInputSchema),z.lazy(() => RequestUpdateWithWhereUniqueWithoutVideoInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RequestUpdateManyWithWhereWithoutVideoInputSchema),z.lazy(() => RequestUpdateManyWithWhereWithoutVideoInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RequestScalarWhereInputSchema),z.lazy(() => RequestScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RequestCreateNestedManyWithoutRequestedByInputSchema: z.ZodType<Prisma.RequestCreateNestedManyWithoutRequestedByInput> = z.object({
  create: z.union([ z.lazy(() => RequestCreateWithoutRequestedByInputSchema),z.lazy(() => RequestCreateWithoutRequestedByInputSchema).array(),z.lazy(() => RequestUncheckedCreateWithoutRequestedByInputSchema),z.lazy(() => RequestUncheckedCreateWithoutRequestedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RequestCreateOrConnectWithoutRequestedByInputSchema),z.lazy(() => RequestCreateOrConnectWithoutRequestedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RequestCreateManyRequestedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RequestWhereUniqueInputSchema),z.lazy(() => RequestWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RequestUncheckedCreateNestedManyWithoutRequestedByInputSchema: z.ZodType<Prisma.RequestUncheckedCreateNestedManyWithoutRequestedByInput> = z.object({
  create: z.union([ z.lazy(() => RequestCreateWithoutRequestedByInputSchema),z.lazy(() => RequestCreateWithoutRequestedByInputSchema).array(),z.lazy(() => RequestUncheckedCreateWithoutRequestedByInputSchema),z.lazy(() => RequestUncheckedCreateWithoutRequestedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RequestCreateOrConnectWithoutRequestedByInputSchema),z.lazy(() => RequestCreateOrConnectWithoutRequestedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RequestCreateManyRequestedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RequestWhereUniqueInputSchema),z.lazy(() => RequestWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RequestUpdateManyWithoutRequestedByNestedInputSchema: z.ZodType<Prisma.RequestUpdateManyWithoutRequestedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => RequestCreateWithoutRequestedByInputSchema),z.lazy(() => RequestCreateWithoutRequestedByInputSchema).array(),z.lazy(() => RequestUncheckedCreateWithoutRequestedByInputSchema),z.lazy(() => RequestUncheckedCreateWithoutRequestedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RequestCreateOrConnectWithoutRequestedByInputSchema),z.lazy(() => RequestCreateOrConnectWithoutRequestedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RequestUpsertWithWhereUniqueWithoutRequestedByInputSchema),z.lazy(() => RequestUpsertWithWhereUniqueWithoutRequestedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RequestCreateManyRequestedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RequestWhereUniqueInputSchema),z.lazy(() => RequestWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RequestWhereUniqueInputSchema),z.lazy(() => RequestWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RequestWhereUniqueInputSchema),z.lazy(() => RequestWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RequestWhereUniqueInputSchema),z.lazy(() => RequestWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RequestUpdateWithWhereUniqueWithoutRequestedByInputSchema),z.lazy(() => RequestUpdateWithWhereUniqueWithoutRequestedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RequestUpdateManyWithWhereWithoutRequestedByInputSchema),z.lazy(() => RequestUpdateManyWithWhereWithoutRequestedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RequestScalarWhereInputSchema),z.lazy(() => RequestScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RequestUncheckedUpdateManyWithoutRequestedByNestedInputSchema: z.ZodType<Prisma.RequestUncheckedUpdateManyWithoutRequestedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => RequestCreateWithoutRequestedByInputSchema),z.lazy(() => RequestCreateWithoutRequestedByInputSchema).array(),z.lazy(() => RequestUncheckedCreateWithoutRequestedByInputSchema),z.lazy(() => RequestUncheckedCreateWithoutRequestedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RequestCreateOrConnectWithoutRequestedByInputSchema),z.lazy(() => RequestCreateOrConnectWithoutRequestedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RequestUpsertWithWhereUniqueWithoutRequestedByInputSchema),z.lazy(() => RequestUpsertWithWhereUniqueWithoutRequestedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RequestCreateManyRequestedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RequestWhereUniqueInputSchema),z.lazy(() => RequestWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RequestWhereUniqueInputSchema),z.lazy(() => RequestWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RequestWhereUniqueInputSchema),z.lazy(() => RequestWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RequestWhereUniqueInputSchema),z.lazy(() => RequestWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RequestUpdateWithWhereUniqueWithoutRequestedByInputSchema),z.lazy(() => RequestUpdateWithWhereUniqueWithoutRequestedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RequestUpdateManyWithWhereWithoutRequestedByInputSchema),z.lazy(() => RequestUpdateManyWithWhereWithoutRequestedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RequestScalarWhereInputSchema),z.lazy(() => RequestScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const VideoCreateNestedOneWithoutRequestInputSchema: z.ZodType<Prisma.VideoCreateNestedOneWithoutRequestInput> = z.object({
  create: z.union([ z.lazy(() => VideoCreateWithoutRequestInputSchema),z.lazy(() => VideoUncheckedCreateWithoutRequestInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => VideoCreateOrConnectWithoutRequestInputSchema).optional(),
  connect: z.lazy(() => VideoWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutRequestInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutRequestInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRequestInputSchema),z.lazy(() => UserUncheckedCreateWithoutRequestInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRequestInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const QueueCreateNestedManyWithoutRequestInputSchema: z.ZodType<Prisma.QueueCreateNestedManyWithoutRequestInput> = z.object({
  create: z.union([ z.lazy(() => QueueCreateWithoutRequestInputSchema),z.lazy(() => QueueCreateWithoutRequestInputSchema).array(),z.lazy(() => QueueUncheckedCreateWithoutRequestInputSchema),z.lazy(() => QueueUncheckedCreateWithoutRequestInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QueueCreateOrConnectWithoutRequestInputSchema),z.lazy(() => QueueCreateOrConnectWithoutRequestInputSchema).array() ]).optional(),
  createMany: z.lazy(() => QueueCreateManyRequestInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => QueueWhereUniqueInputSchema),z.lazy(() => QueueWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const HistoryCreateNestedManyWithoutRequestInputSchema: z.ZodType<Prisma.HistoryCreateNestedManyWithoutRequestInput> = z.object({
  create: z.union([ z.lazy(() => HistoryCreateWithoutRequestInputSchema),z.lazy(() => HistoryCreateWithoutRequestInputSchema).array(),z.lazy(() => HistoryUncheckedCreateWithoutRequestInputSchema),z.lazy(() => HistoryUncheckedCreateWithoutRequestInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HistoryCreateOrConnectWithoutRequestInputSchema),z.lazy(() => HistoryCreateOrConnectWithoutRequestInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HistoryCreateManyRequestInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => HistoryWhereUniqueInputSchema),z.lazy(() => HistoryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const QueueUncheckedCreateNestedManyWithoutRequestInputSchema: z.ZodType<Prisma.QueueUncheckedCreateNestedManyWithoutRequestInput> = z.object({
  create: z.union([ z.lazy(() => QueueCreateWithoutRequestInputSchema),z.lazy(() => QueueCreateWithoutRequestInputSchema).array(),z.lazy(() => QueueUncheckedCreateWithoutRequestInputSchema),z.lazy(() => QueueUncheckedCreateWithoutRequestInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QueueCreateOrConnectWithoutRequestInputSchema),z.lazy(() => QueueCreateOrConnectWithoutRequestInputSchema).array() ]).optional(),
  createMany: z.lazy(() => QueueCreateManyRequestInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => QueueWhereUniqueInputSchema),z.lazy(() => QueueWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const HistoryUncheckedCreateNestedManyWithoutRequestInputSchema: z.ZodType<Prisma.HistoryUncheckedCreateNestedManyWithoutRequestInput> = z.object({
  create: z.union([ z.lazy(() => HistoryCreateWithoutRequestInputSchema),z.lazy(() => HistoryCreateWithoutRequestInputSchema).array(),z.lazy(() => HistoryUncheckedCreateWithoutRequestInputSchema),z.lazy(() => HistoryUncheckedCreateWithoutRequestInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HistoryCreateOrConnectWithoutRequestInputSchema),z.lazy(() => HistoryCreateOrConnectWithoutRequestInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HistoryCreateManyRequestInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => HistoryWhereUniqueInputSchema),z.lazy(() => HistoryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const VideoUpdateOneRequiredWithoutRequestNestedInputSchema: z.ZodType<Prisma.VideoUpdateOneRequiredWithoutRequestNestedInput> = z.object({
  create: z.union([ z.lazy(() => VideoCreateWithoutRequestInputSchema),z.lazy(() => VideoUncheckedCreateWithoutRequestInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => VideoCreateOrConnectWithoutRequestInputSchema).optional(),
  upsert: z.lazy(() => VideoUpsertWithoutRequestInputSchema).optional(),
  connect: z.lazy(() => VideoWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => VideoUpdateWithoutRequestInputSchema),z.lazy(() => VideoUncheckedUpdateWithoutRequestInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutRequestNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutRequestNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRequestInputSchema),z.lazy(() => UserUncheckedCreateWithoutRequestInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRequestInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutRequestInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutRequestInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRequestInputSchema) ]).optional(),
}).strict();

export const QueueUpdateManyWithoutRequestNestedInputSchema: z.ZodType<Prisma.QueueUpdateManyWithoutRequestNestedInput> = z.object({
  create: z.union([ z.lazy(() => QueueCreateWithoutRequestInputSchema),z.lazy(() => QueueCreateWithoutRequestInputSchema).array(),z.lazy(() => QueueUncheckedCreateWithoutRequestInputSchema),z.lazy(() => QueueUncheckedCreateWithoutRequestInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QueueCreateOrConnectWithoutRequestInputSchema),z.lazy(() => QueueCreateOrConnectWithoutRequestInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => QueueUpsertWithWhereUniqueWithoutRequestInputSchema),z.lazy(() => QueueUpsertWithWhereUniqueWithoutRequestInputSchema).array() ]).optional(),
  createMany: z.lazy(() => QueueCreateManyRequestInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => QueueWhereUniqueInputSchema),z.lazy(() => QueueWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => QueueWhereUniqueInputSchema),z.lazy(() => QueueWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => QueueWhereUniqueInputSchema),z.lazy(() => QueueWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => QueueWhereUniqueInputSchema),z.lazy(() => QueueWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => QueueUpdateWithWhereUniqueWithoutRequestInputSchema),z.lazy(() => QueueUpdateWithWhereUniqueWithoutRequestInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => QueueUpdateManyWithWhereWithoutRequestInputSchema),z.lazy(() => QueueUpdateManyWithWhereWithoutRequestInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => QueueScalarWhereInputSchema),z.lazy(() => QueueScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const HistoryUpdateManyWithoutRequestNestedInputSchema: z.ZodType<Prisma.HistoryUpdateManyWithoutRequestNestedInput> = z.object({
  create: z.union([ z.lazy(() => HistoryCreateWithoutRequestInputSchema),z.lazy(() => HistoryCreateWithoutRequestInputSchema).array(),z.lazy(() => HistoryUncheckedCreateWithoutRequestInputSchema),z.lazy(() => HistoryUncheckedCreateWithoutRequestInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HistoryCreateOrConnectWithoutRequestInputSchema),z.lazy(() => HistoryCreateOrConnectWithoutRequestInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => HistoryUpsertWithWhereUniqueWithoutRequestInputSchema),z.lazy(() => HistoryUpsertWithWhereUniqueWithoutRequestInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HistoryCreateManyRequestInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => HistoryWhereUniqueInputSchema),z.lazy(() => HistoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => HistoryWhereUniqueInputSchema),z.lazy(() => HistoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => HistoryWhereUniqueInputSchema),z.lazy(() => HistoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => HistoryWhereUniqueInputSchema),z.lazy(() => HistoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => HistoryUpdateWithWhereUniqueWithoutRequestInputSchema),z.lazy(() => HistoryUpdateWithWhereUniqueWithoutRequestInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => HistoryUpdateManyWithWhereWithoutRequestInputSchema),z.lazy(() => HistoryUpdateManyWithWhereWithoutRequestInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => HistoryScalarWhereInputSchema),z.lazy(() => HistoryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const QueueUncheckedUpdateManyWithoutRequestNestedInputSchema: z.ZodType<Prisma.QueueUncheckedUpdateManyWithoutRequestNestedInput> = z.object({
  create: z.union([ z.lazy(() => QueueCreateWithoutRequestInputSchema),z.lazy(() => QueueCreateWithoutRequestInputSchema).array(),z.lazy(() => QueueUncheckedCreateWithoutRequestInputSchema),z.lazy(() => QueueUncheckedCreateWithoutRequestInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QueueCreateOrConnectWithoutRequestInputSchema),z.lazy(() => QueueCreateOrConnectWithoutRequestInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => QueueUpsertWithWhereUniqueWithoutRequestInputSchema),z.lazy(() => QueueUpsertWithWhereUniqueWithoutRequestInputSchema).array() ]).optional(),
  createMany: z.lazy(() => QueueCreateManyRequestInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => QueueWhereUniqueInputSchema),z.lazy(() => QueueWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => QueueWhereUniqueInputSchema),z.lazy(() => QueueWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => QueueWhereUniqueInputSchema),z.lazy(() => QueueWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => QueueWhereUniqueInputSchema),z.lazy(() => QueueWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => QueueUpdateWithWhereUniqueWithoutRequestInputSchema),z.lazy(() => QueueUpdateWithWhereUniqueWithoutRequestInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => QueueUpdateManyWithWhereWithoutRequestInputSchema),z.lazy(() => QueueUpdateManyWithWhereWithoutRequestInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => QueueScalarWhereInputSchema),z.lazy(() => QueueScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const HistoryUncheckedUpdateManyWithoutRequestNestedInputSchema: z.ZodType<Prisma.HistoryUncheckedUpdateManyWithoutRequestNestedInput> = z.object({
  create: z.union([ z.lazy(() => HistoryCreateWithoutRequestInputSchema),z.lazy(() => HistoryCreateWithoutRequestInputSchema).array(),z.lazy(() => HistoryUncheckedCreateWithoutRequestInputSchema),z.lazy(() => HistoryUncheckedCreateWithoutRequestInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HistoryCreateOrConnectWithoutRequestInputSchema),z.lazy(() => HistoryCreateOrConnectWithoutRequestInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => HistoryUpsertWithWhereUniqueWithoutRequestInputSchema),z.lazy(() => HistoryUpsertWithWhereUniqueWithoutRequestInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HistoryCreateManyRequestInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => HistoryWhereUniqueInputSchema),z.lazy(() => HistoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => HistoryWhereUniqueInputSchema),z.lazy(() => HistoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => HistoryWhereUniqueInputSchema),z.lazy(() => HistoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => HistoryWhereUniqueInputSchema),z.lazy(() => HistoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => HistoryUpdateWithWhereUniqueWithoutRequestInputSchema),z.lazy(() => HistoryUpdateWithWhereUniqueWithoutRequestInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => HistoryUpdateManyWithWhereWithoutRequestInputSchema),z.lazy(() => HistoryUpdateManyWithWhereWithoutRequestInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => HistoryScalarWhereInputSchema),z.lazy(() => HistoryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RequestCreateNestedOneWithoutQueueInputSchema: z.ZodType<Prisma.RequestCreateNestedOneWithoutQueueInput> = z.object({
  create: z.union([ z.lazy(() => RequestCreateWithoutQueueInputSchema),z.lazy(() => RequestUncheckedCreateWithoutQueueInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RequestCreateOrConnectWithoutQueueInputSchema).optional(),
  connect: z.lazy(() => RequestWhereUniqueInputSchema).optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const RequestUpdateOneRequiredWithoutQueueNestedInputSchema: z.ZodType<Prisma.RequestUpdateOneRequiredWithoutQueueNestedInput> = z.object({
  create: z.union([ z.lazy(() => RequestCreateWithoutQueueInputSchema),z.lazy(() => RequestUncheckedCreateWithoutQueueInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RequestCreateOrConnectWithoutQueueInputSchema).optional(),
  upsert: z.lazy(() => RequestUpsertWithoutQueueInputSchema).optional(),
  connect: z.lazy(() => RequestWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RequestUpdateWithoutQueueInputSchema),z.lazy(() => RequestUncheckedUpdateWithoutQueueInputSchema) ]).optional(),
}).strict();

export const RequestCreateNestedOneWithoutHistoryInputSchema: z.ZodType<Prisma.RequestCreateNestedOneWithoutHistoryInput> = z.object({
  create: z.union([ z.lazy(() => RequestCreateWithoutHistoryInputSchema),z.lazy(() => RequestUncheckedCreateWithoutHistoryInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RequestCreateOrConnectWithoutHistoryInputSchema).optional(),
  connect: z.lazy(() => RequestWhereUniqueInputSchema).optional()
}).strict();

export const RequestUpdateOneRequiredWithoutHistoryNestedInputSchema: z.ZodType<Prisma.RequestUpdateOneRequiredWithoutHistoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => RequestCreateWithoutHistoryInputSchema),z.lazy(() => RequestUncheckedCreateWithoutHistoryInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RequestCreateOrConnectWithoutHistoryInputSchema).optional(),
  upsert: z.lazy(() => RequestUpsertWithoutHistoryInputSchema).optional(),
  connect: z.lazy(() => RequestWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RequestUpdateWithoutHistoryInputSchema),z.lazy(() => RequestUncheckedUpdateWithoutHistoryInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedEnumLanguageFilterSchema: z.ZodType<Prisma.NestedEnumLanguageFilter> = z.object({
  equals: z.lazy(() => LanguageSchema).optional(),
  in: z.union([ z.lazy(() => LanguageSchema).array(),z.lazy(() => LanguageSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => LanguageSchema).array(),z.lazy(() => LanguageSchema) ]).optional(),
  not: z.union([ z.lazy(() => LanguageSchema),z.lazy(() => NestedEnumLanguageFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedEnumLanguageWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumLanguageWithAggregatesFilter> = z.object({
  equals: z.lazy(() => LanguageSchema).optional(),
  in: z.union([ z.lazy(() => LanguageSchema).array(),z.lazy(() => LanguageSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => LanguageSchema).array(),z.lazy(() => LanguageSchema) ]).optional(),
  not: z.union([ z.lazy(() => LanguageSchema),z.lazy(() => NestedEnumLanguageWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumLanguageFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumLanguageFilterSchema).optional()
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const VideoCreateWithoutChannelInputSchema: z.ZodType<Prisma.VideoCreateWithoutChannelInput> = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  url: z.string(),
  Request: z.lazy(() => RequestCreateNestedManyWithoutVideoInputSchema).optional()
}).strict();

export const VideoUncheckedCreateWithoutChannelInputSchema: z.ZodType<Prisma.VideoUncheckedCreateWithoutChannelInput> = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  url: z.string(),
  Request: z.lazy(() => RequestUncheckedCreateNestedManyWithoutVideoInputSchema).optional()
}).strict();

export const VideoCreateOrConnectWithoutChannelInputSchema: z.ZodType<Prisma.VideoCreateOrConnectWithoutChannelInput> = z.object({
  where: z.lazy(() => VideoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => VideoCreateWithoutChannelInputSchema),z.lazy(() => VideoUncheckedCreateWithoutChannelInputSchema) ]),
}).strict();

export const VideoCreateManyChannelInputEnvelopeSchema: z.ZodType<Prisma.VideoCreateManyChannelInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => VideoCreateManyChannelInputSchema),z.lazy(() => VideoCreateManyChannelInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const VideoUpsertWithWhereUniqueWithoutChannelInputSchema: z.ZodType<Prisma.VideoUpsertWithWhereUniqueWithoutChannelInput> = z.object({
  where: z.lazy(() => VideoWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => VideoUpdateWithoutChannelInputSchema),z.lazy(() => VideoUncheckedUpdateWithoutChannelInputSchema) ]),
  create: z.union([ z.lazy(() => VideoCreateWithoutChannelInputSchema),z.lazy(() => VideoUncheckedCreateWithoutChannelInputSchema) ]),
}).strict();

export const VideoUpdateWithWhereUniqueWithoutChannelInputSchema: z.ZodType<Prisma.VideoUpdateWithWhereUniqueWithoutChannelInput> = z.object({
  where: z.lazy(() => VideoWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => VideoUpdateWithoutChannelInputSchema),z.lazy(() => VideoUncheckedUpdateWithoutChannelInputSchema) ]),
}).strict();

export const VideoUpdateManyWithWhereWithoutChannelInputSchema: z.ZodType<Prisma.VideoUpdateManyWithWhereWithoutChannelInput> = z.object({
  where: z.lazy(() => VideoScalarWhereInputSchema),
  data: z.union([ z.lazy(() => VideoUpdateManyMutationInputSchema),z.lazy(() => VideoUncheckedUpdateManyWithoutVideoInputSchema) ]),
}).strict();

export const VideoScalarWhereInputSchema: z.ZodType<Prisma.VideoScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VideoScalarWhereInputSchema),z.lazy(() => VideoScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VideoScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VideoScalarWhereInputSchema),z.lazy(() => VideoScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  channelId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const ChannelCreateWithoutVideoInputSchema: z.ZodType<Prisma.ChannelCreateWithoutVideoInput> = z.object({
  id: z.string(),
  name: z.string(),
  user: z.string(),
  url: z.string()
}).strict();

export const ChannelUncheckedCreateWithoutVideoInputSchema: z.ZodType<Prisma.ChannelUncheckedCreateWithoutVideoInput> = z.object({
  id: z.string(),
  name: z.string(),
  user: z.string(),
  url: z.string()
}).strict();

export const ChannelCreateOrConnectWithoutVideoInputSchema: z.ZodType<Prisma.ChannelCreateOrConnectWithoutVideoInput> = z.object({
  where: z.lazy(() => ChannelWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ChannelCreateWithoutVideoInputSchema),z.lazy(() => ChannelUncheckedCreateWithoutVideoInputSchema) ]),
}).strict();

export const RequestCreateWithoutVideoInputSchema: z.ZodType<Prisma.RequestCreateWithoutVideoInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  requestedBy: z.lazy(() => UserCreateNestedOneWithoutRequestInputSchema),
  Queue: z.lazy(() => QueueCreateNestedManyWithoutRequestInputSchema).optional(),
  History: z.lazy(() => HistoryCreateNestedManyWithoutRequestInputSchema).optional()
}).strict();

export const RequestUncheckedCreateWithoutVideoInputSchema: z.ZodType<Prisma.RequestUncheckedCreateWithoutVideoInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  Queue: z.lazy(() => QueueUncheckedCreateNestedManyWithoutRequestInputSchema).optional(),
  History: z.lazy(() => HistoryUncheckedCreateNestedManyWithoutRequestInputSchema).optional()
}).strict();

export const RequestCreateOrConnectWithoutVideoInputSchema: z.ZodType<Prisma.RequestCreateOrConnectWithoutVideoInput> = z.object({
  where: z.lazy(() => RequestWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RequestCreateWithoutVideoInputSchema),z.lazy(() => RequestUncheckedCreateWithoutVideoInputSchema) ]),
}).strict();

export const RequestCreateManyVideoInputEnvelopeSchema: z.ZodType<Prisma.RequestCreateManyVideoInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RequestCreateManyVideoInputSchema),z.lazy(() => RequestCreateManyVideoInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ChannelUpsertWithoutVideoInputSchema: z.ZodType<Prisma.ChannelUpsertWithoutVideoInput> = z.object({
  update: z.union([ z.lazy(() => ChannelUpdateWithoutVideoInputSchema),z.lazy(() => ChannelUncheckedUpdateWithoutVideoInputSchema) ]),
  create: z.union([ z.lazy(() => ChannelCreateWithoutVideoInputSchema),z.lazy(() => ChannelUncheckedCreateWithoutVideoInputSchema) ]),
}).strict();

export const ChannelUpdateWithoutVideoInputSchema: z.ZodType<Prisma.ChannelUpdateWithoutVideoInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChannelUncheckedUpdateWithoutVideoInputSchema: z.ZodType<Prisma.ChannelUncheckedUpdateWithoutVideoInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RequestUpsertWithWhereUniqueWithoutVideoInputSchema: z.ZodType<Prisma.RequestUpsertWithWhereUniqueWithoutVideoInput> = z.object({
  where: z.lazy(() => RequestWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RequestUpdateWithoutVideoInputSchema),z.lazy(() => RequestUncheckedUpdateWithoutVideoInputSchema) ]),
  create: z.union([ z.lazy(() => RequestCreateWithoutVideoInputSchema),z.lazy(() => RequestUncheckedCreateWithoutVideoInputSchema) ]),
}).strict();

export const RequestUpdateWithWhereUniqueWithoutVideoInputSchema: z.ZodType<Prisma.RequestUpdateWithWhereUniqueWithoutVideoInput> = z.object({
  where: z.lazy(() => RequestWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RequestUpdateWithoutVideoInputSchema),z.lazy(() => RequestUncheckedUpdateWithoutVideoInputSchema) ]),
}).strict();

export const RequestUpdateManyWithWhereWithoutVideoInputSchema: z.ZodType<Prisma.RequestUpdateManyWithWhereWithoutVideoInput> = z.object({
  where: z.lazy(() => RequestScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RequestUpdateManyMutationInputSchema),z.lazy(() => RequestUncheckedUpdateManyWithoutRequestInputSchema) ]),
}).strict();

export const RequestScalarWhereInputSchema: z.ZodType<Prisma.RequestScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RequestScalarWhereInputSchema),z.lazy(() => RequestScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RequestScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RequestScalarWhereInputSchema),z.lazy(() => RequestScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  videoId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const RequestCreateWithoutRequestedByInputSchema: z.ZodType<Prisma.RequestCreateWithoutRequestedByInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  video: z.lazy(() => VideoCreateNestedOneWithoutRequestInputSchema),
  Queue: z.lazy(() => QueueCreateNestedManyWithoutRequestInputSchema).optional(),
  History: z.lazy(() => HistoryCreateNestedManyWithoutRequestInputSchema).optional()
}).strict();

export const RequestUncheckedCreateWithoutRequestedByInputSchema: z.ZodType<Prisma.RequestUncheckedCreateWithoutRequestedByInput> = z.object({
  id: z.string().uuid().optional(),
  videoId: z.string(),
  createdAt: z.coerce.date().optional(),
  Queue: z.lazy(() => QueueUncheckedCreateNestedManyWithoutRequestInputSchema).optional(),
  History: z.lazy(() => HistoryUncheckedCreateNestedManyWithoutRequestInputSchema).optional()
}).strict();

export const RequestCreateOrConnectWithoutRequestedByInputSchema: z.ZodType<Prisma.RequestCreateOrConnectWithoutRequestedByInput> = z.object({
  where: z.lazy(() => RequestWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RequestCreateWithoutRequestedByInputSchema),z.lazy(() => RequestUncheckedCreateWithoutRequestedByInputSchema) ]),
}).strict();

export const RequestCreateManyRequestedByInputEnvelopeSchema: z.ZodType<Prisma.RequestCreateManyRequestedByInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RequestCreateManyRequestedByInputSchema),z.lazy(() => RequestCreateManyRequestedByInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RequestUpsertWithWhereUniqueWithoutRequestedByInputSchema: z.ZodType<Prisma.RequestUpsertWithWhereUniqueWithoutRequestedByInput> = z.object({
  where: z.lazy(() => RequestWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RequestUpdateWithoutRequestedByInputSchema),z.lazy(() => RequestUncheckedUpdateWithoutRequestedByInputSchema) ]),
  create: z.union([ z.lazy(() => RequestCreateWithoutRequestedByInputSchema),z.lazy(() => RequestUncheckedCreateWithoutRequestedByInputSchema) ]),
}).strict();

export const RequestUpdateWithWhereUniqueWithoutRequestedByInputSchema: z.ZodType<Prisma.RequestUpdateWithWhereUniqueWithoutRequestedByInput> = z.object({
  where: z.lazy(() => RequestWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RequestUpdateWithoutRequestedByInputSchema),z.lazy(() => RequestUncheckedUpdateWithoutRequestedByInputSchema) ]),
}).strict();

export const RequestUpdateManyWithWhereWithoutRequestedByInputSchema: z.ZodType<Prisma.RequestUpdateManyWithWhereWithoutRequestedByInput> = z.object({
  where: z.lazy(() => RequestScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RequestUpdateManyMutationInputSchema),z.lazy(() => RequestUncheckedUpdateManyWithoutRequestInputSchema) ]),
}).strict();

export const VideoCreateWithoutRequestInputSchema: z.ZodType<Prisma.VideoCreateWithoutRequestInput> = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  url: z.string(),
  channel: z.lazy(() => ChannelCreateNestedOneWithoutVideoInputSchema)
}).strict();

export const VideoUncheckedCreateWithoutRequestInputSchema: z.ZodType<Prisma.VideoUncheckedCreateWithoutRequestInput> = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  url: z.string(),
  channelId: z.string()
}).strict();

export const VideoCreateOrConnectWithoutRequestInputSchema: z.ZodType<Prisma.VideoCreateOrConnectWithoutRequestInput> = z.object({
  where: z.lazy(() => VideoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => VideoCreateWithoutRequestInputSchema),z.lazy(() => VideoUncheckedCreateWithoutRequestInputSchema) ]),
}).strict();

export const UserCreateWithoutRequestInputSchema: z.ZodType<Prisma.UserCreateWithoutRequestInput> = z.object({
  id: z.string(),
  name: z.string()
}).strict();

export const UserUncheckedCreateWithoutRequestInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRequestInput> = z.object({
  id: z.string(),
  name: z.string()
}).strict();

export const UserCreateOrConnectWithoutRequestInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRequestInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutRequestInputSchema),z.lazy(() => UserUncheckedCreateWithoutRequestInputSchema) ]),
}).strict();

export const QueueCreateWithoutRequestInputSchema: z.ZodType<Prisma.QueueCreateWithoutRequestInput> = z.object({
  id: z.string().uuid().optional(),
  order: z.number().int()
}).strict();

export const QueueUncheckedCreateWithoutRequestInputSchema: z.ZodType<Prisma.QueueUncheckedCreateWithoutRequestInput> = z.object({
  id: z.string().uuid().optional(),
  order: z.number().int()
}).strict();

export const QueueCreateOrConnectWithoutRequestInputSchema: z.ZodType<Prisma.QueueCreateOrConnectWithoutRequestInput> = z.object({
  where: z.lazy(() => QueueWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => QueueCreateWithoutRequestInputSchema),z.lazy(() => QueueUncheckedCreateWithoutRequestInputSchema) ]),
}).strict();

export const QueueCreateManyRequestInputEnvelopeSchema: z.ZodType<Prisma.QueueCreateManyRequestInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => QueueCreateManyRequestInputSchema),z.lazy(() => QueueCreateManyRequestInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const HistoryCreateWithoutRequestInputSchema: z.ZodType<Prisma.HistoryCreateWithoutRequestInput> = z.object({
  id: z.string().uuid().optional(),
  playedAt: z.coerce.date().optional()
}).strict();

export const HistoryUncheckedCreateWithoutRequestInputSchema: z.ZodType<Prisma.HistoryUncheckedCreateWithoutRequestInput> = z.object({
  id: z.string().uuid().optional(),
  playedAt: z.coerce.date().optional()
}).strict();

export const HistoryCreateOrConnectWithoutRequestInputSchema: z.ZodType<Prisma.HistoryCreateOrConnectWithoutRequestInput> = z.object({
  where: z.lazy(() => HistoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => HistoryCreateWithoutRequestInputSchema),z.lazy(() => HistoryUncheckedCreateWithoutRequestInputSchema) ]),
}).strict();

export const HistoryCreateManyRequestInputEnvelopeSchema: z.ZodType<Prisma.HistoryCreateManyRequestInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => HistoryCreateManyRequestInputSchema),z.lazy(() => HistoryCreateManyRequestInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const VideoUpsertWithoutRequestInputSchema: z.ZodType<Prisma.VideoUpsertWithoutRequestInput> = z.object({
  update: z.union([ z.lazy(() => VideoUpdateWithoutRequestInputSchema),z.lazy(() => VideoUncheckedUpdateWithoutRequestInputSchema) ]),
  create: z.union([ z.lazy(() => VideoCreateWithoutRequestInputSchema),z.lazy(() => VideoUncheckedCreateWithoutRequestInputSchema) ]),
}).strict();

export const VideoUpdateWithoutRequestInputSchema: z.ZodType<Prisma.VideoUpdateWithoutRequestInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  channel: z.lazy(() => ChannelUpdateOneRequiredWithoutVideoNestedInputSchema).optional()
}).strict();

export const VideoUncheckedUpdateWithoutRequestInputSchema: z.ZodType<Prisma.VideoUncheckedUpdateWithoutRequestInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUpsertWithoutRequestInputSchema: z.ZodType<Prisma.UserUpsertWithoutRequestInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutRequestInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRequestInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutRequestInputSchema),z.lazy(() => UserUncheckedCreateWithoutRequestInputSchema) ]),
}).strict();

export const UserUpdateWithoutRequestInputSchema: z.ZodType<Prisma.UserUpdateWithoutRequestInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateWithoutRequestInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutRequestInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const QueueUpsertWithWhereUniqueWithoutRequestInputSchema: z.ZodType<Prisma.QueueUpsertWithWhereUniqueWithoutRequestInput> = z.object({
  where: z.lazy(() => QueueWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => QueueUpdateWithoutRequestInputSchema),z.lazy(() => QueueUncheckedUpdateWithoutRequestInputSchema) ]),
  create: z.union([ z.lazy(() => QueueCreateWithoutRequestInputSchema),z.lazy(() => QueueUncheckedCreateWithoutRequestInputSchema) ]),
}).strict();

export const QueueUpdateWithWhereUniqueWithoutRequestInputSchema: z.ZodType<Prisma.QueueUpdateWithWhereUniqueWithoutRequestInput> = z.object({
  where: z.lazy(() => QueueWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => QueueUpdateWithoutRequestInputSchema),z.lazy(() => QueueUncheckedUpdateWithoutRequestInputSchema) ]),
}).strict();

export const QueueUpdateManyWithWhereWithoutRequestInputSchema: z.ZodType<Prisma.QueueUpdateManyWithWhereWithoutRequestInput> = z.object({
  where: z.lazy(() => QueueScalarWhereInputSchema),
  data: z.union([ z.lazy(() => QueueUpdateManyMutationInputSchema),z.lazy(() => QueueUncheckedUpdateManyWithoutQueueInputSchema) ]),
}).strict();

export const QueueScalarWhereInputSchema: z.ZodType<Prisma.QueueScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => QueueScalarWhereInputSchema),z.lazy(() => QueueScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => QueueScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => QueueScalarWhereInputSchema),z.lazy(() => QueueScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  requestId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  order: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const HistoryUpsertWithWhereUniqueWithoutRequestInputSchema: z.ZodType<Prisma.HistoryUpsertWithWhereUniqueWithoutRequestInput> = z.object({
  where: z.lazy(() => HistoryWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => HistoryUpdateWithoutRequestInputSchema),z.lazy(() => HistoryUncheckedUpdateWithoutRequestInputSchema) ]),
  create: z.union([ z.lazy(() => HistoryCreateWithoutRequestInputSchema),z.lazy(() => HistoryUncheckedCreateWithoutRequestInputSchema) ]),
}).strict();

export const HistoryUpdateWithWhereUniqueWithoutRequestInputSchema: z.ZodType<Prisma.HistoryUpdateWithWhereUniqueWithoutRequestInput> = z.object({
  where: z.lazy(() => HistoryWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => HistoryUpdateWithoutRequestInputSchema),z.lazy(() => HistoryUncheckedUpdateWithoutRequestInputSchema) ]),
}).strict();

export const HistoryUpdateManyWithWhereWithoutRequestInputSchema: z.ZodType<Prisma.HistoryUpdateManyWithWhereWithoutRequestInput> = z.object({
  where: z.lazy(() => HistoryScalarWhereInputSchema),
  data: z.union([ z.lazy(() => HistoryUpdateManyMutationInputSchema),z.lazy(() => HistoryUncheckedUpdateManyWithoutHistoryInputSchema) ]),
}).strict();

export const HistoryScalarWhereInputSchema: z.ZodType<Prisma.HistoryScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => HistoryScalarWhereInputSchema),z.lazy(() => HistoryScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HistoryScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HistoryScalarWhereInputSchema),z.lazy(() => HistoryScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  requestId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  playedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const RequestCreateWithoutQueueInputSchema: z.ZodType<Prisma.RequestCreateWithoutQueueInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  video: z.lazy(() => VideoCreateNestedOneWithoutRequestInputSchema),
  requestedBy: z.lazy(() => UserCreateNestedOneWithoutRequestInputSchema),
  History: z.lazy(() => HistoryCreateNestedManyWithoutRequestInputSchema).optional()
}).strict();

export const RequestUncheckedCreateWithoutQueueInputSchema: z.ZodType<Prisma.RequestUncheckedCreateWithoutQueueInput> = z.object({
  id: z.string().uuid().optional(),
  videoId: z.string(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  History: z.lazy(() => HistoryUncheckedCreateNestedManyWithoutRequestInputSchema).optional()
}).strict();

export const RequestCreateOrConnectWithoutQueueInputSchema: z.ZodType<Prisma.RequestCreateOrConnectWithoutQueueInput> = z.object({
  where: z.lazy(() => RequestWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RequestCreateWithoutQueueInputSchema),z.lazy(() => RequestUncheckedCreateWithoutQueueInputSchema) ]),
}).strict();

export const RequestUpsertWithoutQueueInputSchema: z.ZodType<Prisma.RequestUpsertWithoutQueueInput> = z.object({
  update: z.union([ z.lazy(() => RequestUpdateWithoutQueueInputSchema),z.lazy(() => RequestUncheckedUpdateWithoutQueueInputSchema) ]),
  create: z.union([ z.lazy(() => RequestCreateWithoutQueueInputSchema),z.lazy(() => RequestUncheckedCreateWithoutQueueInputSchema) ]),
}).strict();

export const RequestUpdateWithoutQueueInputSchema: z.ZodType<Prisma.RequestUpdateWithoutQueueInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  video: z.lazy(() => VideoUpdateOneRequiredWithoutRequestNestedInputSchema).optional(),
  requestedBy: z.lazy(() => UserUpdateOneRequiredWithoutRequestNestedInputSchema).optional(),
  History: z.lazy(() => HistoryUpdateManyWithoutRequestNestedInputSchema).optional()
}).strict();

export const RequestUncheckedUpdateWithoutQueueInputSchema: z.ZodType<Prisma.RequestUncheckedUpdateWithoutQueueInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  videoId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  History: z.lazy(() => HistoryUncheckedUpdateManyWithoutRequestNestedInputSchema).optional()
}).strict();

export const RequestCreateWithoutHistoryInputSchema: z.ZodType<Prisma.RequestCreateWithoutHistoryInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  video: z.lazy(() => VideoCreateNestedOneWithoutRequestInputSchema),
  requestedBy: z.lazy(() => UserCreateNestedOneWithoutRequestInputSchema),
  Queue: z.lazy(() => QueueCreateNestedManyWithoutRequestInputSchema).optional()
}).strict();

export const RequestUncheckedCreateWithoutHistoryInputSchema: z.ZodType<Prisma.RequestUncheckedCreateWithoutHistoryInput> = z.object({
  id: z.string().uuid().optional(),
  videoId: z.string(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  Queue: z.lazy(() => QueueUncheckedCreateNestedManyWithoutRequestInputSchema).optional()
}).strict();

export const RequestCreateOrConnectWithoutHistoryInputSchema: z.ZodType<Prisma.RequestCreateOrConnectWithoutHistoryInput> = z.object({
  where: z.lazy(() => RequestWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RequestCreateWithoutHistoryInputSchema),z.lazy(() => RequestUncheckedCreateWithoutHistoryInputSchema) ]),
}).strict();

export const RequestUpsertWithoutHistoryInputSchema: z.ZodType<Prisma.RequestUpsertWithoutHistoryInput> = z.object({
  update: z.union([ z.lazy(() => RequestUpdateWithoutHistoryInputSchema),z.lazy(() => RequestUncheckedUpdateWithoutHistoryInputSchema) ]),
  create: z.union([ z.lazy(() => RequestCreateWithoutHistoryInputSchema),z.lazy(() => RequestUncheckedCreateWithoutHistoryInputSchema) ]),
}).strict();

export const RequestUpdateWithoutHistoryInputSchema: z.ZodType<Prisma.RequestUpdateWithoutHistoryInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  video: z.lazy(() => VideoUpdateOneRequiredWithoutRequestNestedInputSchema).optional(),
  requestedBy: z.lazy(() => UserUpdateOneRequiredWithoutRequestNestedInputSchema).optional(),
  Queue: z.lazy(() => QueueUpdateManyWithoutRequestNestedInputSchema).optional()
}).strict();

export const RequestUncheckedUpdateWithoutHistoryInputSchema: z.ZodType<Prisma.RequestUncheckedUpdateWithoutHistoryInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  videoId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Queue: z.lazy(() => QueueUncheckedUpdateManyWithoutRequestNestedInputSchema).optional()
}).strict();

export const VideoCreateManyChannelInputSchema: z.ZodType<Prisma.VideoCreateManyChannelInput> = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  url: z.string()
}).strict();

export const VideoUpdateWithoutChannelInputSchema: z.ZodType<Prisma.VideoUpdateWithoutChannelInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Request: z.lazy(() => RequestUpdateManyWithoutVideoNestedInputSchema).optional()
}).strict();

export const VideoUncheckedUpdateWithoutChannelInputSchema: z.ZodType<Prisma.VideoUncheckedUpdateWithoutChannelInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Request: z.lazy(() => RequestUncheckedUpdateManyWithoutVideoNestedInputSchema).optional()
}).strict();

export const VideoUncheckedUpdateManyWithoutVideoInputSchema: z.ZodType<Prisma.VideoUncheckedUpdateManyWithoutVideoInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RequestCreateManyVideoInputSchema: z.ZodType<Prisma.RequestCreateManyVideoInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const RequestUpdateWithoutVideoInputSchema: z.ZodType<Prisma.RequestUpdateWithoutVideoInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  requestedBy: z.lazy(() => UserUpdateOneRequiredWithoutRequestNestedInputSchema).optional(),
  Queue: z.lazy(() => QueueUpdateManyWithoutRequestNestedInputSchema).optional(),
  History: z.lazy(() => HistoryUpdateManyWithoutRequestNestedInputSchema).optional()
}).strict();

export const RequestUncheckedUpdateWithoutVideoInputSchema: z.ZodType<Prisma.RequestUncheckedUpdateWithoutVideoInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Queue: z.lazy(() => QueueUncheckedUpdateManyWithoutRequestNestedInputSchema).optional(),
  History: z.lazy(() => HistoryUncheckedUpdateManyWithoutRequestNestedInputSchema).optional()
}).strict();

export const RequestUncheckedUpdateManyWithoutRequestInputSchema: z.ZodType<Prisma.RequestUncheckedUpdateManyWithoutRequestInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RequestCreateManyRequestedByInputSchema: z.ZodType<Prisma.RequestCreateManyRequestedByInput> = z.object({
  id: z.string().uuid().optional(),
  videoId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const RequestUpdateWithoutRequestedByInputSchema: z.ZodType<Prisma.RequestUpdateWithoutRequestedByInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  video: z.lazy(() => VideoUpdateOneRequiredWithoutRequestNestedInputSchema).optional(),
  Queue: z.lazy(() => QueueUpdateManyWithoutRequestNestedInputSchema).optional(),
  History: z.lazy(() => HistoryUpdateManyWithoutRequestNestedInputSchema).optional()
}).strict();

export const RequestUncheckedUpdateWithoutRequestedByInputSchema: z.ZodType<Prisma.RequestUncheckedUpdateWithoutRequestedByInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  videoId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Queue: z.lazy(() => QueueUncheckedUpdateManyWithoutRequestNestedInputSchema).optional(),
  History: z.lazy(() => HistoryUncheckedUpdateManyWithoutRequestNestedInputSchema).optional()
}).strict();

export const QueueCreateManyRequestInputSchema: z.ZodType<Prisma.QueueCreateManyRequestInput> = z.object({
  id: z.string().uuid().optional(),
  order: z.number().int()
}).strict();

export const HistoryCreateManyRequestInputSchema: z.ZodType<Prisma.HistoryCreateManyRequestInput> = z.object({
  id: z.string().uuid().optional(),
  playedAt: z.coerce.date().optional()
}).strict();

export const QueueUpdateWithoutRequestInputSchema: z.ZodType<Prisma.QueueUpdateWithoutRequestInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const QueueUncheckedUpdateWithoutRequestInputSchema: z.ZodType<Prisma.QueueUncheckedUpdateWithoutRequestInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const QueueUncheckedUpdateManyWithoutQueueInputSchema: z.ZodType<Prisma.QueueUncheckedUpdateManyWithoutQueueInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HistoryUpdateWithoutRequestInputSchema: z.ZodType<Prisma.HistoryUpdateWithoutRequestInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  playedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HistoryUncheckedUpdateWithoutRequestInputSchema: z.ZodType<Prisma.HistoryUncheckedUpdateWithoutRequestInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  playedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HistoryUncheckedUpdateManyWithoutHistoryInputSchema: z.ZodType<Prisma.HistoryUncheckedUpdateManyWithoutHistoryInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  playedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const SettingFindFirstArgsSchema: z.ZodType<Prisma.SettingFindFirstArgs> = z.object({
  select: SettingSelectSchema.optional(),
  where: SettingWhereInputSchema.optional(),
  orderBy: z.union([ SettingOrderByWithRelationInputSchema.array(),SettingOrderByWithRelationInputSchema ]).optional(),
  cursor: SettingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SettingScalarFieldEnumSchema,SettingScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SettingFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SettingFindFirstOrThrowArgs> = z.object({
  select: SettingSelectSchema.optional(),
  where: SettingWhereInputSchema.optional(),
  orderBy: z.union([ SettingOrderByWithRelationInputSchema.array(),SettingOrderByWithRelationInputSchema ]).optional(),
  cursor: SettingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SettingScalarFieldEnumSchema,SettingScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SettingFindManyArgsSchema: z.ZodType<Prisma.SettingFindManyArgs> = z.object({
  select: SettingSelectSchema.optional(),
  where: SettingWhereInputSchema.optional(),
  orderBy: z.union([ SettingOrderByWithRelationInputSchema.array(),SettingOrderByWithRelationInputSchema ]).optional(),
  cursor: SettingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SettingScalarFieldEnumSchema,SettingScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SettingAggregateArgsSchema: z.ZodType<Prisma.SettingAggregateArgs> = z.object({
  where: SettingWhereInputSchema.optional(),
  orderBy: z.union([ SettingOrderByWithRelationInputSchema.array(),SettingOrderByWithRelationInputSchema ]).optional(),
  cursor: SettingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SettingGroupByArgsSchema: z.ZodType<Prisma.SettingGroupByArgs> = z.object({
  where: SettingWhereInputSchema.optional(),
  orderBy: z.union([ SettingOrderByWithAggregationInputSchema.array(),SettingOrderByWithAggregationInputSchema ]).optional(),
  by: SettingScalarFieldEnumSchema.array(),
  having: SettingScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SettingFindUniqueArgsSchema: z.ZodType<Prisma.SettingFindUniqueArgs> = z.object({
  select: SettingSelectSchema.optional(),
  where: SettingWhereUniqueInputSchema,
}).strict()

export const SettingFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SettingFindUniqueOrThrowArgs> = z.object({
  select: SettingSelectSchema.optional(),
  where: SettingWhereUniqueInputSchema,
}).strict()

export const ChannelFindFirstArgsSchema: z.ZodType<Prisma.ChannelFindFirstArgs> = z.object({
  select: ChannelSelectSchema.optional(),
  include: ChannelIncludeSchema.optional(),
  where: ChannelWhereInputSchema.optional(),
  orderBy: z.union([ ChannelOrderByWithRelationInputSchema.array(),ChannelOrderByWithRelationInputSchema ]).optional(),
  cursor: ChannelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ChannelScalarFieldEnumSchema,ChannelScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ChannelFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ChannelFindFirstOrThrowArgs> = z.object({
  select: ChannelSelectSchema.optional(),
  include: ChannelIncludeSchema.optional(),
  where: ChannelWhereInputSchema.optional(),
  orderBy: z.union([ ChannelOrderByWithRelationInputSchema.array(),ChannelOrderByWithRelationInputSchema ]).optional(),
  cursor: ChannelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ChannelScalarFieldEnumSchema,ChannelScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ChannelFindManyArgsSchema: z.ZodType<Prisma.ChannelFindManyArgs> = z.object({
  select: ChannelSelectSchema.optional(),
  include: ChannelIncludeSchema.optional(),
  where: ChannelWhereInputSchema.optional(),
  orderBy: z.union([ ChannelOrderByWithRelationInputSchema.array(),ChannelOrderByWithRelationInputSchema ]).optional(),
  cursor: ChannelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ChannelScalarFieldEnumSchema,ChannelScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ChannelAggregateArgsSchema: z.ZodType<Prisma.ChannelAggregateArgs> = z.object({
  where: ChannelWhereInputSchema.optional(),
  orderBy: z.union([ ChannelOrderByWithRelationInputSchema.array(),ChannelOrderByWithRelationInputSchema ]).optional(),
  cursor: ChannelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ChannelGroupByArgsSchema: z.ZodType<Prisma.ChannelGroupByArgs> = z.object({
  where: ChannelWhereInputSchema.optional(),
  orderBy: z.union([ ChannelOrderByWithAggregationInputSchema.array(),ChannelOrderByWithAggregationInputSchema ]).optional(),
  by: ChannelScalarFieldEnumSchema.array(),
  having: ChannelScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ChannelFindUniqueArgsSchema: z.ZodType<Prisma.ChannelFindUniqueArgs> = z.object({
  select: ChannelSelectSchema.optional(),
  include: ChannelIncludeSchema.optional(),
  where: ChannelWhereUniqueInputSchema,
}).strict()

export const ChannelFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ChannelFindUniqueOrThrowArgs> = z.object({
  select: ChannelSelectSchema.optional(),
  include: ChannelIncludeSchema.optional(),
  where: ChannelWhereUniqueInputSchema,
}).strict()

export const VideoFindFirstArgsSchema: z.ZodType<Prisma.VideoFindFirstArgs> = z.object({
  select: VideoSelectSchema.optional(),
  include: VideoIncludeSchema.optional(),
  where: VideoWhereInputSchema.optional(),
  orderBy: z.union([ VideoOrderByWithRelationInputSchema.array(),VideoOrderByWithRelationInputSchema ]).optional(),
  cursor: VideoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VideoScalarFieldEnumSchema,VideoScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const VideoFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VideoFindFirstOrThrowArgs> = z.object({
  select: VideoSelectSchema.optional(),
  include: VideoIncludeSchema.optional(),
  where: VideoWhereInputSchema.optional(),
  orderBy: z.union([ VideoOrderByWithRelationInputSchema.array(),VideoOrderByWithRelationInputSchema ]).optional(),
  cursor: VideoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VideoScalarFieldEnumSchema,VideoScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const VideoFindManyArgsSchema: z.ZodType<Prisma.VideoFindManyArgs> = z.object({
  select: VideoSelectSchema.optional(),
  include: VideoIncludeSchema.optional(),
  where: VideoWhereInputSchema.optional(),
  orderBy: z.union([ VideoOrderByWithRelationInputSchema.array(),VideoOrderByWithRelationInputSchema ]).optional(),
  cursor: VideoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VideoScalarFieldEnumSchema,VideoScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const VideoAggregateArgsSchema: z.ZodType<Prisma.VideoAggregateArgs> = z.object({
  where: VideoWhereInputSchema.optional(),
  orderBy: z.union([ VideoOrderByWithRelationInputSchema.array(),VideoOrderByWithRelationInputSchema ]).optional(),
  cursor: VideoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const VideoGroupByArgsSchema: z.ZodType<Prisma.VideoGroupByArgs> = z.object({
  where: VideoWhereInputSchema.optional(),
  orderBy: z.union([ VideoOrderByWithAggregationInputSchema.array(),VideoOrderByWithAggregationInputSchema ]).optional(),
  by: VideoScalarFieldEnumSchema.array(),
  having: VideoScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const VideoFindUniqueArgsSchema: z.ZodType<Prisma.VideoFindUniqueArgs> = z.object({
  select: VideoSelectSchema.optional(),
  include: VideoIncludeSchema.optional(),
  where: VideoWhereUniqueInputSchema,
}).strict()

export const VideoFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VideoFindUniqueOrThrowArgs> = z.object({
  select: VideoSelectSchema.optional(),
  include: VideoIncludeSchema.optional(),
  where: VideoWhereUniqueInputSchema,
}).strict()

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const RequestFindFirstArgsSchema: z.ZodType<Prisma.RequestFindFirstArgs> = z.object({
  select: RequestSelectSchema.optional(),
  include: RequestIncludeSchema.optional(),
  where: RequestWhereInputSchema.optional(),
  orderBy: z.union([ RequestOrderByWithRelationInputSchema.array(),RequestOrderByWithRelationInputSchema ]).optional(),
  cursor: RequestWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RequestScalarFieldEnumSchema,RequestScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const RequestFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RequestFindFirstOrThrowArgs> = z.object({
  select: RequestSelectSchema.optional(),
  include: RequestIncludeSchema.optional(),
  where: RequestWhereInputSchema.optional(),
  orderBy: z.union([ RequestOrderByWithRelationInputSchema.array(),RequestOrderByWithRelationInputSchema ]).optional(),
  cursor: RequestWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RequestScalarFieldEnumSchema,RequestScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const RequestFindManyArgsSchema: z.ZodType<Prisma.RequestFindManyArgs> = z.object({
  select: RequestSelectSchema.optional(),
  include: RequestIncludeSchema.optional(),
  where: RequestWhereInputSchema.optional(),
  orderBy: z.union([ RequestOrderByWithRelationInputSchema.array(),RequestOrderByWithRelationInputSchema ]).optional(),
  cursor: RequestWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RequestScalarFieldEnumSchema,RequestScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const RequestAggregateArgsSchema: z.ZodType<Prisma.RequestAggregateArgs> = z.object({
  where: RequestWhereInputSchema.optional(),
  orderBy: z.union([ RequestOrderByWithRelationInputSchema.array(),RequestOrderByWithRelationInputSchema ]).optional(),
  cursor: RequestWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const RequestGroupByArgsSchema: z.ZodType<Prisma.RequestGroupByArgs> = z.object({
  where: RequestWhereInputSchema.optional(),
  orderBy: z.union([ RequestOrderByWithAggregationInputSchema.array(),RequestOrderByWithAggregationInputSchema ]).optional(),
  by: RequestScalarFieldEnumSchema.array(),
  having: RequestScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const RequestFindUniqueArgsSchema: z.ZodType<Prisma.RequestFindUniqueArgs> = z.object({
  select: RequestSelectSchema.optional(),
  include: RequestIncludeSchema.optional(),
  where: RequestWhereUniqueInputSchema,
}).strict()

export const RequestFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RequestFindUniqueOrThrowArgs> = z.object({
  select: RequestSelectSchema.optional(),
  include: RequestIncludeSchema.optional(),
  where: RequestWhereUniqueInputSchema,
}).strict()

export const QueueFindFirstArgsSchema: z.ZodType<Prisma.QueueFindFirstArgs> = z.object({
  select: QueueSelectSchema.optional(),
  include: QueueIncludeSchema.optional(),
  where: QueueWhereInputSchema.optional(),
  orderBy: z.union([ QueueOrderByWithRelationInputSchema.array(),QueueOrderByWithRelationInputSchema ]).optional(),
  cursor: QueueWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ QueueScalarFieldEnumSchema,QueueScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const QueueFindFirstOrThrowArgsSchema: z.ZodType<Prisma.QueueFindFirstOrThrowArgs> = z.object({
  select: QueueSelectSchema.optional(),
  include: QueueIncludeSchema.optional(),
  where: QueueWhereInputSchema.optional(),
  orderBy: z.union([ QueueOrderByWithRelationInputSchema.array(),QueueOrderByWithRelationInputSchema ]).optional(),
  cursor: QueueWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ QueueScalarFieldEnumSchema,QueueScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const QueueFindManyArgsSchema: z.ZodType<Prisma.QueueFindManyArgs> = z.object({
  select: QueueSelectSchema.optional(),
  include: QueueIncludeSchema.optional(),
  where: QueueWhereInputSchema.optional(),
  orderBy: z.union([ QueueOrderByWithRelationInputSchema.array(),QueueOrderByWithRelationInputSchema ]).optional(),
  cursor: QueueWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ QueueScalarFieldEnumSchema,QueueScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const QueueAggregateArgsSchema: z.ZodType<Prisma.QueueAggregateArgs> = z.object({
  where: QueueWhereInputSchema.optional(),
  orderBy: z.union([ QueueOrderByWithRelationInputSchema.array(),QueueOrderByWithRelationInputSchema ]).optional(),
  cursor: QueueWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const QueueGroupByArgsSchema: z.ZodType<Prisma.QueueGroupByArgs> = z.object({
  where: QueueWhereInputSchema.optional(),
  orderBy: z.union([ QueueOrderByWithAggregationInputSchema.array(),QueueOrderByWithAggregationInputSchema ]).optional(),
  by: QueueScalarFieldEnumSchema.array(),
  having: QueueScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const QueueFindUniqueArgsSchema: z.ZodType<Prisma.QueueFindUniqueArgs> = z.object({
  select: QueueSelectSchema.optional(),
  include: QueueIncludeSchema.optional(),
  where: QueueWhereUniqueInputSchema,
}).strict()

export const QueueFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.QueueFindUniqueOrThrowArgs> = z.object({
  select: QueueSelectSchema.optional(),
  include: QueueIncludeSchema.optional(),
  where: QueueWhereUniqueInputSchema,
}).strict()

export const HistoryFindFirstArgsSchema: z.ZodType<Prisma.HistoryFindFirstArgs> = z.object({
  select: HistorySelectSchema.optional(),
  include: HistoryIncludeSchema.optional(),
  where: HistoryWhereInputSchema.optional(),
  orderBy: z.union([ HistoryOrderByWithRelationInputSchema.array(),HistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: HistoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HistoryScalarFieldEnumSchema,HistoryScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const HistoryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.HistoryFindFirstOrThrowArgs> = z.object({
  select: HistorySelectSchema.optional(),
  include: HistoryIncludeSchema.optional(),
  where: HistoryWhereInputSchema.optional(),
  orderBy: z.union([ HistoryOrderByWithRelationInputSchema.array(),HistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: HistoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HistoryScalarFieldEnumSchema,HistoryScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const HistoryFindManyArgsSchema: z.ZodType<Prisma.HistoryFindManyArgs> = z.object({
  select: HistorySelectSchema.optional(),
  include: HistoryIncludeSchema.optional(),
  where: HistoryWhereInputSchema.optional(),
  orderBy: z.union([ HistoryOrderByWithRelationInputSchema.array(),HistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: HistoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HistoryScalarFieldEnumSchema,HistoryScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const HistoryAggregateArgsSchema: z.ZodType<Prisma.HistoryAggregateArgs> = z.object({
  where: HistoryWhereInputSchema.optional(),
  orderBy: z.union([ HistoryOrderByWithRelationInputSchema.array(),HistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: HistoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const HistoryGroupByArgsSchema: z.ZodType<Prisma.HistoryGroupByArgs> = z.object({
  where: HistoryWhereInputSchema.optional(),
  orderBy: z.union([ HistoryOrderByWithAggregationInputSchema.array(),HistoryOrderByWithAggregationInputSchema ]).optional(),
  by: HistoryScalarFieldEnumSchema.array(),
  having: HistoryScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const HistoryFindUniqueArgsSchema: z.ZodType<Prisma.HistoryFindUniqueArgs> = z.object({
  select: HistorySelectSchema.optional(),
  include: HistoryIncludeSchema.optional(),
  where: HistoryWhereUniqueInputSchema,
}).strict()

export const HistoryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.HistoryFindUniqueOrThrowArgs> = z.object({
  select: HistorySelectSchema.optional(),
  include: HistoryIncludeSchema.optional(),
  where: HistoryWhereUniqueInputSchema,
}).strict()

export const SettingCreateArgsSchema: z.ZodType<Prisma.SettingCreateArgs> = z.object({
  select: SettingSelectSchema.optional(),
  data: z.union([ SettingCreateInputSchema,SettingUncheckedCreateInputSchema ]).optional(),
}).strict()

export const SettingUpsertArgsSchema: z.ZodType<Prisma.SettingUpsertArgs> = z.object({
  select: SettingSelectSchema.optional(),
  where: SettingWhereUniqueInputSchema,
  create: z.union([ SettingCreateInputSchema,SettingUncheckedCreateInputSchema ]),
  update: z.union([ SettingUpdateInputSchema,SettingUncheckedUpdateInputSchema ]),
}).strict()

export const SettingCreateManyArgsSchema: z.ZodType<Prisma.SettingCreateManyArgs> = z.object({
  data: z.union([ SettingCreateManyInputSchema,SettingCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const SettingDeleteArgsSchema: z.ZodType<Prisma.SettingDeleteArgs> = z.object({
  select: SettingSelectSchema.optional(),
  where: SettingWhereUniqueInputSchema,
}).strict()

export const SettingUpdateArgsSchema: z.ZodType<Prisma.SettingUpdateArgs> = z.object({
  select: SettingSelectSchema.optional(),
  data: z.union([ SettingUpdateInputSchema,SettingUncheckedUpdateInputSchema ]),
  where: SettingWhereUniqueInputSchema,
}).strict()

export const SettingUpdateManyArgsSchema: z.ZodType<Prisma.SettingUpdateManyArgs> = z.object({
  data: z.union([ SettingUpdateManyMutationInputSchema,SettingUncheckedUpdateManyInputSchema ]),
  where: SettingWhereInputSchema.optional(),
}).strict()

export const SettingDeleteManyArgsSchema: z.ZodType<Prisma.SettingDeleteManyArgs> = z.object({
  where: SettingWhereInputSchema.optional(),
}).strict()

export const ChannelCreateArgsSchema: z.ZodType<Prisma.ChannelCreateArgs> = z.object({
  select: ChannelSelectSchema.optional(),
  include: ChannelIncludeSchema.optional(),
  data: z.union([ ChannelCreateInputSchema,ChannelUncheckedCreateInputSchema ]),
}).strict()

export const ChannelUpsertArgsSchema: z.ZodType<Prisma.ChannelUpsertArgs> = z.object({
  select: ChannelSelectSchema.optional(),
  include: ChannelIncludeSchema.optional(),
  where: ChannelWhereUniqueInputSchema,
  create: z.union([ ChannelCreateInputSchema,ChannelUncheckedCreateInputSchema ]),
  update: z.union([ ChannelUpdateInputSchema,ChannelUncheckedUpdateInputSchema ]),
}).strict()

export const ChannelCreateManyArgsSchema: z.ZodType<Prisma.ChannelCreateManyArgs> = z.object({
  data: z.union([ ChannelCreateManyInputSchema,ChannelCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ChannelDeleteArgsSchema: z.ZodType<Prisma.ChannelDeleteArgs> = z.object({
  select: ChannelSelectSchema.optional(),
  include: ChannelIncludeSchema.optional(),
  where: ChannelWhereUniqueInputSchema,
}).strict()

export const ChannelUpdateArgsSchema: z.ZodType<Prisma.ChannelUpdateArgs> = z.object({
  select: ChannelSelectSchema.optional(),
  include: ChannelIncludeSchema.optional(),
  data: z.union([ ChannelUpdateInputSchema,ChannelUncheckedUpdateInputSchema ]),
  where: ChannelWhereUniqueInputSchema,
}).strict()

export const ChannelUpdateManyArgsSchema: z.ZodType<Prisma.ChannelUpdateManyArgs> = z.object({
  data: z.union([ ChannelUpdateManyMutationInputSchema,ChannelUncheckedUpdateManyInputSchema ]),
  where: ChannelWhereInputSchema.optional(),
}).strict()

export const ChannelDeleteManyArgsSchema: z.ZodType<Prisma.ChannelDeleteManyArgs> = z.object({
  where: ChannelWhereInputSchema.optional(),
}).strict()

export const VideoCreateArgsSchema: z.ZodType<Prisma.VideoCreateArgs> = z.object({
  select: VideoSelectSchema.optional(),
  include: VideoIncludeSchema.optional(),
  data: z.union([ VideoCreateInputSchema,VideoUncheckedCreateInputSchema ]),
}).strict()

export const VideoUpsertArgsSchema: z.ZodType<Prisma.VideoUpsertArgs> = z.object({
  select: VideoSelectSchema.optional(),
  include: VideoIncludeSchema.optional(),
  where: VideoWhereUniqueInputSchema,
  create: z.union([ VideoCreateInputSchema,VideoUncheckedCreateInputSchema ]),
  update: z.union([ VideoUpdateInputSchema,VideoUncheckedUpdateInputSchema ]),
}).strict()

export const VideoCreateManyArgsSchema: z.ZodType<Prisma.VideoCreateManyArgs> = z.object({
  data: z.union([ VideoCreateManyInputSchema,VideoCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const VideoDeleteArgsSchema: z.ZodType<Prisma.VideoDeleteArgs> = z.object({
  select: VideoSelectSchema.optional(),
  include: VideoIncludeSchema.optional(),
  where: VideoWhereUniqueInputSchema,
}).strict()

export const VideoUpdateArgsSchema: z.ZodType<Prisma.VideoUpdateArgs> = z.object({
  select: VideoSelectSchema.optional(),
  include: VideoIncludeSchema.optional(),
  data: z.union([ VideoUpdateInputSchema,VideoUncheckedUpdateInputSchema ]),
  where: VideoWhereUniqueInputSchema,
}).strict()

export const VideoUpdateManyArgsSchema: z.ZodType<Prisma.VideoUpdateManyArgs> = z.object({
  data: z.union([ VideoUpdateManyMutationInputSchema,VideoUncheckedUpdateManyInputSchema ]),
  where: VideoWhereInputSchema.optional(),
}).strict()

export const VideoDeleteManyArgsSchema: z.ZodType<Prisma.VideoDeleteManyArgs> = z.object({
  where: VideoWhereInputSchema.optional(),
}).strict()

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict()

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict()

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict()

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict()

export const RequestCreateArgsSchema: z.ZodType<Prisma.RequestCreateArgs> = z.object({
  select: RequestSelectSchema.optional(),
  include: RequestIncludeSchema.optional(),
  data: z.union([ RequestCreateInputSchema,RequestUncheckedCreateInputSchema ]),
}).strict()

export const RequestUpsertArgsSchema: z.ZodType<Prisma.RequestUpsertArgs> = z.object({
  select: RequestSelectSchema.optional(),
  include: RequestIncludeSchema.optional(),
  where: RequestWhereUniqueInputSchema,
  create: z.union([ RequestCreateInputSchema,RequestUncheckedCreateInputSchema ]),
  update: z.union([ RequestUpdateInputSchema,RequestUncheckedUpdateInputSchema ]),
}).strict()

export const RequestCreateManyArgsSchema: z.ZodType<Prisma.RequestCreateManyArgs> = z.object({
  data: z.union([ RequestCreateManyInputSchema,RequestCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const RequestDeleteArgsSchema: z.ZodType<Prisma.RequestDeleteArgs> = z.object({
  select: RequestSelectSchema.optional(),
  include: RequestIncludeSchema.optional(),
  where: RequestWhereUniqueInputSchema,
}).strict()

export const RequestUpdateArgsSchema: z.ZodType<Prisma.RequestUpdateArgs> = z.object({
  select: RequestSelectSchema.optional(),
  include: RequestIncludeSchema.optional(),
  data: z.union([ RequestUpdateInputSchema,RequestUncheckedUpdateInputSchema ]),
  where: RequestWhereUniqueInputSchema,
}).strict()

export const RequestUpdateManyArgsSchema: z.ZodType<Prisma.RequestUpdateManyArgs> = z.object({
  data: z.union([ RequestUpdateManyMutationInputSchema,RequestUncheckedUpdateManyInputSchema ]),
  where: RequestWhereInputSchema.optional(),
}).strict()

export const RequestDeleteManyArgsSchema: z.ZodType<Prisma.RequestDeleteManyArgs> = z.object({
  where: RequestWhereInputSchema.optional(),
}).strict()

export const QueueCreateArgsSchema: z.ZodType<Prisma.QueueCreateArgs> = z.object({
  select: QueueSelectSchema.optional(),
  include: QueueIncludeSchema.optional(),
  data: z.union([ QueueCreateInputSchema,QueueUncheckedCreateInputSchema ]),
}).strict()

export const QueueUpsertArgsSchema: z.ZodType<Prisma.QueueUpsertArgs> = z.object({
  select: QueueSelectSchema.optional(),
  include: QueueIncludeSchema.optional(),
  where: QueueWhereUniqueInputSchema,
  create: z.union([ QueueCreateInputSchema,QueueUncheckedCreateInputSchema ]),
  update: z.union([ QueueUpdateInputSchema,QueueUncheckedUpdateInputSchema ]),
}).strict()

export const QueueCreateManyArgsSchema: z.ZodType<Prisma.QueueCreateManyArgs> = z.object({
  data: z.union([ QueueCreateManyInputSchema,QueueCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const QueueDeleteArgsSchema: z.ZodType<Prisma.QueueDeleteArgs> = z.object({
  select: QueueSelectSchema.optional(),
  include: QueueIncludeSchema.optional(),
  where: QueueWhereUniqueInputSchema,
}).strict()

export const QueueUpdateArgsSchema: z.ZodType<Prisma.QueueUpdateArgs> = z.object({
  select: QueueSelectSchema.optional(),
  include: QueueIncludeSchema.optional(),
  data: z.union([ QueueUpdateInputSchema,QueueUncheckedUpdateInputSchema ]),
  where: QueueWhereUniqueInputSchema,
}).strict()

export const QueueUpdateManyArgsSchema: z.ZodType<Prisma.QueueUpdateManyArgs> = z.object({
  data: z.union([ QueueUpdateManyMutationInputSchema,QueueUncheckedUpdateManyInputSchema ]),
  where: QueueWhereInputSchema.optional(),
}).strict()

export const QueueDeleteManyArgsSchema: z.ZodType<Prisma.QueueDeleteManyArgs> = z.object({
  where: QueueWhereInputSchema.optional(),
}).strict()

export const HistoryCreateArgsSchema: z.ZodType<Prisma.HistoryCreateArgs> = z.object({
  select: HistorySelectSchema.optional(),
  include: HistoryIncludeSchema.optional(),
  data: z.union([ HistoryCreateInputSchema,HistoryUncheckedCreateInputSchema ]),
}).strict()

export const HistoryUpsertArgsSchema: z.ZodType<Prisma.HistoryUpsertArgs> = z.object({
  select: HistorySelectSchema.optional(),
  include: HistoryIncludeSchema.optional(),
  where: HistoryWhereUniqueInputSchema,
  create: z.union([ HistoryCreateInputSchema,HistoryUncheckedCreateInputSchema ]),
  update: z.union([ HistoryUpdateInputSchema,HistoryUncheckedUpdateInputSchema ]),
}).strict()

export const HistoryCreateManyArgsSchema: z.ZodType<Prisma.HistoryCreateManyArgs> = z.object({
  data: z.union([ HistoryCreateManyInputSchema,HistoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const HistoryDeleteArgsSchema: z.ZodType<Prisma.HistoryDeleteArgs> = z.object({
  select: HistorySelectSchema.optional(),
  include: HistoryIncludeSchema.optional(),
  where: HistoryWhereUniqueInputSchema,
}).strict()

export const HistoryUpdateArgsSchema: z.ZodType<Prisma.HistoryUpdateArgs> = z.object({
  select: HistorySelectSchema.optional(),
  include: HistoryIncludeSchema.optional(),
  data: z.union([ HistoryUpdateInputSchema,HistoryUncheckedUpdateInputSchema ]),
  where: HistoryWhereUniqueInputSchema,
}).strict()

export const HistoryUpdateManyArgsSchema: z.ZodType<Prisma.HistoryUpdateManyArgs> = z.object({
  data: z.union([ HistoryUpdateManyMutationInputSchema,HistoryUncheckedUpdateManyInputSchema ]),
  where: HistoryWhereInputSchema.optional(),
}).strict()

export const HistoryDeleteManyArgsSchema: z.ZodType<Prisma.HistoryDeleteManyArgs> = z.object({
  where: HistoryWhereInputSchema.optional(),
}).strict()