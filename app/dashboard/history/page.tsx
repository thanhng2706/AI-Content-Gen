"use client"
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import { desc, eq } from 'drizzle-orm';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Templates from '@/app/(data)/Templates';

interface HistoryItem {
    id: number;
    formData: string;
    aiResponse: string;
    templateSlug: string;
    createdBy: string;
    createdAt: string;
}

export default function HistoryPage() {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useUser();

    const getTemplateDetails = (slug: string) => {
        const template = Templates.find(t => t.slug === slug);
        return {
            icon: template?.icon || '/icons/file.svg',
            name: template?.name || slug
        };
    };

    useEffect(() => {
        fetchHistory();
    }, [user]);

    const fetchHistory = async () => {
        try {
            if (user?.primaryEmailAddress?.emailAddress) {
                const results = await db
                    .select()
                    .from(AIOutput)
                    .where(eq(AIOutput.createdBy, user.primaryEmailAddress.emailAddress))
                    .orderBy(desc(AIOutput.createdAt));
                setHistory(results);
            }
        } catch (error) {
            console.error('Error fetching history:', error);
        } finally {
            setLoading(false);
        }
    };

    const copyContent = async (content: string) => {
        await navigator.clipboard.writeText(content);
        alert('Content copied to clipboard!');
    };

    const getWordCount = (text: string) => {
        return text.trim().split(/\s+/).length;
    };

    if (loading) {
        return (
            <div className="p-5 max-w-7xl mx-auto animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-24 bg-gray-100 rounded-lg mb-4"></div>
                ))}
            </div>
        );
    }

    return (
        <div className="p-5 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard">
                        <Image 
                            src="/logo.svg"
                            alt="Logo"
                            width={120}
                            height={100}
                            priority
                        />
                    </Link>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-red-400 bg-clip-text text-transparent">
                        Generation History
                    </h1>
                </div>
            </div>

            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                <div className="grid grid-cols-5 gap-4 p-4 bg-gray-50 border-b text-sm font-medium text-gray-600">
                    <div>Template</div>
                    <div>AI Response</div>
                    <div>Date</div>
                    <div>Word Count</div>
                    <div>Actions</div>
                </div>

                <div className="divide-y">
                    {history.map((item) => {
                        const templateDetails = getTemplateDetails(item.templateSlug);
                        return (
                            <div 
                                key={item.id} 
                                className="grid grid-cols-5 gap-4 p-4 hover:bg-gray-50 transition-colors items-center"
                            >
                                <div className="flex items-center gap-2">
                                    <Image 
                                        src={templateDetails.icon}
                                        alt={templateDetails.name}
                                        width={20}
                                        height={20}
                                        className="w-5 h-5"
                                    />
                                    <span className="font-medium">{templateDetails.name}</span>
                                </div>
                                
                                <div className="text-sm text-gray-600 line-clamp-2">
                                    {item.aiResponse}
                                </div>
                                
                                <div className="text-sm text-gray-500">
                                    {moment(item.createdAt).format('MMM DD, YYYY')}
                                </div>
                                
                                <div className="text-sm text-gray-600">
                                    {getWordCount(item.aiResponse)} words
                                </div>
                                
                                <div>
                                    <Button 
                                        variant="outline" 
                                        size="sm"
                                        onClick={() => copyContent(item.aiResponse)}
                                        className="hover:bg-primary hover:text-white transition-colors"
                                    >
                                        <Copy className="w-4 h-4 mr-2" />
                                        Copy
                                    </Button>
                                </div>
                            </div>
                        );
                    })}

                    {history.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">
                                No generation history found. Start creating content!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}