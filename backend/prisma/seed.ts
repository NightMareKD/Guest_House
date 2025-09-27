import { PrismaClient, RoomType } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@isara.com' },
    update: {},
    create: {
      email: 'admin@isara.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
    },
  });

  // Create sample rooms
  const rooms = [
    {
      name: 'Ocean Villa Suite',
      description: 'Luxurious oceanfront suite with panoramic views and private pool',
      type: RoomType.SUITE,
      price: 850,
      capacity: 4,
      amenities: ['Ocean View', 'Private Pool', 'Butler Service', 'Wine Cellar', 'Spa Access', 'Mini Bar'],
      images: [
        'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
    },
    {
      name: 'Garden Pavilion',
      description: 'Elegant garden room with marble bath and private terrace',
      type: RoomType.DOUBLE,
      price: 450,
      capacity: 2,
      amenities: ['Garden View', 'Marble Bath', 'Private Terrace', 'Mini Bar', 'Wifi', 'Coffee Machine'],
      images: [
        'https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
    },
    {
      name: 'Presidential Suite',
      description: 'Ultimate luxury with two bedrooms and private chef service',
      type: RoomType.SUITE,
      price: 1200,
      capacity: 6,
      amenities: ['Panoramic View', 'Two Bedrooms', 'Private Chef', 'Spa Access', 'Butler Service', 'Wine Cellar'],
      images: [
        'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
    },
    {
      name: 'Deluxe Single Room',
      description: 'Comfortable single room with modern amenities',
      type: RoomType.SINGLE,
      price: 250,
      capacity: 1,
      amenities: ['City View', 'Mini Bar', 'Wifi', 'Coffee Machine', 'Work Desk'],
      images: [
        'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
    },
    {
      name: 'Family Suite',
      description: 'Spacious family accommodation with connecting rooms',
      type: RoomType.FAMILY,
      price: 650,
      capacity: 5,
      amenities: ['Family Room', 'Connecting Rooms', 'Mini Bar', 'Wifi', 'Coffee Machine', 'Play Area Access'],
      images: [
        'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
    },
  ];

  for (const roomData of rooms) {
    // Check if room exists by name, if not create it
    const existingRoom = await prisma.room.findFirst({
      where: { name: roomData.name },
    });

    if (!existingRoom) {
      await prisma.room.create({
        data: roomData,
      });
    }
  }

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });