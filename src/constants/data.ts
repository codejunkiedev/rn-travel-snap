import { IPost } from '@/interfaces';

export const PROFILE_SCREEN_DATA: IPost[] = Array.from({ length: 50 }, (_, i) => ({
  content: `This is post ${i + 1}`,
  imageURL: `https://loremflickr.com/${360 + i * 10}/${360 + i * 10}`,
  userId:`user${i + 1}`,
  user: {
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    profilePicURL: `https://loremflickr.com/${100 + i * 10}/${100 + i * 10}`,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    uid: `user${i + 1}`,
  },
  createdAt: Date.now(),
  updatedAt: Date.now(),
  uid: `post${i + 1}`,
  id: `post${i + 1}`,

}));
