import { CollectionConfig } from 'payload/types'
import { CollectionSlugs } from './CollectionSlugs'

const Feedbacks: CollectionConfig = {
  slug: CollectionSlugs.feedbacks,
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      maxLength: 150,
      required: true,
    },
    {
      name: 'isFinised',
      label: 'Is finished',
      type: 'checkbox',
      index: true,
      defaultValue: false,
    },
    {
      name: 'feedback',
      type: 'textarea',
      label: 'Feedback from user',
      maxLength: 5000,
      required: true,
    },
    {
      name: 'response',
      label: 'Response from admin',
      type: 'textarea',
      maxLength: 5000,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: CollectionSlugs.users,
      required: true,
      index: true,
      label: 'User',
    },
  ],
}

export default Feedbacks
