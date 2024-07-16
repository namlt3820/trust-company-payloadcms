import { CompanyTypes } from '@/constants/CompanyTypes'
import { NumberOfEmployees } from '@/constants/NumberOfEmployees'
import { notifyAdmin } from '@/hooks/notifyAdmin'
import { checkSchema } from '@/utilities/validateWithJoi'
import joi from 'joi'
import { CollectionConfig } from 'payload/types'
import { CollectionSlugs } from './CollectionSlugs'

const Companies: CollectionConfig = {
  slug: CollectionSlugs.companies,
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      maxLength: 150,
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'address',
      type: 'text',
      maxLength: 200,
      required: true,
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'numberOfEmployees',
      type: 'select',
      defaultValue: NumberOfEmployees.below_100,
      options: [
        {
          value: NumberOfEmployees.below_100,
          label: 'Below 100',
        },
        {
          value: NumberOfEmployees.between_100_and_500,
          label: 'Between 100 and 500',
        },
        {
          value: NumberOfEmployees.between_500_and_1000,
          label: 'Between 500 and 1000',
        },
        {
          value: NumberOfEmployees.above_1000,
          label: 'Above 1000',
        },
      ],
      required: true,
    },
    {
      name: 'companyType',
      type: 'select',
      defaultValue: CompanyTypes.outsource,
      options: [
        {
          label: 'Outsource',
          value: CompanyTypes.outsource,
        },
        {
          label: 'Product',
          value: CompanyTypes.product,
        },
        {
          label: 'Both',
          value: CompanyTypes.both,
        },
      ],
      required: true,
      index: true,
    },
    {
      name: 'website',
      type: 'text',
      validate: (val) =>
        checkSchema(val, joi.string().uri().optional().allow('')),
      maxLength: 150,
    },
  ],
  access: {
    read: ({ req }) => {
      if (!req.user || req.user.collection !== CollectionSlugs.admins) {
        return {
          _status: {
            equals: 'published',
          },
        }
      }

      return true
    },
    create: () => true,
  },
  versions: {
    drafts: true,
    maxPerDoc: 10,
  },
  hooks: {
    afterChange: [notifyAdmin],
  },
}

export default Companies
