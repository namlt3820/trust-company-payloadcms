import { Field } from 'payload/types'

export const populatedUserField: () => Field = () => ({
  name: 'populatedUser',
  type: 'group',
  admin: {
    readOnly: true,
    disabled: true,
  },
  access: {
    update: () => false,
  },
  fields: [
    {
      name: 'id',
      type: 'text',
    },
    {
      name: 'name',
      type: 'text',
    },
  ],
})
