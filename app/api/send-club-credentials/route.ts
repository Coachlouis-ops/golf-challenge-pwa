import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const {
      clubName,
      email,
      password,
    } = await req.json();

    const apiKey =
      process.env.RESEND_API_KEY;

    const { Resend } =
      await import("resend");

    const resend =
      new Resend(apiKey);

    await resend.emails.send({

      from:
        "Teez Golf Challenges <noreply@teezgolfchallenges.com>",

      to: [email],

      subject:
        "Your Teez Scoring Club Credentials",

      html: `

        <h2>${clubName}</h2>

        <p>
          Your club scoring system has been activated.
        </p>

        <p>
          <strong>Username:</strong>
          ${email}
        </p>

        <p>
          <strong>Password:</strong>
          ${password}
        </p>

        <p>
          <strong>Login:</strong>
        </p>

        <p>
          https://www.teezgolfchallenges.com/teez-scoring/login
        </p>

      `,

    });

    return NextResponse.json({
      success: true,
    });

  } catch (err) {

    console.error(err);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}