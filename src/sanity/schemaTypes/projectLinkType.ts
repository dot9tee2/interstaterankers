import { type SchemaTypeDefinition } from 'sanity'

export const projectLinkType: SchemaTypeDefinition = {
  name: 'projectLink',
  title: 'Project Link',
  type: 'object',
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.required().uri({ allowRelative: false }),
    },
  ],
}


