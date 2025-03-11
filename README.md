# Waitlist Signup Template

## Overview
This is an open-source waitlist signup template built using Next.js 14 with the App Router. It includes a simple landing page with a waitlist form that collects user details (name and email) and stores them in a MongoDB database. Additionally, it sends a confirmation email to users via AWS SES upon successful signup.

## Features
- **Next.js 14 with App Router** for modern React development.
- **Server Actions** for seamless form submission.
- **MongoDB Integration** to store waitlist signups.
- **AWS SES Integration** for email notifications.
- **Tailwind CSS** for a clean and responsive UI.
- **Dark Mode Support** using Next.js built-in features.

## Technologies Used
- **Next.js 14**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **MongoDB**
- **Mongoose**
- **AWS SES (Simple Email Service)**

## Installation
### Prerequisites
- Node.js (>=16.x)
- MongoDB instance (local or cloud-based like MongoDB Atlas)
- AWS account with SES configured

### Clone the Repository
```bash
$ git clone https://github.com/spikeyrock/waitlist-template.git
$ cd waitlist-template
```

### Install Dependencies
```bash
$ npm install
```

### Environment Variables
Create a `.env.local` file in the root directory and add the following:
```env
MONGODB_URI=your_mongodb_connection_string
AWS_REGION=your_aws_region
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
SES_SOURCE_EMAIL=your_verified_ses_email
```

### Running the Application
```bash
$ npm run dev
```
The application will be available at `http://localhost:3000`

## File Structure
```
waitlist-template/
│── components/
│   ├── Waitlist.tsx   # Waitlist signup form
│── pages/
│   ├── index.tsx      # Home page
│── lib/
│   ├── mongodb.ts     # Database connection
│── models/
│   ├── User.ts        # Mongoose user model
│── actions/
│   ├── addToWaitlist.ts  # Server action for handling form submission
│── styles/
│   ├── globals.css    # Global styles
│── public/fonts/      # Custom fonts (Geist Sans & Geist Mono)
│── .env.local.example # Example environment variables
│── README.md          # Project documentation
│── next.config.js     # Next.js configuration
│── package.json       # Dependencies and scripts
│── tsconfig.json      # TypeScript configuration
```

## Usage
### Submitting the Waitlist Form
Users enter their name and email, which gets saved to the database and triggers an email confirmation via AWS SES.

### MongoDB Schema
The User model is defined as:
```ts
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  createdAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
```

## Deployment
### Deploy to Vercel
```bash
$ vercel
```

### Deploy to AWS EC2
1. Build the application:
```bash
$ npm run build
```
2. Start the server:
```bash
$ npm start
```

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to your branch (`git push origin feature-branch`)
5. Open a pull request

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact
For questions or issues, please open an issue on GitHub or contact `your@email.com`.

---
Made with ❤️ by Ritwik (https://github.com/spikeyrock)

