import { CompanyRates } from '@/constants/CompanyRates'
import { slateEditor } from '@payloadcms/richtext-slate'
import { Review } from 'payload/generated-types'
import { CollectionConfig } from 'payload/types'
import { CollectionSlugs } from './CollectionSlugs'

const aggregateTextValues = (obj, field) => {
  let result = ''

  function traverse(obj) {
    for (let key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        traverse(obj[key]) // Recursively traverse nested objects
      } else if (key === field) {
        result += obj[key] + ' ' // Aggregate the value of the specified field
      }
    }
  }

  traverse(obj)
  return result
}

const Reviews: CollectionConfig = {
  slug: CollectionSlugs.reviews,
  admin: {
    enableRichTextLink: false,
    enableRichTextRelationship: false,
    useAsTitle: 'summary',
  },
  hooks: {
    afterRead: [
      async ({ doc, req: { payload } }) => {
        if (doc?.user) {
          const userDoc = await payload.findByID({
            collection: 'users',
            id: typeof doc.user === 'object' ? doc?.user?.id : doc?.user,
            depth: 0,
          })

          doc.populatedUser = {
            id: userDoc.id,
            name: userDoc.name,
          }
        }

        return doc
      },
    ],
  },
  fields: [
    {
      name: 'rate',
      type: 'select',
      defaultValue: CompanyRates.normal,
      options: [
        {
          value: CompanyRates.excellent,
          label: 'Excellent',
        },
        {
          value: CompanyRates.good,
          label: 'Good',
        },
        {
          value: CompanyRates.normal,
          label: 'Normal',
        },
        {
          value: CompanyRates.bad,
          label: 'Bad',
        },
        {
          value: CompanyRates.terrible,
          label: 'Terrible',
        },
      ],
      required: true,
    },
    {
      name: 'relevantInformation',
      label: 'Relevant information (optional)',
      type: 'group',
      fields: [
        {
          name: 'branch',
          label: 'Branch',
          type: 'text',
          maxLength: 200,
        },
        {
          name: 'duration',
          label: 'Duration (in months)',
          type: 'number',
          min: 1,
        },
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          maxLength: 50,
        },
      ],
    },
    {
      name: 'basicReview',
      label: 'Basic review (optional)',
      type: 'group',
      fields: [
        {
          name: 'facilities',
          label: 'Facilities',
          type: 'textarea',
          maxLength: 500,
        },
        {
          name: 'team',
          label: 'Team',
          type: 'textarea',
          maxLength: 500,
        },

        {
          name: 'process',
          label: 'Process',
          type: 'textarea',
          maxLength: 500,
        },

        {
          name: 'benefits',
          label: 'Benefits',
          type: 'textarea',
          maxLength: 500,
        },
      ],
    },
    {
      name: 'detailedReview',
      label: 'Detailed review',
      type: 'richText',
      required: true,
      editor: slateEditor({
        admin: {
          elements: ['ol', 'ul'],
          leaves: ['bold', 'italic', 'strikethrough', 'underline'],
        },
      }),
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
      name: 'company',
      type: 'relationship',
      relationTo: CollectionSlugs.companies,
      required: true,
      index: true,
      label: 'Company',
    },
    {
      name: 'summary',
      type: 'text',
      maxLength: 120,
      hooks: {
        beforeChange: [
          ({ data }: { data?: Partial<Review> }) => {
            let allText: string

            try {
              allText = aggregateTextValues(data?.detailedReview, 'text')
            } catch (error) {
              allText = ''
            }

            return allText?.substring(0, 100) + '...' || ''
          },
        ],
      },
    },
    {
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
    },
  ],
  access: {
    read: () => true,
  },
}

export default Reviews
