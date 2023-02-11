export default {
  type: "array",
  properties: {
    count: { type: 'number' },
    description: {type: 'string'},
    id: {type: 'number'},
    price: {type: 'number'},
    title: {type: 'string'},
  },
} as const;
