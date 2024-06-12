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
  ],
}

export default Users
