import { CollectionConfig } from 'payload/types'
import { CollectionSlugs } from './CollectionSlugs'

const Comments: CollectionConfig = {
  slug: CollectionSlugs.comments,
  fields: [
    {
      name: 'content',
      type: 'textarea',
      maxLength: 5000,
      required: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: CollectionSlugs.users,
      required: true,
      index: true,
      label: 'User',
    },
    {
      name: 'review',
      type: 'relationship',
      relationTo: CollectionSlugs.reviews,
      required: true,
      index: true,
      label: 'Review',
    },
  ],
}

export default Comments
