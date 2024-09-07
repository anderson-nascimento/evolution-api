import { JSONSchema7 } from 'json-schema';
import { v4 } from 'uuid';

const isNotEmpty = (...propertyNames: string[]): JSONSchema7 => {
  const properties = {};
  propertyNames.forEach(
    (property) =>
      (properties[property] = {
        minLength: 1,
        description: `The "${property}" cannot be empty`,
      }),
  );
  return {
    if: {
      propertyNames: {
        enum: [...propertyNames],
      },
    },
    then: { properties },
  };
};

export const communityJidSchema: JSONSchema7 = {
  $id: v4(),
  type: 'object',
  properties: {
    communityJid: { type: 'string', pattern: '^[\\d-]+@g.us$' },
  },
  required: ['communityJid'],
  ...isNotEmpty('communityJid'),
};

export const createCommunitySchema: JSONSchema7 = {
  $id: v4(),
  type: 'object',
  properties: {
    subject: { type: 'string' },
    description: { type: 'string' },
    profilePicture: { type: 'string' },
    promoteParticipants: { type: 'boolean', enum: [true, false] },
    participants: {
      type: 'array',
      minItems: 1,
      uniqueItems: true,
      items: {
        type: 'string',
        minLength: 10,
        pattern: '\\d+',
        description: '"participants" must be an array of numeric strings',
      },
    },
  },
  required: ['subject', 'description'],
  ...isNotEmpty('subject', 'description', 'profilePicture'),
};

export const linkGroupCommunutySchema: JSONSchema7 = {
  $id: v4(),
  type: 'object',
  properties: {
    communityJid: { type: 'string' },
    subGroupJid: {
      type: 'array',
      minItems: 1,
      uniqueItems: true,
      items: {
        type: 'string',
        minLength: 10,
        pattern: '\\d+',
        description: '"participants" must be an array of numeric strings',
      },
    },
  },
  required: ['communityJid', 'subGroupJid'],
  ...isNotEmpty('communityJid', 'subGroupJid'),
};

export const unLinkGroupCommunutySchema: JSONSchema7 = {
  $id: v4(),
  type: 'object',
  properties: {
    communityJid: { type: 'string' },
    subGroupJid: { type: 'string' },
  },
  required: ['communityJid', 'subGroupJid'],
  ...isNotEmpty('communityJid', 'subGroupJid'),
};

export const updateCommunitySettingsSchema: JSONSchema7 = {
  $id: v4(),
  type: 'object',
  properties: {
    communityJid: { type: 'string' },
    action: {
      type: 'string',
      enum: ['anyone', 'admin'],
    },
  },
  required: ['communityJid', 'action'],
  ...isNotEmpty('communityJid', 'action'),
};
