"use client";

import Header from '../components/header';
import StandingCol from '../components/standingCol';
import React, { useEffect, useState } from 'react';
import { calculateOverallStandings, fetchStandings } from '../api/sleeper';
import Standing from '../types/Standing';

export default function Home() {
  const [overallStandings, setOverallStandings] = useState<typeof Standing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOverallStandings = async () => {
      try {
        const standings1 = await fetchStandings("1129049799606558720");
        const standings2 = await fetchStandings("1129055384385323008");
        //console.log(standings1);
        const standings3 = await fetchStandings("1129055515994148864");
        
        const overallStandings = await calculateOverallStandings(standings1, standings2, standings3);
        //console.log(overallStandings);
        setOverallStandings(overallStandings); // Corrected line
      } catch (err) {
        console.error('Error fetching standings:', err);
        setError('Failed to fetch standings');
      } finally {
        setLoading(false);
      }
    };

    fetchOverallStandings();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="items-center">
      <Header />
      <h1 className="text-center" style={{ fontSize: '26px' }}>Overall Standings</h1>
      <StandingCol standings={overallStandings} />
    </div>
  );
}