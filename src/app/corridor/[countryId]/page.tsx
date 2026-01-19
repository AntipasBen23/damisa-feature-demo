'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Check, Building2, AlertCircle, Code, Rocket } from 'lucide-react';
import countriesData from '../../data/countries.json';
import partnersData from '../../data/partners.json';
import regulationsData from '../../data/regulations.json';
import complianceTemplatesData from '../../data/compliance-templates.json';
import type { Country, Partner, Regulation, ComplianceTemplate } from '../../types';

const countries: Country[] = countriesData;
const partners: Partner[] = partnersData;
const regulations: Regulation[] = regulationsData;
const complianceTemplates: ComplianceTemplate[] = complianceTemplatesData;

export default function CorridorConfig() {
  const params = useParams();
  const router = useRouter();
  const countryId = params.countryId as string;

  const country = countries.find(c => c.id === countryId);
  const countryPartners = partners.filter(p => p.country === countryId);
  const countryRegulation = regulations.find(r => r.country === countryId);
  const countryCompliance = complianceTemplates.find(c => c.country === countryId);

  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  if (!country) {
    return <div>Country not found</div>;
  }

  const selectedPartner = countryPartners.find(p => p.id === selectedPartnerId);

  const steps = [
    { number: 1, name: 'Partner Discovery', icon: Building2 },
    { number: 2, name: 'Regulatory Review', icon: AlertCircle },
    { number: 3, name: 'Integration', icon: Code },
    { number: 4, name: 'Launch', icon: Rocket }
  ];

  return (
    <div className="min-h-screen bg-[#DFF2ED]">
      {/* Header */}
      <header className="bg-[#002418] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-white">Damisa</div>
              <div className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/80">
                CorridorOS
              </div>
            </div>
          </div>
          <button className="px-6 py-2 bg-white text-[#002418] rounded-full font-medium hover:bg-white/90 transition-colors">
            Contact us
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Country Header */}
        <div className="bg-white rounded-xl p-6 mb-8 border border-[#002418]/10">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">{country.flag}</div>
            <div>
              <h1 className="text-3xl font-bold text-[#002418]">{country.name} Corridor</h1>
              <p className="text-[#002418]/60">Currency: {country.currency} • Region: {country.region}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-[#002418]/60 mb-1">Average Fees</div>
              <div className="text-2xl font-bold text-[#002418]">{country.averageFees}%</div>
            </div>
            <div>
              <div className="text-sm text-[#002418]/60 mb-1">Settlement Time</div>
              <div className="text-2xl font-bold text-[#002418]">{country.averageSettlementMinutes} min</div>
            </div>
            <div>
              <div className="text-sm text-[#002418]/60 mb-1">Regulatory Complexity</div>
              <div className={`text-2xl font-bold ${
                country.regulatoryTier === 'low' ? 'text-green-600' :
                country.regulatoryTier === 'medium' ? 'text-orange-600' :
                'text-red-600'
              }`}>
                {country.regulatoryTier.charAt(0).toUpperCase() + country.regulatoryTier.slice(1)}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-xl p-6 mb-8 border border-[#002418]/10">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${
                    currentStep >= step.number
                      ? 'bg-[#002418] text-white'
                      : 'bg-[#DFF2ED] text-[#002418]/40'
                  }`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-[#002418]' : 'text-[#002418]/40'
                  }`}>
                    {step.name}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-1 flex-1 mx-4 rounded-full ${
                    currentStep > step.number ? 'bg-[#002418]' : 'bg-[#DFF2ED]'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Partner Selection */}
        {currentStep === 1 && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#002418] mb-2">Select a Payment Partner</h2>
              <p className="text-[#002418]/60">Choose from {countryPartners.length} pre-vetted partners in {country.name}</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {countryPartners.map(partner => (
                <button
                  key={partner.id}
                  onClick={() => setSelectedPartnerId(partner.id)}
                  className={`bg-white rounded-xl p-6 border-2 transition-all text-left ${
                    selectedPartnerId === partner.id
                      ? 'border-[#002418] shadow-lg'
                      : 'border-[#002418]/10 hover:border-[#002418]/30'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-[#002418]">{partner.name}</h3>
                        {selectedPartnerId === partner.id && (
                          <div className="w-6 h-6 bg-[#002418] rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-[#002418]/60 mb-3">{partner.type}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {partner.features.slice(0, 3).map((feature, idx) => (
                          <span key={idx} className="px-3 py-1 bg-[#DFF2ED] text-[#002418] text-xs rounded-full">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#002418] mb-1">{partner.fees}%</div>
                      <div className="text-sm text-[#002418]/60">Fee</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 pt-4 border-t border-[#002418]/10">
                    <div>
                      <div className="text-xs text-[#002418]/60 mb-1">Settlement</div>
                      <div className="text-sm font-semibold text-[#002418]">{partner.settlementMinutes} min</div>
                    </div>
                    <div>
                      <div className="text-xs text-[#002418]/60 mb-1">API Quality</div>
                      <div className="text-sm font-semibold text-[#002418]">{partner.apiQuality}/10</div>
                    </div>
                    <div>
                      <div className="text-xs text-[#002418]/60 mb-1">Reliability</div>
                      <div className="text-sm font-semibold text-[#002418]">{partner.reliability}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-[#002418]/60 mb-1">Integration</div>
                      <div className={`text-sm font-semibold ${
                        partner.integrationDifficulty === 'easy' ? 'text-green-600' :
                        partner.integrationDifficulty === 'medium' ? 'text-orange-600' :
                        'text-red-600'
                      }`}>
                        {partner.integrationDifficulty.charAt(0).toUpperCase() + partner.integrationDifficulty.slice(1)}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setCurrentStep(2)}
                disabled={!selectedPartnerId}
                className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                  selectedPartnerId
                    ? 'bg-[#002418] text-white hover:bg-[#002418]/90'
                    : 'bg-[#002418]/20 text-[#002418]/40 cursor-not-allowed'
                }`}
              >
                Continue to Regulatory Review
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Regulatory Review - Next file */}
        {currentStep === 2 && countryRegulation && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#002418] mb-2">Regulatory Requirements</h2>
              <p className="text-[#002418]/60">Review compliance requirements for {country.name}</p>
            </div>

            {/* Continue in next file... */}
          </div>
        )}
      </div>
    </div>
  );
}