"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { AIOutput } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import React, { use, useContext, useEffect, useState } from 'react'
import { eq } from 'drizzle-orm';
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';


interface HISTORY {
    id: Number,
    formData: string,
    aiResponse: string,
    templateSlug: string,
    createdBy: string,
    createdAt: string
}

function UsageTrack() {

    const { user } = useUser();
    const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);

    useEffect(() => {
        user && GetData();
    }, [user])

    const GetData = async () => {
        {/* @ts-ignore */ }
        const result: HISTORY[] = await db.select().from(AIOutput)
            .where(eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress))

        GetTotalUsage(result);
    }

    const GetTotalUsage = (result: HISTORY[]) => {
        let total: number = 0;
        result.forEach(element => {
            total += Number(element.aiResponse?.length)
        });
        setTotalUsage(total);
        console.log(total);
    }

    return (
        <div className='m-5'>
            <div className='bg-primary text-white rounded-lg p-3'>
                <h2 className='font-medium'>Credits</h2>
                <div className='h-2 bg-[#FFB6C1] w-full rounded-full mt-3'>
                    <div className='h-2 bg-white rounded-full'
                        style={{
                            width: (totalUsage / 10000) * 10 + '%'
                        }}
                    ></div>
                </div>
                <h2 className='text-sm my-2'>{totalUsage}/270605 Credit Used</h2>
            </div>
        </div>
    )
}

export default UsageTrack