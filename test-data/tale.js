const date = new Date().toISOString()
const tale = [
  {
    entityId: '1',
    createdBy: 'abc',
    createdDate: date,
    status: 'ACTIVE',
    title: 'test title',
    description: 'test desc',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1541410965313-d53b3c16ef17?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    expectedStoryCount: 3,
    currentStoryCount: 3,
    saved: true,
    tags: ['test', 'test'],
    user: {
      entityId: '1',
      createdBy: 'abc',
      createdDate: date,
      status: 'ACTIVE',
      userId: 'a',
      email: 'test1@gmail.com',
      name: 'test',
      tagline: 'test tagline',
      bio: 'test bio',
      profileImageUrl:
        'https://images.unsplash.com/photo-1541410965313-d53b3c16ef17?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
  },
  {
    entityId: '2',
    createdBy: 'abc',
    createdDate: date,
    status: 'ACTIVE',
    title: 'test title',
    description: 'test desc',
    thumbnailUrl:
      'https://images.rawpixel.com/image_1000/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3NrOTc5MS1pbWFnZS1rd3Z1amE5Ni5qcGc.jpg',
    expectedStoryCount: 3,
    currentStoryCount: 3,
    user: {
      entityId: '1',
      createdBy: 'abc',
      createdDate: date,
      status: 'ACTIVE',
      userId: 'a',
      email: 'test1@gmail.com',
      name: 'test',
      tagline: 'test tagline',
      bio: 'test bio',
      profileImageUrl:
        'https://images.unsplash.com/photo-1541410965313-d53b3c16ef17?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
  },
  {
    entityId: '3',
    createdBy: 'abc',
    createdDate: date,
    status: 'ACTIVE',
    title: 'test title',
    thumbnailUrl:
      'https://images.rawpixel.com/image_1000/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3NrOTc5MS1pbWFnZS1rd3Z1amE5Ni5qcGc.jpg',
    expectedStoryCount: 3,
    currentStoryCount: 3,
    description: 'test desc',
    saved: true,
    user: {
      entityId: '1',
      createdBy: 'abc',
      createdDate: date,
      status: 'ACTIVE',
      userId: 'a',
      email: 'test1@gmail.com',
      name: 'test',
      tagline: 'test tagline',
      bio: 'test bio',
      profileImageUrl:
        'https://images.unsplash.com/photo-1541410965313-d53b3c16ef17?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
  },
  {
    entityId: '4',
    createdBy: 'abc',
    createdDate: date,
    status: 'ACTIVE',
    title: 'test title',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1541410965313-d53b3c16ef17?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    expectedStoryCount: 3,
    currentStoryCount: 3,
    description: 'test desc',
    user: {
      entityId: '1',
      createdBy: 'abc',
      createdDate: date,
      status: 'ACTIVE',
      userId: 'a',
      email: 'test1@gmail.com',
      name: 'test',
      tagline: 'test tagline',
      bio: 'test bio',
      profileImageUrl:
        'https://images.unsplash.com/photo-1541410965313-d53b3c16ef17?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
  },
  {
    entityId: '5',
    createdBy: 'abc',
    createdDate: date,
    status: 'ACTIVE',
    title: 'test title',
    thumbnailUrl:
      'https://images.rawpixel.com/image_1000/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3NrOTc5MS1pbWFnZS1rd3Z1amE5Ni5qcGc.jpg',
    expectedStoryCount: 3,
    currentStoryCount: 3,
    description: 'test desc',
    saved: true,
    user: {
      entityId: '1',
      createdBy: 'abc',
      createdDate: date,
      status: 'ACTIVE',
      userId: 'a',
      email: 'test1@gmail.com',
      name: 'test',
      tagline: 'test tagline',
      bio: 'test bio',
      profileImageUrl:
        'https://images.unsplash.com/photo-1541410965313-d53b3c16ef17?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
  }
]

export default tale
