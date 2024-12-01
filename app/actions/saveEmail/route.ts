import { NextResponse } from "next/server";
import AWS from "aws-sdk";
import connectDB from "@/lib/mongodb";
import User, { IUser } from "@/models/user";

const region = process.env.AWS_REGION || "";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID || "";
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || "";
const sourceEmail = process.env.SES_SOURCE_EMAIL || ""; // Your verified SES email address

if (!region || !accessKeyId || !secretAccessKey || !sourceEmail) {
  throw new Error(
    "Missing AWS SES configuration in environment variables. Please check AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and SES_SOURCE_EMAIL."
  );
}

// Configure AWS SES
const ses = new AWS.SES({
  region,
  accessKeyId,
  secretAccessKey,
});

export async function POST(req: Request) {
  try {
    await connectDB();

    const { name, email }: { name: string; email: string } = await req.json();

    // Validate input
    if (!name || !email) {
      return NextResponse.json(
        { message: "Name and email are required." },
        { status: 400 }
      );
    }

    // Save to MongoDB
    const newUser: IUser = new User({ name, email });
    await newUser.save();

    // Send acknowledgment email
    const params = {
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Text: {
            Charset: "UTF-8",
            Data: `Hello ${name},\n\nThank you for joining our waitlist! We'll keep you updated.\n\nBest regards,\nYour Team`,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "Waitlist Confirmation",
        },
      },
      Source: sourceEmail,
    };

    await ses.sendEmail(params).promise();

    return NextResponse.json(
      { message: "Successfully added to the waitlist and email sent." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Failed to process your request." },
      { status: 500 }
    );
  }
}
