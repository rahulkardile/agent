import Agent from '@/components/Agent';
import DisplayTechIcons from '@/components/DisplayTechIcons';
import { getCurrentUser } from '@/lib/actions/auth.action';
import { getInterviewById } from '@/lib/actions/general.action';
import { getRandomInterviewCover } from '@/lib/utils';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async({ params }: RouteParams) => {
    
    const { id } = await params;
    const interview = await getInterviewById(id);
    const user = await getCurrentUser();
    if(!interview) redirect('/');

    return (
        <>
            <div className="flex flex-row gap-4 justify-between">
                <div className="flex flex-row gap-4 items-center max-sm:flex-col">
                    <div className="flex flex-row gap-4 items-center">
                        <Image src={getRandomInterviewCover() } alt='cover-image' width={40} height={40} className="rounded-full object-cover size-[40px]" /> 
                        <h3 className='capitalize'>{interview.role} interview</h3>
                    </div>
                    <DisplayTechIcons techStack={interview.techstack} />
                </div>
                <p className='bg-dark-200 px-4 py-2 rounded-lg h-fit capitalize'>{interview.type}</p>
            </div>
            <Agent userName={user?.name!} type={'interview'} interviewId={id} key={user?.id} questions={interview.questions} userId={user?.id} feedbackId={interview.userId} />
        </>
    )
}

export default page