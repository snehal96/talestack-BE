const userInfo = {
  entityId: '1',
  createdBy: 'abc',
  createdDate: new Date().toISOString(),
  status: 'ACTIVE',
  email: 'test1@gmail.com',
  name: 'test',
  tagline: 'test tagline',
  bio: 'test bio',
  profileImageUrl:
    'https://images.unsplash.com/photo-1541410965313-d53b3c16ef17?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  followers: 100,
  following: 100,
  tales: 10,
  isFollowing: false
}

const userInfoList = [
  {
    entityId: '1',
    createdBy: 'abc',
    createdDate: new Date().toISOString(),
    status: 'ACTIVE',
    userId: 'a',
    email: 'test1@gmail.com',
    name: 'test',
    tagline: 'test tagline',
    bio: 'test bio',
    profileImageUrl:
      'https://images.unsplash.com/photo-1541410965313-d53b3c16ef17?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    entityId: '2',
    createdBy: 'abc',
    createdDate: new Date().toISOString(),
    status: 'ACTIVE',
    userId: 'b',
    email: 'test1@gmail.com',
    name: 'test',
    tagline: 'test tagline',
    bio: 'test bio',
    profileImageUrl:
      'https://images.unsplash.com/photo-1541410965313-d53b3c16ef17?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    entityId: '3',
    createdBy: 'abc',
    createdDate: new Date().toISOString(),
    status: 'ACTIVE',
    userId: 'c',
    email: 'test1@gmail.com',
    name: 'test',
    tagline: 'test tagline',
    bio: 'test bio',
    profileImageUrl:
      'https://images.unsplash.com/photo-1541410965313-d53b3c16ef17?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
]

export default {
  userInfo,
  userInfoList
}
