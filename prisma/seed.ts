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
    data: {id: '3', username: 'Cindy', email: 'cindy@cindy.cindy', password: 'cindy@cindy.cindy', accountType: AccountType.Google },
  });

  const conversation1 = await prisma.conversation.create({
    data: {
      userId: user1.id,
      messages: {
        create: [
          {
            text: 'Hey Jane, how are you?',
            userName: user1.username,
            userId: user1.id,
          },
          {
            text: 'Hi John! I am good. How about you?',
            userName: user2.username,
            userId: user2.id,
          },
        ],
      },
    },
  });

  const conversation2 = await prisma.conversation.create({
    data: {
      userId: user2.id,
      messages: {
        create: [
          {
            text: 'Hey John, ready for the project meeting?',
            userName: user2.username,
            userId: user2.id,
          },
          {
            text: 'Yes, I am all set. Let’s do this!',
            userName: user1.username,
            userId: user1.id,
          },
        ],
      },
    },
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
