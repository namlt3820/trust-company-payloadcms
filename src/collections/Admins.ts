import { CollectionConfig } from 'payload/types'
import { CollectionSlugs } from './CollectionSlugs'

const Admins: CollectionConfig = {
  slug: CollectionSlugs.admins,
  auth: true,
  admin: {
    useAsTitle: 'email',
    enableRichTextLink: false,
    enableRichTextRelationship: false,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}

export default Admins
