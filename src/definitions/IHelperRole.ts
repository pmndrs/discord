export enum HELPER_ROLE_CATEGORY {
  GENERAL = 'GENERAL',
  LIBRARIES = 'LIBRARIES',
  LIBRARIES_3D = 'LIBRARIES_3D',
}

export interface IHelperRole {
  uid: string
  name: string
  category: HELPER_ROLE_CATEGORY
}
