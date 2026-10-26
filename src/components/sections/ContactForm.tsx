"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, User, Mail, Phone, Building2, Send, Check } from "lucide-react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { sendContactEmailAction } from "@/app/actions/sendEmail";
import { cn } from "@/lib/utils";

// Package links preselect these by id (see the services field in src/data/pricing.ts)
const SERVICES = [
	{ id: "Answering & Lead Capture", label: "Answering & Lead Capture" },
	{ id: "SEO", label: "SEO" },
	{ id: "Web Development", label: "Web Development" },
	{ id: "Social Media", label: "Social Media" },
	{ id: "PPC", label: "PPC" },
	{ id: "Content Marketing", label: "Content Marketing" },
	{ id: "Local SEO / GMB", label: "Local SEO / GMB" },
];

const contactSchema = z.object({
	fullName: z.string().min(2, "Please enter your full name."),
	email: z.string().email("Please enter a valid email address."),
	phone: z.string().optional(),
	company: z.string().optional(),
	message: z.string().min(10, "Please enter at least 10 characters."),
	interestedIn: z.array(z.string()).optional(),
	fax: z.string().optional(), // Honeypot field
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm({ defaultServices = [], defaultMessage = "", messagePlaceholder = "Tell us a bit about your goals..." }: { defaultServices?: string[]; defaultMessage?: string; messagePlaceholder?: string } = {}) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const form = useForm<ContactFormValues>({
		resolver: zodResolver(contactSchema),
		defaultValues: {
			fullName: "",
			email: "",
			phone: "",
			company: "",
			message: defaultMessage,
			// Only ids that have a button, so nothing is submitted that the visitor can't see or unselect
			interestedIn: defaultServices.filter((id) => SERVICES.some((service) => service.id === id)),
			fax: "",
		},
	});

	async function onSubmit(values: ContactFormValues) {
		setIsSubmitting(true);
		try {
			const result = await sendContactEmailAction(values);

			if (result.success) {
				setIsSuccess(true);
				form.reset();
			} else {
				throw new Error(result.error);
			}
		} catch (error) {
			toast({
				title: "Something went wrong",
				description: "We couldn't send your message. Please try again shortly.",
				variant: "destructive",
			});
		} finally {
			setIsSubmitting(false);
		}
	}

	if (isSuccess) {
		return (
			<Card className="rounded-2xl border-border bg-card text-center py-12 animate-in fade-in zoom-in duration-500">
				<CardContent className="space-y-6 flex flex-col items-center justify-center">
					<div className="w-16 h-16 rounded-2xl border border-border bg-background flex items-center justify-center">
						<CheckCircle2 className="w-8 h-8 text-accent-cyan" />
					</div>
					<div className="space-y-2">
						<h3 className="text-2xl font-semibold tracking-tight">Message sent</h3>
						<p className="text-muted-foreground max-w-md mx-auto">
							Thank you for reaching out. Our team will review your details and get back to you within 1 business day.
						</p>
					</div>
					<Button onClick={() => setIsSuccess(false)} variant="outline" className="mt-4">
						Send another message
					</Button>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="rounded-2xl border-border bg-card">
			<CardHeader>
				<CardTitle className="text-2xl font-semibold tracking-tight">Send us a message</CardTitle>
				<CardDescription>Fill in the form and our team will contact you shortly.</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						
						{/* Honeypot field - visually hidden */}
						<FormField
							control={form.control}
							name="fax"
							render={({ field }) => (
								<FormItem className="hidden absolute opacity-0 -z-50 h-0 w-0 overflow-hidden" aria-hidden="true">
									<FormControl>
										<Input tabIndex={-1} autoComplete="off" placeholder="Fax Number" {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						{/* Services Selection */}
						<FormField
							control={form.control}
							name="interestedIn"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-base">What are you interested in?</FormLabel>
									<FormControl>
										<div className="flex flex-wrap gap-2 pt-2">
											{SERVICES.map((service) => {
												const isSelected = field.value?.includes(service.id);
												return (
													<button
														type="button"
														key={service.id}
														aria-pressed={isSelected}
														onClick={() => {
															const current = new Set(field.value || []);
															if (isSelected) {
																current.delete(service.id);
															} else {
																current.add(service.id);
															}
															field.onChange(Array.from(current));
														}}
														className={cn(
															"px-4 py-2 rounded-full text-sm font-medium transition-colors border flex items-center gap-2",
															isSelected
																? "border-accent-cyan bg-accent-cyan/10 text-accent-cyan"
																: "bg-background text-muted-foreground border-border hover:border-muted-foreground/40 hover:text-foreground"
														)}
													>
														{isSelected && <Check className="w-3.5 h-3.5 animate-in zoom-in" />}
														{service.label}
													</button>
												);
											})}
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<FormField
								control={form.control}
								name="fullName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Full name</FormLabel>
										<FormControl>
											<div className="relative group">
												<User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-brand" />
												<Input className="pl-10" placeholder="Jane Doe" {...field} />
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<div className="relative group">
												<Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-brand" />
												<Input className="pl-10" type="email" placeholder="you@company.com" {...field} />
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="phone"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Phone (optional)</FormLabel>
										<FormControl>
											<div className="relative group">
												<Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-brand" />
												<Input className="pl-10" type="tel" placeholder="(555) 000-0000" {...field} />
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="company"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Company (optional)</FormLabel>
										<FormControl>
											<div className="relative group">
												<Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-brand" />
												<Input className="pl-10" placeholder="Acme Inc." {...field} />
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name="message"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Your message</FormLabel>
									<FormControl>
										<Textarea className="resize-none" rows={5} placeholder={messagePlaceholder} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex items-center justify-between gap-4 pt-4 border-t border-border">
							<p className="text-sm text-muted-foreground hidden sm:block">Secured and encrypted.</p>
							<Button type="submit" disabled={isSubmitting} className="h-12 w-full rounded-xl px-6 text-base font-semibold sm:w-auto">
								{isSubmitting ? "Sending..." : "Send message"}
								{!isSubmitting && <Send className="h-4 w-4" />}
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
