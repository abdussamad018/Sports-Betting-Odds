"use client";
import { useEffect, useState } from "react";

export default function OddsTable() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 3, minutes: 5, seconds: 16 });
  const [expandedSections, setExpandedSections] = useState(new Set());

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
              hours = 23; // Reset to 23 hours
            }
          }
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Load data.json
  useEffect(() => {
    fetch("/data.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        console.log("Loaded data:", json);
        setData(json.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading data:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Update suggestions as user types
  useEffect(() => {
    if (!search || !data.length) {
      setSuggestions([]);
      return;
    }
    
    const lower = search.toLowerCase();
    setSuggestions(
      data.filter((m) => {
        if (!m || !m.matches || !m.matches.match) return false;
        
        const match = m.matches.match;
        const localTeam = match.localteam || {};
        const awayTeam = match.awayteam || {};
        
        return (
          (m.id && m.id.toString().includes(lower)) ||
          (localTeam.name && localTeam.name.toLowerCase().includes(lower)) ||
          (awayTeam.name && awayTeam.name.toLowerCase().includes(lower))
        );
      })
    );
  }, [search, data]);

  // Handle match selection
  const handleSelect = (match) => {
    if (!match || !match.matches || !match.matches.match) {
      console.error("Invalid match data:", match);
      return;
    }
    
    setSelectedMatch(match);
    const matchData = match.matches.match;
    const localTeam = matchData.localteam || {};
    const awayTeam = matchData.awayteam || {};
    
    setSearch(
      `${match.id} - ${localTeam.name || 'Unknown'} vs ${awayTeam.name || 'Unknown'}`
    );
    setSuggestions([]);

    // Expand all sections by default when match is selected
    if (matchData.odds && matchData.odds.type) {
      const sectionIds = matchData.odds.type.map((type, index) => `${type.id || index}`);
      setExpandedSections(new Set(sectionIds));
    }
  };

  // Toggle accordion section
  const toggleSection = (sectionId) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  // Generate dynamic table headers and rows
  const renderTable = () => {
    if (!selectedMatch || !selectedMatch.matches || !selectedMatch.matches.match) {
      return (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">No match selected</div>
          <p className="text-gray-500 mt-2">Search and select a match to view odds</p>
        </div>
      );
    }

    const match = selectedMatch.matches.match;
    const odds = match.odds;
    
    if (!odds || !odds.type || !Array.isArray(odds.type)) {
      return (
        <div className="text-center py-12">
          <div className="text-red-500 text-lg">No odds data available</div>
          <p className="text-gray-500 mt-2">This match doesn't have any odds information</p>
        </div>
      );
    }

    const oddsTypes = odds.type;
    const localTeam = match.localteam || {};
    const awayTeam = match.awayteam || {};

    return (
      <div className="space-y-4">
        {/* Match Header with Countdown */}
        <div className="bg-gray-800 rounded-lg p-6">
          {/* Countdown Timer */}
          <div className="text-center mb-6">
            <div className="flex justify-center items-center space-x-4 text-white">
              <div className="text-center">
                <div className="text-3xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
                <div className="text-sm opacity-80">hours</div>
              </div>
              <div className="text-3xl font-bold">:</div>
              <div className="text-center">
                <div className="text-3xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                <div className="text-sm opacity-80">minutes</div>
              </div>
              <div className="text-3xl font-bold">:</div>
              <div className="text-center">
                <div className="text-3xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                <div className="text-sm opacity-80">seconds</div>
              </div>
            </div>
          </div>

          {/* Match Details */}
          <div className="flex items-center justify-between">
            {/* Home Team */}
            <div className="flex items-center space-x-3 flex-1">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {localTeam.name ? localTeam.name.charAt(0) : 'H'}
              </div>
              <div className="text-white">
                <div className="font-semibold text-left">{localTeam.name || 'Home Team'}</div>
                <div className="text-sm opacity-80 text-left">(0/0)</div>
              </div>
            </div>

            {/* Match Time/Date */}
            <div className="text-center text-white flex-shrink-0 mx-4">
              <div className="text-2xl font-bold">23:10</div>
              <div className="text-lg opacity-80">01/09</div>
            </div>

            {/* Away Team */}
            <div className="flex items-center space-x-3 flex-1 justify-end">
              <div className="text-white text-right">
                <div className="font-semibold">{awayTeam.name || 'Away Team'}</div>
                <div className="text-sm opacity-80">(0/0)</div>
              </div>
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-red-600 font-bold text-xl">
                {awayTeam.name ? awayTeam.name.charAt(0) : 'A'}
              </div>
            </div>
          </div>
        </div>
        
        {/* Odds Tables */}
        {oddsTypes.map((type, typeIndex) => {
          if (!type || !type.bookmaker || !Array.isArray(type.bookmaker)) {
            return null;
          }

          const sectionId = `${type.id || typeIndex}`;
          const isExpanded = expandedSections.has(sectionId);

          // Collect all unique odd names for this type
          const oddNames = new Set();
          type.bookmaker.forEach((bm) => {
            if (bm.odd && Array.isArray(bm.odd)) {
              bm.odd.forEach((o) => {
                if (o && o.name) {
                  oddNames.add(o.name);
                }
              });
            }
          });

          return (
            <div key={sectionId} className="bg-gray-800 rounded-lg overflow-hidden">
              {/* Section Header */}
              <div 
                className="bg-gray-700 px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-600 transition-colors"
                onClick={() => toggleSection(sectionId)}
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-white font-semibold">{type.value || `Odds Type ${typeIndex + 1}`}</span>
                </div>
                <svg 
                  className={`w-4 h-4 text-white transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {/* Accordion Content */}
              {isExpanded && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-700">
                      <tr>
                        {[...oddNames].map((oddName) => (
                          <th key={oddName} className="px-4 py-3 text-center text-white font-medium text-sm">
                            {oddName}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800">
                      {type.bookmaker.map((bm, bmIndex) => {
                        if (!bm || !bm.odd || !Array.isArray(bm.odd)) {
                          return null;
                        }
                        
                        const rowKey = `${type.id || typeIndex}-${bm.id || bm.name}-${bmIndex}`;
                        
                        return (
                          <tr key={rowKey} className="border-b border-gray-700">
                            {[...oddNames].map((oddName) => {
                              const found = bm.odd.find((o) => o && o.name === oddName);
                              return (
                                <td key={oddName} className="px-4 py-3 text-center">
                                  {found ? (
                                    <div className="text-yellow-400 font-semibold text-lg">
                                      {found.value || 'N/A'}
                                    </div>
                                  ) : (
                                    <span className="text-gray-500">-</span>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading match data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-white mb-2">Error Loading Data</h1>
          <p className="text-red-400 mb-4">{error}</p>
          <p className="text-gray-400">Make sure data.json exists in the public folder.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-white">Sports Betting Odds</h1>
              <p className="text-gray-400 mt-1">Live odds and match information</p>
            </div>
            <div className="text-sm text-gray-400">
              {data.length} matches available
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by Match ID or Team Name..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSelectedMatch(null);
              }}
              className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg leading-5 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition duration-150 ease-in-out"
            />
            
            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-gray-800 rounded-lg shadow-lg border border-gray-600 max-h-60 overflow-y-auto">
                {suggestions.map((m, index) => {
                  if (!m || !m.matches || !m.matches.match) return null;
                  
                  const match = m.matches.match;
                  const localTeam = match.localteam || {};
                  const awayTeam = match.awayteam || {};
                  
                  const uniqueKey = `${m.id}-${index}`;
                  
                  return (
                    <div
                      key={uniqueKey}
                      className="px-4 py-3 hover:bg-gray-700 cursor-pointer border-b border-gray-600 last:border-b-0 transition duration-150 ease-in-out"
                      onClick={() => handleSelect(m)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-white">
                            {localTeam.name || 'Unknown'} vs {awayTeam.name || 'Unknown'}
                          </div>
                          <div className="text-xs text-gray-400">Match ID: {m.id}</div>
                        </div>
                        <div className="text-xs text-gray-500">
                          {match.date || 'Unknown date'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        
        {/* Results Section */}
        <div className="space-y-6">
          {renderTable()}
        </div>
      </div>
    </div>
  );
}
