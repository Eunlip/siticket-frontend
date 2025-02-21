import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { greenCardFormSchema } from '@/lib/form-schema/ESR/Questioning';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';

const GreenCardForm = () => {
	const [step, setStep] = useState(0);
	const form = useForm<z.infer<typeof greenCardFormSchema>>({
		resolver: zodResolver(greenCardFormSchema),
	});

	const onSubmit = (values: z.infer<typeof greenCardFormSchema>) => {
		console.log(values);
	};

	const nextStep = () => setStep((prev) => prev + 1);
	const prevStep = () => setStep((prev) => prev - 1);

	const steps = [
		<Step1 key='step1' form={form} />,
		<Step2 key='step2' form={form} />,
		<Step3 key='step3' form={form} />,
	];

	return (
		<>
			<Card className='border-none shadow-sm'>
				<CardHeader>
					<CardTitle>Green Card Form</CardTitle>
					<CardDescription>
						Please fill out the form below to apply for a Green Card.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
							{steps[step]}
							<CardFooter className='px-0 w-full flex justify-between'>
								<Button type='button' onClick={prevStep} disabled={step === 0}>
									Back
								</Button>
								<Button type='button' onClick={nextStep} disabled={step === steps.length - 1}>
									Next
								</Button>
							</CardFooter>
						</form>
					</Form>
				</CardContent>
			</Card>
		</>
	);
};

export default GreenCardForm;
