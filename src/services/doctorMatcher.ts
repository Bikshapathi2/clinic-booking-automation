export interface DoctorInfo {
  id: string;
  name: string;
  specialty: string;
  qualifications: string;
  experience: string;
  department: string;
  description: string;
  matchingKeywords: string[];
}

export const DOCTOR_REGISTRY: DoctorInfo[] = [
  {
    id: 'DOC-101',
    name: 'Dr. Sneha Reddy',
    specialty: 'Dental Specialist & Oral Surgeon',
    qualifications: 'B.D.S, M.D.S (Oral & Maxillofacial Surgery)',
    experience: '12+ Years Experience',
    department: 'Dental Science',
    description: 'Expert in toothaches, cavity restorations, root canals, wisdom tooth extractions, and oral hygiene.',
    matchingKeywords: ['tooth', 'dental', 'teeth', 'gum', 'cavity', 'root canal', 'mouth', 'jaw', 'molar', 'toothache']
  },
  {
    id: 'DOC-102',
    name: 'Dr. Rajesh Gupta',
    specialty: 'Cardiologist & Heart Specialist',
    qualifications: 'M.B.B.S, M.D. (Internal Medicine), D.M. (Cardiology)',
    experience: '18+ Years Experience',
    department: 'Cardiology',
    description: 'Specializes in chest discomfort, high blood pressure, heart rhythm disorders, and cardiovascular health.',
    matchingKeywords: ['heart', 'chest', 'cardio', 'blood pressure', 'bp', 'palpitation', 'breath', 'cardiac', 'pulse']
  },
  {
    id: 'DOC-103',
    name: 'Dr. Kavita Sharma',
    specialty: 'Dermatologist & Skin Care Expert',
    qualifications: 'M.B.B.S, M.D. (Dermatology, Venereology & Leprosy)',
    experience: '10+ Years Experience',
    department: 'Dermatology',
    description: 'Specialized diagnosis for skin rashes, allergic reactions, acne, scalp conditions, and skin infections.',
    matchingKeywords: ['skin', 'rash', 'allergy', 'itching', 'acne', 'pimple', 'eczema', 'scalp', 'hair', 'dermatology']
  },
  {
    id: 'DOC-104',
    name: 'Dr. Anil Kumar',
    specialty: 'Senior General Physician & Internal Medicine',
    qualifications: 'M.B.B.S, M.D. (General Medicine)',
    experience: '15+ Years Experience',
    department: 'Internal Medicine',
    description: 'Comprehensive treatment for general fever, viral infections, cough & cold, fatigue, stomach pain, and routine health checks.',
    matchingKeywords: ['fever', 'cold', 'cough', 'headache', 'flu', 'stomach', 'pain', 'infection', 'fatigue', 'weakness', 'body ache', 'general', 'checkup']
  }
];

export function autoAssignDoctor(problemText: string): { doctor: DoctorInfo; matchReason: string } {
  if (!problemText || problemText.trim() === '') {
    const defaultDoc = DOCTOR_REGISTRY[3]; // Dr. Anil Kumar
    return {
      doctor: defaultDoc,
      matchReason: 'Assigned Senior General Physician for general health consultation.'
    };
  }

  const lowerText = problemText.toLowerCase();

  for (const doc of DOCTOR_REGISTRY) {
    const matchedKeyword = doc.matchingKeywords.find(kw => lowerText.includes(kw));
    if (matchedKeyword) {
      return {
        doctor: doc,
        matchReason: `Auto-assigned based on medical keyword "${matchedKeyword}" related to ${doc.department}.`
      };
    }
  }

  // Fallback to General Physician
  return {
    doctor: DOCTOR_REGISTRY[3],
    matchReason: 'Assigned Senior General Physician for preliminary medical assessment.'
  };
}
