import { notifyAdmin } from '@/hooks/notifyAdmin'
import { Feedback } from 'payload/generated-types'
import { CollectionConfig } from 'payload/types'
import { CollectionSlugs } from './CollectionSlugs'

const Feedbacks: CollectionConfig = {
  slug: CollectionSlugs.feedbacks,
  admin: {
    useAsTitle: 'summary',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      maxLength: 100,
      label: 'Name',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
    },
    {
      name: 'processed',
      label: 'Processed',
      type: 'checkbox',
      index: true,
      defaultValue: false,
    },
    {
      name: 'content',
      type: 'textarea',
      label: 'User Feedback',
      maxLength: 5000,
      required: true,
    },
    {
      name: 'summary',
      type: 'text',
      maxLength: 120,
      hooks: {
        beforeChange: [
          ({ data }: { data?: Partial<Feedback> }) => {
            return data?.content?.substring(0, 100) + '...' || ''
          },
        ],
      },
    },
  ],
  access: {
    create: () => true,
  },
  hooks: {
    afterChange: [notifyAdmin],
  },
}

export default Feedbacks
