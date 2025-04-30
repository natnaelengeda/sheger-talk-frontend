"use client";

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

// Shadcn
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import axios from "@/utils/axios";
import toast from 'react-hot-toast';

type Inputs = {
  name: string;
  message: string;
}

export default function Page() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      message: "",
    }
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // toast.success("Feedback submitted successfully!");

    console.log(data);
    // axios.post("/feedback", data)
    //   .then((res) => {
    //     console.log(res.data);
    //     toast.success("Feedback submitted successfully!");
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     toast.error("Something went wrong!");
    //   });
  }

  return (
    <div
      className='w-full h-full flex flex-col items-center justify-start gap-10 pt-28 px-5'>

      {/* Title */}
      <div className='w-full flex flex-col items-center justify-start gap-2'>
        <h1 className='text-3xl font-bold text-primary'>Feedback</h1>
        <p className='text-base text-primary/80'>We would love to hear your thoughts!</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full h-auto flex flex-col items-start justify-start gap-7'>
        {/* Name */}
        <div
          className="grid w-full max-w-sm items-center gap-4">
          <Label htmlFor="name">{`Name (Optional)`}</Label>
          <Input
            id="name"
            type="name"
            {...register("name")} />
        </div>

        {/* Textarea */}
        <div
          className="grid w-full max-w-sm items-center gap-4">
          <Label htmlFor="message">Message</Label>
          <Textarea
            rows={5}
            id="message"
            {...register("message", { required: "This field is required" })} />
          {errors.message && (<p className='text-xs text-red-500'>This Field is Required</p>)}
        </div>

        <button
          type='submit'
          className='w-full h-12 text-white bg-primary flex items-center justify-center shadow-md rounded-lg'>
          Submit Feedback
        </button>
      </form>
    </div>
  )
}
