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
        const schema = joi.string().max(30).alphanum()
        const { error } = schema.validate(val)

        return error ? error.message : true
      },
    },
  ],
}

export default Users
