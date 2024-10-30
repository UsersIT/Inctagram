// UserProfileInfo.stories.tsx

import React from 'react'

import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Props, UserProfileInfo } from './UserProfileInfo'

export default {
  component: UserProfileInfo,
  title: 'UserProfileInfo',
} as ComponentMeta<typeof UserProfileInfo>

const Template: ComponentStory<typeof UserProfileInfo> = args => <UserProfileInfo {...args} />

export const Default: ComponentStory<typeof UserProfileInfo> = Template.bind({})
Default.args = {
  userData: {
    aboutMe:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    avatar: 'https://example.com/avatar.jpg',
    username: 'JohnDoe',
  },
}

export const MyProfile: ComponentStory<typeof UserProfileInfo> = Template.bind({})
MyProfile.args = {
  myProfile: true,
  ownerId: 123,
  userData: {
    aboutMe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    avatar: 'https://example.com/avatar.jpg',
    username: 'JaneDoe',
  },
}
