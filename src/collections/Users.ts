import { checkSchema } from '@/utilities/validateWithJoi'
import joi from 'joi'
import { CollectionConfig } from 'payload/types'
import { CollectionSlugs } from './CollectionSlugs'

const Users: CollectionConfig = {
  slug: CollectionSlugs.users,
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'name',
      type: 'text',
      validate: (val) => {
        return checkSchema(val, joi.string().max(30).alphanum())
      },
    },
  ],
}

export default Users
