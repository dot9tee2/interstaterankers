"use server";

import { Resend } from "resend";

// I should define the type here or in a separate types file.
export type ContactFormValues = {
	fullName: string;
	email: string;
	phone?: string;
	company?: string;
	message: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmailAction(values: any) {
	if (!process.env.RESEND_API_KEY) {
		console.warn("RESEND_API_KEY is not configured. Simulating email send for demo purposes.");
		await new Promise((resolve) => setTimeout(resolve, 500));
		return { success: true, demo: true };
	}

	try {
		const { fullName, email, phone, company, message, interestedIn } = values;

		const { data, error } = await resend.emails.send({
			from: "Contact Form <siteform@mail.interstaterankers.com>",
			to: "info@interstaterankers.com",
			subject: `New Contact Form Submission from ${fullName}`,
			html: `
				<h2>New Contact Form Submission</h2>
				<p><strong>Name:</strong> ${fullName}</p>
				<p><strong>Email:</strong> ${email}</p>
				<p><strong>Phone:</strong> ${phone || "N/A"}</p>
				<p><strong>Company:</strong> ${company || "N/A"}</p>
				<p><strong>Interested In:</strong> ${interestedIn && interestedIn.length > 0 ? interestedIn.join(", ") : "N/A"}</p>
				<p><strong>Message:</strong></p>
				<p>${message}</p>
			`,
		});

		if (error) {
			console.error("Resend error (admin):", error);
			return { success: false, error: error.message };
		}

		// Send auto-reply to the user
		const { error: autoReplyError } = await resend.emails.send({
			from: "Interstate Rankers <siteform@mail.interstaterankers.com>",
			to: email,
			subject: "Thank you for contacting Interstate Rankers",
			html: `
				<p>Hi ${fullName},</p>
				<p>Thank you for reaching out to us. We have received your message and our team will get back to you shortly.</p>
				<p><strong>Your Message:</strong></p>
				<blockquote style="border-left: 4px solid #eee; padding-left: 10px; color: #555;">${message}</blockquote>
				<br/>
				<p>Best regards,</p>
				<p>The Interstate Rankers Team</p>
			`,
		});

		if (autoReplyError) {
			console.error("Resend error (auto-reply):", autoReplyError);
			// Not failing the entire submission if the auto-reply fails
		}

		return { success: true, data };
	} catch (error) {
		console.error("Error sending email:", error);
		return { success: false, error: "Failed to send email" };
	}
}
