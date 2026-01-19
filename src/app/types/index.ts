export interface Country {
  id: string;
  name: string;
  currency: string;
  region: string;
  flag: string;
  status: 'available' | 'launched' | 'coming-soon';
  averageFees: number;
  averageSettlementMinutes: number;
  regulatoryTier: 'low' | 'medium' | 'high';
}

export interface Partner {
  id: string;
  name: string;
  country: string;
  type: 'Payment Processor' | 'Payment Gateway' | 'Mobile Money Operator' | 'Commercial Bank';
  currencies: string[];
  fees: number;
  settlementMinutes: number;
  apiQuality: number;
  reliability: number;
  monthlyVolume: string;
  website: string;
  contact: string;
  licensingStatus: string;
  features: string[];
  integrationDifficulty: 'easy' | 'medium' | 'hard';
}

export interface Regulation {
  country: string;
  countryName: string;
  licenseRequired: string;
  localLicenseNeeded: boolean;
  kycThreshold: number;
  kycThresholdCurrency: string;
  amlRequirements: string[];
  transactionLimits: {
    daily: number;
    monthly: number;
    currency: string;
  };
  reportingFrequency: string;
  reportingAuthority: string;
  sanctionsLists: string[];
  dataResidency: string;
  estimatedComplianceCost: string;
  processingTime: string;
  complexityLevel: 'low' | 'medium' | 'high';
  notes: string;
}

export interface ComplianceTemplate {
  country: string;
  countryName: string;
  templateName: string;
  version: string;
  kycRules: {
    tier1: KYCTier;
    tier2: KYCTier;
    tier3: KYCTier;
  };
  amlRules: {
    transactionMonitoring: TransactionMonitoring;
    sanctionsScreening: SanctionsScreening;
    strReporting: STRReporting;
  };
  riskScoring: {
    lowRisk: RiskLevel;
    mediumRisk: RiskLevel;
    highRisk: RiskLevel;
  };
  recordKeeping: {
    retentionPeriod: string;
    dataTypes: string[];
  };
}

export interface KYCTier {
  limit: number;
  requirements: string[];
  documents: string[];
}

export interface TransactionMonitoring {
  enabled: boolean;
  thresholds: {
    singleTransaction: number;
    dailyVolume: number;
    monthlyVolume: number;
  };
  alerts: string[];
}

export interface SanctionsScreening {
  enabled: boolean;
  lists: string[];
  screeningFrequency: string;
}

export interface STRReporting {
  enabled: boolean;
  reportingTimeframe: string;
  authority: string;
}

export interface RiskLevel {
  criteria: string[];
  monitoring: string;
}

export interface Corridor {
  id: string;
  country: string;
  selectedPartner?: Partner;
  complianceTemplate?: ComplianceTemplate;
  status: 'configuring' | 'testing' | 'ready' | 'launched';
  createdAt: Date;
  estimatedLaunchDate?: Date;
}

export interface LaunchChecklist {
  partnerSelected: boolean;
  regulatoryReviewed: boolean;
  complianceConfigured: boolean;
  integrationTested: boolean;
  documentationComplete: boolean;
}