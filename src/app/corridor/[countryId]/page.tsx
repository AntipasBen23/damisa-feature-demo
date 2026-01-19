'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Check, Building2, AlertCircle, Code, Rocket, CheckCircle2, ExternalLink } from 'lucide-react';
import countriesData from '../../data/countries.json';
import partnersData from '../../data/partners.json';
import regulationsData from '../../data/regulations.json';
import complianceTemplatesData from '../../data/compliance-templates.json';
import type { Country, Partner, Regulation, ComplianceTemplate } from '../../types';

const countries = countriesData as Country[];
const partners = partnersData as Partner[];
const regulations = regulationsData as Regulation[];
const complianceTemplates = complianceTemplatesData as ComplianceTemplate[];

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
  const [isGenerating, setIsGenerating] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testProgress, setTestProgress] = useState(0);

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

  const handleGenerateIntegration = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setCurrentStep(4);
    }, 2000);
  };

  const handleRunTests = () => {
    setIsTesting(true);
    setTestProgress(0);
    
    const interval = setInterval(() => {
      setTestProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTesting(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

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

        {/* STEP 1: Partner Selection */}
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

        {/* STEP 2: Regulatory Review */}
        {currentStep === 2 && countryRegulation && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#002418] mb-2">Regulatory Requirements</h2>
              <p className="text-[#002418]/60">Review compliance requirements for {country.name}</p>
            </div>

            {/* License Requirements */}
            <div className="bg-white rounded-xl p-6 mb-6 border border-[#002418]/10">
              <h3 className="text-lg font-semibold text-[#002418] mb-4">License Requirements</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-[#002418]/60 mb-2">Required License</div>
                  <div className="font-semibold text-[#002418]">{countryRegulation.licenseRequired}</div>
                </div>
                <div>
                  <div className="text-sm text-[#002418]/60 mb-2">Local License Needed</div>
                  <div className={`font-semibold ${countryRegulation.localLicenseNeeded ? 'text-orange-600' : 'text-green-600'}`}>
                    {countryRegulation.localLicenseNeeded ? 'Yes' : 'No'}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-[#002418]/60 mb-2">KYC Threshold</div>
                  <div className="font-semibold text-[#002418]">
                    ${countryRegulation.kycThreshold.toLocaleString()} {countryRegulation.kycThresholdCurrency}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-[#002418]/60 mb-2">Processing Time</div>
                  <div className="font-semibold text-[#002418]">{countryRegulation.processingTime}</div>
                </div>
              </div>
            </div>

            {/* AML Requirements */}
            <div className="bg-white rounded-xl p-6 mb-6 border border-[#002418]/10">
              <h3 className="text-lg font-semibold text-[#002418] mb-4">AML/KYC Requirements</h3>
              <ul className="space-y-2">
                {countryRegulation.amlRequirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[#002418]">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Transaction Limits */}
            <div className="bg-white rounded-xl p-6 mb-6 border border-[#002418]/10">
              <h3 className="text-lg font-semibold text-[#002418] mb-4">Transaction Limits</h3>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-sm text-[#002418]/60 mb-2">Daily Limit</div>
                  <div className="text-xl font-bold text-[#002418]">
                    ${countryRegulation.transactionLimits.daily.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-[#002418]/60 mb-2">Monthly Limit</div>
                  <div className="text-xl font-bold text-[#002418]">
                    ${countryRegulation.transactionLimits.monthly.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-[#002418]/60 mb-2">Reporting</div>
                  <div className="text-xl font-bold text-[#002418]">{countryRegulation.reportingFrequency}</div>
                </div>
              </div>
            </div>

            {/* Compliance Notes */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Important Notes</h3>
              <p className="text-blue-800">{countryRegulation.notes}</p>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-8 py-3 border-2 border-[#002418] text-[#002418] rounded-lg font-semibold hover:bg-[#002418]/5 transition-colors"
              >
                Back to Partner Selection
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="px-8 py-3 bg-[#002418] text-white rounded-lg font-semibold hover:bg-[#002418]/90 transition-colors"
              >
                Continue to Integration
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Integration */}
        {currentStep === 3 && selectedPartner && countryCompliance && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#002418] mb-2">Integration Setup</h2>
              <p className="text-[#002418]/60">Generate API integration for {selectedPartner.name}</p>
            </div>

            {/* Partner Summary */}
            <div className="bg-white rounded-xl p-6 mb-6 border border-[#002418]/10">
              <h3 className="text-lg font-semibold text-[#002418] mb-4">Selected Partner</h3>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xl font-bold text-[#002418] mb-1">{selectedPartner.name}</div>
                  <div className="text-[#002418]/60">{selectedPartner.type}</div>
                </div>
                
                  <a 
                  href={selectedPartner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#DFF2ED] text-[#002418] rounded-lg hover:bg-[#002418]/10 transition-colors"
                >
                  View Documentation
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Code Generation */}
            <div className="bg-white rounded-xl p-6 mb-6 border border-[#002418]/10">
              <h3 className="text-lg font-semibold text-[#002418] mb-4">Auto-Generated Integration Code</h3>
              
              {!isGenerating ? (
                <div className="bg-[#002418] rounded-lg p-6 text-white font-mono text-sm mb-4">
                  <div className="text-green-400">// Integration code for {selectedPartner.name}</div>
                  <div className="mt-2">import &#123; DamisaClient &#125; from &apos;@damisa/sdk&apos;;</div>
                  <div className="mt-2">const client = new DamisaClient(&#123;</div>
                  <div className="ml-4">partner: &apos;{selectedPartner.id}&apos;,</div>
                  <div className="ml-4">country: &apos;{country.id}&apos;,</div>
                  <div className="ml-4">apiKey: process.env.DAMISA_API_KEY</div>
                  <div>&#125;);</div>
                  <div className="mt-4 text-gray-400">// Convert USDC to {country.currency}</div>
                  <div className="mt-2">await client.convert(&#123;</div>
                  <div className="ml-4">from: &apos;USDC&apos;,</div>
                  <div className="ml-4">to: &apos;{country.currency}&apos;,</div>
                  <div className="ml-4">amount: 1000,</div>
                  <div className="ml-4">recipient: recipientDetails</div>
                  <div>&#125;);</div>
                </div>
              ) : (
                <div className="bg-[#DFF2ED] rounded-lg p-6 mb-4 text-center">
                  <div className="animate-spin w-8 h-8 border-4 border-[#002418] border-t-transparent rounded-full mx-auto mb-3"></div>
                  <p className="text-[#002418] font-medium">Generating integration code...</p>
                </div>
              )}

              <button
                onClick={handleGenerateIntegration}
                disabled={isGenerating}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  isGenerating
                    ? 'bg-[#002418]/20 text-[#002418]/40 cursor-not-allowed'
                    : 'bg-[#002418] text-white hover:bg-[#002418]/90'
                }`}
              >
                {isGenerating ? 'Generating...' : 'Generate & Deploy Integration'}
              </button>
            </div>

            {/* Compliance Template */}
            <div className="bg-white rounded-xl p-6 mb-6 border border-[#002418]/10">
              <h3 className="text-lg font-semibold text-[#002418] mb-4">Compliance Template Applied</h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-900">{countryCompliance.templateName}</span>
                </div>
                <p className="text-green-800 text-sm">
                  AML monitoring, KYC verification, and sanctions screening configured for {country.name}
                </p>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-8 py-3 border-2 border-[#002418] text-[#002418] rounded-lg font-semibold hover:bg-[#002418]/5 transition-colors"
              >
                Back to Regulatory Review
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Launch */}
        {currentStep === 4 && selectedPartner && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#002418] mb-2">Ready to Launch</h2>
              <p className="text-[#002418]/60">Run tests and deploy your {country.name} corridor</p>
            </div>

            {/* Launch Checklist */}
            <div className="bg-white rounded-xl p-6 mb-6 border border-[#002418]/10">
              <h3 className="text-lg font-semibold text-[#002418] mb-4">Pre-Launch Checklist</h3>
              <div className="space-y-3">
                {[
                  'Partner selected and configured',
                  'Regulatory requirements reviewed',
                  'Compliance template applied',
                  'Integration code generated',
                  'API endpoints configured'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="text-[#002418]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Testing */}
            <div className="bg-white rounded-xl p-6 mb-6 border border-[#002418]/10">
              <h3 className="text-lg font-semibold text-[#002418] mb-4">Automated Testing</h3>
              
              {testProgress === 0 ? (
                <button
                  onClick={handleRunTests}
                  disabled={isTesting}
                  className="w-full py-3 bg-[#002418] text-white rounded-lg font-semibold hover:bg-[#002418]/90 transition-colors"
                >
                  Run End-to-End Tests
                </button>
              ) : (
                <div>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[#002418]/60">Testing Progress</span>
                      <span className="font-semibold text-[#002418]">{testProgress}%</span>
                    </div>
                    <div className="w-full h-3 bg-[#DFF2ED] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#002418] transition-all duration-300"
                        style={{ width: `${testProgress}%` }}
                      />
                    </div>
                  </div>
                  
                  {testProgress === 100 && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-900">All tests passed!</span>
                      </div>
                      <p className="text-green-800 text-sm mt-2">
                        Settlement time: {selectedPartner.settlementMinutes} min • Success rate: 98% • Fees: {selectedPartner.fees}%
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Launch Button */}
            {testProgress === 100 && (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-8 text-center">
                <Rocket className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#002418] mb-2">
                  {country.name} Corridor Ready to Launch!
                </h3>
                <p className="text-[#002418]/60 mb-6">
                  Your corridor has been configured and tested. Deploy now to start processing payments.
                </p>
                <button
                  onClick={() => {
                    alert(`🚀 ${country.name} corridor launched successfully!\n\nYou can now process USDC → ${country.currency} payments in ${selectedPartner.settlementMinutes} minutes at ${selectedPartner.fees}% fees.`);
                    router.push('/dashboard');
                  }}
                  className="px-12 py-4 bg-green-600 text-white rounded-lg font-bold text-lg hover:bg-green-700 transition-colors"
                >
                  Deploy Corridor
                </button>
              </div>
            )}

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setCurrentStep(3)}
                className="px-8 py-3 border-2 border-[#002418] text-[#002418] rounded-lg font-semibold hover:bg-[#002418]/5 transition-colors"
              >
                Back to Integration
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}