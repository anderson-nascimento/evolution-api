export class CreateCommunityDto {
  subject: string;
  description: string;
}

export class LinkGroupToCommunityDto {
  communityJid: string;
  subGroupJid: string[];
}

export class UnLinkGroupToCommunityDto {
  communityJid: string;
  subGroupJid: string;
}

export class CommunityJid {
  communityJid: string;
}

export class CommunitySettingUpdateDto extends CommunityJid {
  action: 'anyone' | 'admin';
}
