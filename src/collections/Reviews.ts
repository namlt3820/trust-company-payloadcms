import { CompanyRates } from '@/constants/CompanyRates'
import { Review } from 'payload/generated-types'
import { CollectionConfig } from 'payload/types'
import { CollectionSlugs } from './CollectionSlugs'

const Reviews: CollectionConfig = {
  slug: CollectionSlugs.reviews,
  admin: {
    enableRichTextLink: false,
    enableRichTextRelationship: false,
    useAsTitle: 'summary',
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
          maxLength: 200,
        },
        {
          name: 'team',
          label: 'Team',
          type: 'textarea',
          maxLength: 200,
        },

        {
          name: 'process',
          label: 'Process',
          type: 'textarea',
          maxLength: 200,
        },

        {
          name: 'benefits',
          label: 'Benefits',
          type: 'textarea',
          maxLength: 200,
        },
      ],
    },
    {
      name: 'detailedReview',
      label: 'Detailed review',
      type: 'textarea',
      required: true,
      maxLength: 10000,
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
            return data?.detailedReview?.substring(0, 100) + '...' || ''
          },
        ],
      },
    },
  ],
}

export default Reviews
