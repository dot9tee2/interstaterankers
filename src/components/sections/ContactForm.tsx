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

const SERVICES = [
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
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const form = useForm<ContactFormValues>({
		resolver: zodResolver(contactSchema),
		defaultValues: {
			fullName: "",
			email: "",
			phone: "",
			company: "",
			message: "",
			interestedIn: [],
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
			<Card className="border-muted/40 text-center py-12 animate-in fade-in zoom-in duration-500">
				<CardContent className="space-y-6 flex flex-col items-center justify-center">
					<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center ring-8 ring-primary/5">
						<CheckCircle2 className="w-8 h-8 text-primary" />
					</div>
					<div className="space-y-2">
						<h3 className="text-2xl font-bold tracking-tight">Message Sent!</h3>
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
		<Card className="border-muted/40 shadow-xl shadow-black/5 bg-card/50 backdrop-blur-sm relative overflow-hidden transition-all">
			<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/40 via-primary to-primary/40" />
			<CardHeader>
				<CardTitle className="text-2xl">Send us a message</CardTitle>
				<CardDescription>Fill in the form and our team will contact you shortly.</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						
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
															"px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border flex items-center gap-2",
															isSelected
																? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
																: "bg-background/80 text-muted-foreground border-border hover:border-primary/40 hover:bg-muted/50"
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
												<User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
												<Input className="pl-10 transition-shadow focus-visible:ring-primary/20" placeholder="Jane Doe" {...field} />
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
												<Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
												<Input className="pl-10 transition-shadow focus-visible:ring-primary/20" type="email" placeholder="you@company.com" {...field} />
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
												<Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
												<Input className="pl-10 transition-shadow focus-visible:ring-primary/20" type="tel" placeholder="(555) 000-0000" {...field} />
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
												<Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
												<Input className="pl-10 transition-shadow focus-visible:ring-primary/20" placeholder="Acme Inc." {...field} />
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
										<Textarea className="resize-none transition-shadow focus-visible:ring-primary/20" rows={5} placeholder="Tell us a bit about your goals..." {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex items-center justify-between gap-4 pt-4 border-t border-border/50">
							<p className="text-sm text-muted-foreground hidden sm:block">Secured and encrypted.</p>
							<Button type="submit" disabled={isSubmitting} className="group relative overflow-hidden transition-all duration-300 w-full sm:w-auto">
								<span className="flex items-center gap-2 relative z-10">
									{isSubmitting ? "Sending..." : "Send message"}
									{!isSubmitting && <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
								</span>
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
