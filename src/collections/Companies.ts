import { CompanyTypes } from '@/constants/CompanyTypes'
import { NumberOfEmployees } from '@/constants/NumberOfEmployees'
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
          value: NumberOfEmployees.above_500,
          label: 'Above 500',
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
    },
    {
      name: 'website',
      type: 'text',
      validate: (val) => checkSchema(val, joi.string().uri()),
    },
  ],
  access: {
    read: () => true,
  },
}

export default Companies
