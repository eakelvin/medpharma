"use client"
import * as z from 'zod'
import * as React from "react"
import Image from "next/image"
import { 
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage 
} from "../ui/form"
import { Input } from "../ui/input"
import Link from "next/link"
import { Button } from "../ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Checkbox } from '../ui/checkbox'
import { Textarea } from '../ui/textarea'
import { 
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '../ui/select'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Spinner } from './spinner'
import { Label } from '../ui/label'

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

const customTimeSchema = z.string().refine((value) => timeRegex.test(value), {
  message: "Invalid time format. Expected HH:MM",
});

const formSchema = z.object({
    patientFirst: z.string().min(1, { message: 'First Name is Required' }),
    patientLast: z.string().min(1, { message: 'Last Name is Required' }),
    dob: z.string().date(),
    email: z.string().email(),
    gender: z.enum(['Male', 'Female'], {message: 'Gender is required'}),
    location: z.string(),
    file: typeof window === 'undefined' ? z.any() : z.instanceof(FileList),
    number: z.string().min(10, { message: 'Phone Number is Less then 10 digits'}),
    healthcare: z.string({required_error: "Health Care is Required"}),
    consultation: z.string({required_error: "Consultation Type is Required"}),
    condition: z.string().min(1, { message: 'Medical Condition is Required'}),
    consultDate: z.string().date(),
    consultTime: customTimeSchema,
});

export const ConsultationForm = () => {
    const [loading, setLoading] = React.useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            patientFirst: "",
            patientLast: "",
            dob: "",
            email: "",
            condition: "",
            number: "",
            location: "",
            gender: "Male",
            consultation: "",
            consultDate: "",
            consultTime: ''
        },
    })
    
    const fileRef = form.register("file");
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true)
            // const response = await axios.post(`${process.env.BASE_URL}/consultation/create`, values);
            const response = await axios.post("http://localhost:4000/api/consultation/create", values);
            toast.success('Successfully toasted!', { position: 'top-right' })
            console.log(response.data);
            form.reset();
        } catch (error) {
            console.error('Error submitting the form:', error);
            toast.error(`${error}`, {position: 'top-right'})           
        } finally {
            setLoading(false);
        }   
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                        <div className='space-y-4'>
                            <div className='grid grid-cols-2 gap-2'>
                                <FormField 
                                    control={form.control} 
                                    name='patientFirst'
                                    rules={{ required: true }} 
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder='First Name' type='text' />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )} 
                                />
                                <FormField 
                                    control={form.control} 
                                    name='patientLast'
                                    rules={{ required: true }} 
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder='Last Name' type='text' />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )} 
                                />
                            </div>
                            <div className='flex items-center'>
                                <FormField
                                    control={form.control}
                                    name="gender"
                                    render={({ field }) => (
                                        <div className="flex flex-row items-start space-x-3 space-y-0">
                                            <Label className="flex items-center">
                                                <Input
                                                    type="radio"
                                                    value="Male"
                                                    checked={field.value === 'Male'}
                                                    onChange={() => field.onChange('Male')}
                                                />
                                                <span className="ml-2">Male</span>
                                            </Label>
                                            <Label className="flex items-center">
                                                <Input
                                                    type="radio"
                                                    value="Female"
                                                    checked={field.value === 'Female'}
                                                    onChange={() => field.onChange('Female')}
                                                />
                                                <span className="ml-2">Female</span>
                                            </Label>
                                        </div>                                          
                                    )}
                                />
                            </div>
                            <FormField 
                                control={form.control} 
                                name='dob'
                                // rules={{ required: true }} 
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Date of Birth</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder='' type='date' />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )} 
                            />
                            <FormField 
                                control={form.control} 
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder='email@gmail.com' type='email' />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )} 
                            />
                            <FormField 
                                control={form.control} 
                                name='number'
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder='' type='number' />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )} 
                            />
                            <FormField 
                                control={form.control} 
                                name='location' 
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder='Enter your location' type='text' />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )} 
                            />
                            <FormField 
                                control={form.control} 
                                name='condition' 
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Condition</FormLabel>
                                    <p className='text-sm'>Explain why you want a Consultation</p>
                                    <FormControl>
                                        <Textarea {...field} placeholder="Type your message here." />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )} 
                            />
                            <FormField 
                                control={form.control} 
                                name='file' 
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Please Upload your medical report(if any)</FormLabel>
                                    <FormControl className='bg-gray-50 w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer'>
                                        <Input type='file' {...fileRef} placeholder='Drop your file or upload' />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )} 
                            />
                            <FormField
                                control={form.control}
                                name="healthcare"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Health Insurance Provider</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a healthcare provider" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                        <SelectItem value="enterprise">Enterprise Insurance</SelectItem>
                                        <SelectItem value="star">Star Assurance</SelectItem>
                                        <SelectItem value="sic">SIC Insurance</SelectItem>
                                        <SelectItem value="hollard">Hollard Insurance</SelectItem>
                                        <SelectItem value="glico">Glico General Insurance</SelectItem>
                                        <SelectItem value="vanguard">Vanguard Assurance</SelectItem>
                                        <SelectItem value="prime">Prime Insurance</SelectItem>
                                        <SelectItem value="best">Best Assurance</SelectItem>
                                        <SelectItem value="loyalty">Loyalty Insurance</SelectItem>
                                        <SelectItem value="millennium">Millennium Insurance</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="consultation"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Type of Consultation</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a consultation type" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                        <SelectItem value="in-patient">In-Patient</SelectItem>
                                        <SelectItem value="out-patient">Out-Patient</SelectItem>
                                        <SelectItem value="remote">Remotely</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='flex items-center gap-10'>
                                <FormField 
                                    control={form.control} 
                                    name='consultDate'
                                    // rules={{ required: true }} 
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Consultation Appointment</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder='' type='date' />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )} 
                                />
                                <FormField 
                                    control={form.control} 
                                    name='consultTime' 
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Consultation Time</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder='' type='time' />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )} 
                                />
                            </div>
                            
                            
                        </div>
                        <Button 
                            disabled={loading} 
                            type='submit' 
                            className='w-full'
                        >
                            {loading ? <Spinner /> : 'Submit Application'}                         
                        </Button>
                    </form>
                </Form>
            </div>
        </div> 
    )
}