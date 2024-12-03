import { filterPostRoles } from "@/helper/post";
import { AccountType, Gender, Mood } from "@/types";
import { PrismaClient } from "@prisma/client";
// import { PrismaClient } from "../../node_modules/.prisma/client";

const prisma = new PrismaClient();

async function main() {

  const user1 = await prisma.user.create({
    data: {
      id: '1',
      username: 'Alice',
      email: 'alice@alice.alice',
      password: 'alice@alice.alice',
      accountType: AccountType.Email,
    }
  });

  const user2 = await prisma.user.create({
    data: {id: '2', username: 'Bob', email: 'bob@bob.bob', password: 'bob@bob.bob', accountType: AccountType.Email },
  });

  const user3 = await prisma.user.create({
    data: {id: '3', username: 'Cindy', email: 'cindy@cindy.cindy', password: 'cindy@cindy.cindy', accountType: AccountType.Email },
  });

  const user4 = await prisma.user.create({
    data: {id: '4', username: 'Dave', email: 'dave@dave.dave', password: 'dave@dave.dave', accountType: AccountType.Email },
  });

  await prisma.group.create({
    data: {
      name: 'group alice, cindy',
      userId: '2',
      userGroups: {
        create: [
          { userId: user1.id },
          { userId: user3.id }
        ]
      }
    }
  })

  await prisma.group.create({
    data: {
      name: 'group empty',
      userId: '2',
    }
  })

  await prisma.group.create({
    data: {
      name: 'group bob, cindy',
      userId: '1',
      userGroups: {
        create: [
          { userId: user2.id },
          { userId: user3.id }
        ]
      }
    }
  })

  await prisma.group.create({
    data: {
      name: 'group bob, alice',
      userId: '3',
      userGroups: {
        create: [
          { userId: user1.id },
          { userId: user2.id }
        ]
      }
    }
  })
 
  const chat1 = await prisma.chat.create({
    data: {
      // userId: user1.id,
      name: 'John and Jane Chat',
      userChats: {
        create: [
          { userId: user1.id },
          { userId: user2.id }
        ]
      }
    }
  })

  // Create messages for chat1
  await prisma.message.createMany({
    data: [
      {
        text: 'Hey Jane, how are you?',
        userId: user1.id,
        userName: user1.username,
        chatId: chat1.id,
      },
      {
        text: 'Hi John, I\'m good! How about you?',
        userId: user2.id,
        userName: user2.username,
        chatId: chat1.id,
      }
    ]
  })

  // Conversation 2: Between user 1 and user 3
  const chat2 = await prisma.chat.create({
    data: {
      // userId: user1.id,
      name: 'John and Bob Chat',
      userChats: {
        create: [
          { userId: user1.id },
          { userId: user3.id }
        ]
      }
    }
  })

  // Create messages for chat2
  await prisma.message.createMany({
    data: [
      {
        text: 'Hey Bob, what\'s up?',
        userId: user1.id,
        userName: user1.username,
        chatId: chat2.id,
      },
      {
        text: 'Not much, John. Just working on some projects.',
        userId: user3.id,
        userName: user3.username,
        chatId: chat2.id,
      }
    ]
  })

  // Conversation 3: Between user 2 and user 3
  const chat3 = await prisma.chat.create({
    data: {
      // userId: user2.id,
      name: 'Jane and Bob Chat',
      userChats: {
        create: [
          { userId: user2.id },
          { userId: user3.id }
        ]
      }
    }
  })

  // Create messages for chat3
  await prisma.message.createMany({
    data: [
      {
        text: 'Hi Bob, do you want to collaborate on a project?',
        userId: user2.id,
        userName: user2.username,
        chatId: chat3.id,
      },
      {
        text: 'Sure, Jane! What did you have in mind?',
        userId: user3.id,
        userName: user3.username,
        chatId: chat3.id,
      }
    ]
  })

  // Conversation 4: Between user 1, user 2, and user 3
  const chat4 = await prisma.chat.create({
    data: {
      // userId: user1.id,
      name: 'Group Chat',
      userChats: {
        create: [
          { userId: user1.id },
          { userId: user2.id },
          { userId: user3.id }
        ]
      }
    }
  })

  // Create messages for chat4
  await prisma.message.createMany({
    data: [
      {
        text: 'Hey everyone, let\'s have a group discussion!',
        userId: user1.id,
        userName: user1.username,
        chatId: chat4.id,
      },
      {
        text: 'Great idea, John!',
        userId: user2.id,
        userName: user2.username,
        chatId: chat4.id,
      },
      {
        text: 'Count me in!',
        userId: user3.id,
        userName: user3.username,
        chatId: chat4.id,
      }
    ]
  })
  

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
      {
        userId: "4", 
        age: 65,
        gender: Gender.Male
      },
    ]
  })

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
        postFilterDisplay: 'work > Manufacturing, Service > 50-75k',
      },
      {
        filtersId: 2, 
        mood: Mood.Angry,
        postFilterQueryRole: filterPostRoles.PROVIDER,
        postFilterDisplay: 'work > Manufacturing, Service > 50-75k',
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
