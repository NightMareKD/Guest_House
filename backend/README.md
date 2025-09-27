# ISARA Guest House - Backend API

A NestJS backend API for the ISARA Guest House Management System, built with TypeScript, Prisma ORM, and PlanetScale MySQL database.

## Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: Guest and admin user management
- **Room Management**: CRUD operations for hotel rooms
- **Booking System**: Room booking and reservation management
- **Payment Integration**: PayHere payment gateway integration
- **Database**: PlanetScale MySQL with Prisma ORM

## Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PlanetScale (MySQL)
- **ORM**: Prisma
- **Authentication**: JWT with Passport
- **Validation**: class-validator
- **Password Hashing**: bcrypt

## Getting Started

### Prerequisites

- Node.js 18+
- PlanetScale account
- PayHere merchant account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd guest-house-platform/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your configuration:
   ```env
   DATABASE_URL="mysql://username:password@host:port/database"
   JWT_SECRET="your-super-secret-jwt-key"
   FRONTEND_URL="http://localhost:3000"
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npm run prisma:generate

   # Push schema to database
   npm run prisma:push

   # Seed the database
   npm run prisma:seed
   ```

5. **Start the development server**
   ```bash
   npm run start:dev
   ```

The API will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh JWT token
- `POST /auth/logout` - User logout

### Rooms
- `GET /rooms` - Get all available rooms
- `GET /rooms/:id` - Get room details

### Users (Protected)
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile

### Admin Endpoints (Admin role required)
- `GET /admin/users` - List all users
- `GET /admin/bookings` - List all bookings
- `POST /admin/rooms` - Create new room
- `PUT /admin/rooms/:id` - Update room
- `DELETE /admin/rooms/:id` - Delete room

## Database Schema

The application uses the following main entities:

- **User**: Guest and admin users
- **Room**: Hotel room information
- **Booking**: Room reservations
- **Payment**: Payment transactions

See `prisma/schema.prisma` for the complete database schema.

## Scripts

- `npm run start:dev` - Start development server
- `npm run build` - Build for production
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:push` - Push schema changes to database
- `npm run prisma:seed` - Seed database with initial data
- `npm run test` - Run tests

## Project Structure

```
src/
├── auth/                 # Authentication module
├── users/                # User management
├── rooms/                # Room management
├── bookings/             # Booking system
├── payments/             # Payment processing
├── common/               # Shared utilities
│   ├── guards/          # Auth guards
│   ├── decorators/      # Custom decorators
│   ├── prisma.service.ts # Database service
│   └── jwt.strategy.ts  # JWT strategy
├── config/              # Configuration files
└── main.ts              # Application entry point

prisma/
├── schema.prisma        # Database schema
└── seed.ts             # Database seeding
```

## Deployment

The backend is configured for deployment to Railway or Render with the following considerations:

- Environment variables for database connection
- CORS configuration for frontend domain
- Production builds with `npm run build`

## Contributing

1. Follow the existing code structure
2. Add proper validation and error handling
3. Update tests for new features
4. Ensure all endpoints are properly documented

## License

This project is part of the ISARA Guest House Management System.
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
