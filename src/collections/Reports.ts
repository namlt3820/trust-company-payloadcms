import { ReportType as ReportTypes } from '@/constants/ReportTypes'
import { CollectionConfig } from 'payload/types'
import { CollectionSlugs } from './CollectionSlugs'

const Reports: CollectionConfig = {
  slug: CollectionSlugs.reports,
  admin: {
    useAsTitle: 'type',
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      options: [
        {
          label: 'Defamation',
          value: ReportTypes.Defamation,
        },
        {
          label: 'Law violation',
          value: ReportTypes.LawViolation,
        },
        {
          label: 'Misinformation',
          value: ReportTypes.Misinformation,
        },
        {
          label: 'Scam',
          value: ReportTypes.Scam,
        },
        {
          label: 'Spam',
          value: ReportTypes.Spam,
        },
        {
          label: 'Violence',
          value: ReportTypes.Violence,
        },
      ],
      defaultValue: ReportTypes.Spam,
      required: true,
    },
    {
      name: 'otherType',
      label: 'Other type',
      type: 'text',
      maxLength: 100,
    },
    {
      name: 'target',
      type: 'relationship',
      relationTo: [CollectionSlugs.comments, CollectionSlugs.reviews],
      required: true,
      index: true,
      label: 'Target',
      hasMany: false,
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

export default Reports
