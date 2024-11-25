import { filterPostRoles } from "@/helper/post";
import { AccountType, Gender, Mood } from "@/types";
import { PrismaClient } from "@prisma/client";
// import { PrismaClient } from "../../node_modules/.prisma/client";

const prisma = new PrismaClient();

async function main() {

  const user1 = await prisma.user.create({
    data: {
      id: '1',
      publicId: '4653f404-a121-11ef-b864-0242ac120002',
      username: 'Alice',
      email: 'alice@alice.alice',
      password: 'alice@alice.alice',
      accountType: AccountType.Email,
    }
  });

  const user2 = await prisma.user.create({
    data: {id: '2', publicId: '2ff449e8-a121-11ef-b864-0242ac120002', username: 'Bob', email: 'bob@bob.bob', password: 'bob@bob.bob', accountType: AccountType.Email },
  });

  const user3 = await prisma.user.create({
    data: {id: '3', publicId: '599080aa-a121-11ef-b864-0242ac120002', username: 'Cindy', email: 'cindy@cindy.cindy', password: 'cindy@cindy.cindy', accountType: AccountType.Google },
  });

  await prisma.filters.createMany({
    data: [
      {
        id: 1,
        userId: "1",
      },
      {
        id: 2,
        userId: "2",
      },
    ]
  })

  await prisma.filterableUserAttributes.createMany({
    data: [
      {
        userId: "1", 
        age: 80,
        gender: Gender.Female
      },
      {
        filtersId: 2,
        age: 80,
        gender: Gender.Female
      },
      {
        userId: "2", 
        age: 39,
        gender: Gender.Male
      },
      {
        userId: "3", 
        age: 45,
        gender: Gender.NonBinary
      },
    ]
  })

  // Create some conversations
  const conversation1 = await prisma.conversation.create({
    data: {},
  });

  const conversation2 = await prisma.conversation.create({
    data: {},
  });

  // Add users to conversations
  await prisma.userConversation.create({
    data: {
      userId: user1.id,
      conversationId: conversation1.id,
    },
  });

  await prisma.userConversation.create({
    data: {
      userId: user2.id,
      conversationId: conversation1.id,
    },
  });

  await prisma.userConversation.create({
    data: {
      userId: user1.id,
      conversationId: conversation2.id,
    },
  });

  await prisma.userConversation.create({
    data: {
      userId: user3.id,
      conversationId: conversation2.id,
    },
  });

  // Add some messages
  await prisma.message.create({
    data: {
      content: 'Hello, how are you?',
      senderId: user1.id,
      conversationId: conversation1.id,
    },
  });

  await prisma.message.create({
    data: {
      content: 'I\'m doing great, thanks for asking!',
      senderId: user2.id,
      conversationId: conversation1.id,
    },
  });

  await prisma.message.create({
    data: {
      content: 'Hey, what\'s up?',
      senderId: user1.id,
      conversationId: conversation2.id,
    },
  });

  await prisma.message.create({
    data: {
      content: 'Not much, just hanging out.',
      senderId: user3.id,
      conversationId: conversation2.id,
    },
  });

  // const filterableUserAttributes = [
  //   {
  //     userId: '1',
  //     description: 'Enthusiastic software engineer',
  //     age: 25,
  //     gender: 'Male',
  //     help: 'need with with coding issue'
  //   },
  //   {
  //     userId: '2',
  //     description: 'Creative graphic designer',
  //     age: 29,
  //     gender: 'Female',
  //     collaboration: 'work on a project together'
  //   },
  //   {
  //     userId: '3',
  //     description: 'Passionate data scientist',
  //     age: 32,
  //     gender: 'Non-binary',
  //   },
  // ];

  // for (const attributes of filterableUserAttributes) {
  //   await prisma.filterableUserAttributes.create({
  //     data: attributes,
  //   });
  // }


  await prisma.post.createMany({
    data: [
      {
        id: 1,
        userId: '1',
        title: 'tech opportunities',
        description: "Exploring new opportunities in tech.",
      },
      {
        id: 2,
        userId: '1',
        title: 'Web3 projects',
        description: "Excited about Web3 projects.",

      },
      {
        id: 3,
        userId: '2',
        title: 'teach programming',
      },
      {
        id: 4,
        userId: '3',
        title: 'founder',
        description: "Sharing my journey as a startup founder.",
      },
    ],
  });


  await prisma.filterablePostAttributes.createMany({
    data: [
      {
        postId: 1, 
        mood: Mood.Angry,
        postFilterQueryRole: filterPostRoles.PROVIDER,
        postFilterDisplay: 'work > Manufacturing, Service > 50-75k'
      },
      {
        filtersId: 2, 
        mood: Mood.Angry,
        postFilterQueryRole: filterPostRoles.PROVIDER,
        postFilterDisplay: 'work > Manufacturing, Service > 50-75k'
      },
      {
        postId: 2,
        mood: Mood.Desperate,
        postFilterQueryRole: filterPostRoles.BOTH,
        postFilterDisplay: 'personals > Friends > Female'
      },
      {
        postId: 3,
        mood: Mood.Happy,
        postFilterQueryRole: filterPostRoles.BOTH,
        postFilterDisplay: 'personals > Casual, Friends, Relationship > Female, Male, nonBinary'
      },
      {
        postId: 4,
        mood: Mood.Surprised,
        postFilterQueryRole: filterPostRoles.SEEKER,
        postFilterDisplay: 'work > Accounting, Manufacturing, Service, Tech > over 100k'
      },
    ]
  })
}




main()
  .then(() => {
    console.log('Data seeded successfully');
  })
  .catch((error) => {
    console.error('Error seeding data:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
