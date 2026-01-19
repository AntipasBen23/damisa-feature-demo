'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, CheckCircle2, Globe2 } from 'lucide-react';
import countriesData from '../data/countries.json';
import type { Country } from '../types';

const countries = countriesData as Country[];

export default function Dashboard() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const regions = ['all', ...Array.from(new Set(countries.map(c => c.region)))];

  const filteredCountries = countries.filter(country => {
    const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         country.currency.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || country.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  const launchedCount = countries.filter(c => c.status === 'launched').length;
  const availableCount = countries.filter(c => c.status === 'available').length;

  return (
    <div className="min-h-screen bg-[#DFF2ED]">
      {/* Header */}
      <header className="bg-[#002418] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-white">Damisa</div>
            <div className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/80">
              CorridorOS
            </div>
          </div>
          <button className="px-6 py-2 bg-white text-[#002418] rounded-full font-medium hover:bg-white/90 transition-colors">
            Contact us
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[#002418] mb-3">
            Launch a New Payment Corridor
          </h1>
          <p className="text-xl text-[#002418]/70">
            Select a country to get started. We'll show you pre-vetted partners and compliance requirements.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-[#002418]/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#002418]/60 text-sm font-medium">Launched Corridors</span>
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-[#002418]">{launchedCount}</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-[#002418]/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#002418]/60 text-sm font-medium">Available Markets</span>
              <Globe2 className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-[#002418]">{availableCount}</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-[#002418]/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#002418]/60 text-sm font-medium">Avg. Launch Time</span>
              <ArrowRight className="w-5 h-5 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-[#002418]">1-2 weeks</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 mb-8 border border-[#002418]/10">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#002418]/40" />
              <input
                type="text"
                placeholder="Search countries or currencies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#DFF2ED] border border-[#002418]/10 rounded-lg text-[#002418] placeholder:text-[#002418]/40 focus:outline-none focus:ring-2 focus:ring-[#002418]/20"
              />
            </div>

            {/* Region Filter */}
            <div className="flex gap-2 flex-wrap">
              {regions.map(region => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedRegion === region
                      ? 'bg-[#002418] text-white'
                      : 'bg-[#DFF2ED] text-[#002418] hover:bg-[#002418]/10'
                  }`}
                >
                  {region === 'all' ? 'All Regions' : region}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCountries.map(country => (
            <button
              key={country.id}
              onClick={() => router.push(`/corridor/${country.id}`)}
              className="bg-white rounded-xl p-6 border border-[#002418]/10 hover:border-[#002418]/30 hover:shadow-lg transition-all text-left group"
            >
              {/* Country Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{country.flag}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#002418] group-hover:text-[#002418]/80">
                      {country.name}
                    </h3>
                    <p className="text-sm text-[#002418]/60">{country.currency}</p>
                  </div>
                </div>
                
                {country.status === 'launched' ? (
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    Launched
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    Available
                  </span>
                )}
              </div>

              {/* Stats */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#002418]/60">Avg. Fees</span>
                  <span className="font-semibold text-[#002418]">{country.averageFees}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#002418]/60">Settlement</span>
                  <span className="font-semibold text-[#002418]">{country.averageSettlementMinutes} min</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#002418]/60">Complexity</span>
                  <span className={`font-semibold ${
                    country.regulatoryTier === 'low' ? 'text-green-600' :
                    country.regulatoryTier === 'medium' ? 'text-orange-600' :
                    'text-red-600'
                  }`}>
                    {country.regulatoryTier.charAt(0).toUpperCase() + country.regulatoryTier.slice(1)}
                  </span>
                </div>
              </div>

              {/* CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-[#002418]/10">
                <span className="text-sm font-medium text-[#002418]/60">
                  {country.region}
                </span>
                <ArrowRight className="w-5 h-5 text-[#002418] group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>

        {filteredCountries.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#002418]/60 text-lg">No countries found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}