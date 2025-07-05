import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import { dummyInterviews } from '@/constants'
import { getCurrentUser, getInterviewByUser, getLastestInterviews } from '@/lib/actions/auth.action'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async () => {

  const user = await getCurrentUser();

  const [userInterviews, lastetInterviews] = await Promise.all([
    await getInterviewByUser(user?.id!),
    await getLastestInterviews({ userId: user?.id! })
  ])
  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpCommingInterviews = lastetInterviews?.length! > 0;

  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get interview-ready with AI-Powered Practice & Feedback</h2>
          <p className='text-lg'>Practice on real interview questions & get instant Feedback</p>

          <Button asChild className='btn-primary max-sm:w-full'><Link href={"/interview"}>Start an Interview</Link></Button>
        </div>
        <Image src={"/robot.png"} alt='robo-dude' width={400} height={400} className='max-sm:hidden' />
      </section>

      <section className='flex flex-col gap-6 mt-8'>
        <h2>Your Interviews</h2>
        <div className="interviews-section">

          {
            hasPastInterviews ? userInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            )) : <p>You haven&apos;t taken any interview yet</p>
          }

        </div>
      </section>

      <section className='flex flex-col gap-6 mt-8'>
        <h2>Take an Interview</h2>
        <div className="interviews-section">


          {
            hasUpCommingInterviews ? (
              lastetInterviews?.map((interview)=>(
                <InterviewCard {...interview} key={interview.id} />
              ))) : (
                <p>There are no new interview awailable</p>
              )
          }
          
          {/* <p>There are no interview available</p> */}
        </div>
      </section>
    </>
  )
}

export default page