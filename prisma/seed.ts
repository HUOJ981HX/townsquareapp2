import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  const user1 = await prisma.user.create({
    data: { publicId: '4653f404-a121-11ef-b864-0242ac120002', username: 'Alice', email: 'alice@alice.alice', password: 'alice@alice.alice' }
  });

  const user2 = await prisma.user.create({
    data: { publicId: '2ff449e8-a121-11ef-b864-0242ac120002', username: 'Bob', email: 'bob@bob.bob', password: 'bob@bob.bob' },
  });

  const user3 = await prisma.user.create({
    data: { publicId: '599080aa-a121-11ef-b864-0242ac120002', username: 'Cindy', email: 'cindy@cindy.cindy', password: 'cindy@cindy.cindy' },
  });

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
