export const petSchema = {
  type: 'object',
  required: ['id', 'category', 'name', 'photoUrls', 'tags', 'status'],
  properties: {
    id: { type: 'number' },
    category: { type: 'object' },
    name: { type: 'string' },
    photoUrls: { type: 'array' },
    tags: { type: 'array' },
    status: { type: 'string' },
  },
};
