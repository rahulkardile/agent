import dayjs from 'dayjs'
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import { getRandomInterviewCover, getTechLogos } from '@/lib/utils';

const InterviewCard = async({ id, userId, role, type, techstack, createdAt }: InterviewCardProps) => {

    const feedback = null as Feedback | null;
    const normalizedType = /mix/gi.test(type) ? 'Mixed' : type;
    const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format("MMM D, YYYY");
    const techIcons = await getTechLogos(techstack);

    return (
        <div className='card-border w-[340px] max-sm:w-full min-h-96'>
            <div className="card-interview">
                <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
                    <p className='badge-text'>{normalizedType}</p>
                </div>
                <Image src={getRandomInterviewCover()} alt='cover image' width={60} height={60} className='rounded-full object-fit size-[90px]' />

                <h3 className='mt-5 capitalize'>{role} Interview</h3>

                <div className="flex flex-row gap-5 mt-3 ">
                    <div className="flex flex-row gap-2">
                        <Image src={"/calendar.svg"} alt='calendar' width={22} height={22} />
                        <p>{formattedDate}</p>
                    </div>

                    <div className="flex flex-row gap-2 items-center">
                        <Image src={"/star.svg"} alt="star" width={22} height={22} />
                        <p>{feedback?.totalScore || '---'} /100</p>
                    </div>
                </div>
                <p className="line-clamp-2 mt-5">
                    {
                        feedback?.finalAssessment || "You haven't taken the interview yet. Take it now to improve your skills."
                    }
                </p>
                
                <div className="flex justify-between items-center mt-3">
                    
                    {
                        <div className="flex flex-row">
                            {techIcons.slice(0, 3).map(({tech, url}, index) => (
                                // <div key={tech} className={cn("relative group bg-dark-300 rounded-full p-2 flex-center", index >= 1 && '-m-3')}>
                                <div key={tech} className="relative group bg-dark-300 rounded-full p-2 flex-center">
                                    <span className='tech-tooltip'>{tech}</span>
                                    <Image src={url} alt={tech} width={100} height={100} className='size-5' />
                                </div>
                            ))}
                        </div>
                    }

                    <Button className='btn-primary'>
                        <Link href={feedback ? `/interview/${id}/feedback}` : `/interview/${id}`}> {feedback ? "Check Feedback" : "View Interview"}</Link>
                    </Button>

                </div>
                
            </div>
        </div>
    )

}

export default InterviewCard