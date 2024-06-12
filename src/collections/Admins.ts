import { CollectionConfig } from 'payload/types'
import { CollectionSlugs } from './CollectionSlugs'

const Admins: CollectionConfig = {
  slug: CollectionSlugs.admin,
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}

export default Admins
