# Waitlist Signup Template

## Overview
This is an open-source waitlist signup template built using Next.js 14 with the App Router. It includes a simple landing page with a waitlist form that collects user details (name and email) and stores them in a MongoDB database. Additionally, it sends a confirmation email to users via AWS SES upon successful signup. This template is ideal for businesses, startups, and developers looking to build an email collection system, manage email submissions, and automate email marketing campaigns.

## Features
- **Next.js 14 with App Router** for modern React development.
- **Server Actions** for seamless form submission and database updates.
- **MongoDB Integration** to securely store waitlist signups.
- **AWS SES Integration** for automated email confirmations.
- **Tailwind CSS** for a sleek and responsive UI.
- **Dark Mode Support** using Next.js built-in features.
- **Efficient Email Collection** with secure database storage.
- **Automated Email Sending** for user notifications and follow-ups.

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

## Usage
### Submitting the Waitlist Form
Users enter their name and email, which gets securely saved to the database and triggers an automated email confirmation via AWS SES. This system is perfect for capturing leads, managing email subscriptions, and streamlining email marketing campaigns.

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

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---
Made with ❤️ by Ritwik (https://github.com/spikeyrock)