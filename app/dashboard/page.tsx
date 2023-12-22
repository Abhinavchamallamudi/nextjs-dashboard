import React, { useState, useEffect } from 'react';
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue } from '@/app/lib/data';
import { type } from 'os';

interface Scheme = {
    schemeCode: number;
    schemeName: string;
}


export default function Page() {
    // Annotate the state with the Scheme type
    const [revenue, setRevenue] = useState<Scheme[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchAndSetRevenue = async () => {
            const fetchedRevenue = await fetchRevenue();
            // Assuming fetchRevenue returns Scheme[], cast if necessary
            setRevenue(fetchedRevenue as Scheme[]);
        };
        fetchAndSetRevenue();
    }, []);

    // Filter schemes based on the search term
    const filteredSchemes = revenue.filter(scheme =>
        scheme.schemeName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            <input
                type="text"
                placeholder="Search Scheme..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 p-2 border border-gray-300 rounded"
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filteredSchemes.map(scheme => (
                    <Card
                        key={scheme.schemeCode}
                        title={scheme.schemeName}
                        value={scheme.schemeCode}
                        type="collected" // Example, choose the appropriate type
                    />))}
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <RevenueChart revenue={filteredSchemes} />
            </div>
        </main>
    );
}
