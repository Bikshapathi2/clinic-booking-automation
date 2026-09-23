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
    matchingKeywords: ['heart', 'chest', 'cardio', 'blood pressure', 'bp', 'palpitation', 'cardiac', 'pulse']
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
    description: 'Comprehensive treatment for general fever, viral infections, cold, fatigue, stomach pain, and routine health checks.',
    matchingKeywords: ['fever', 'cold', 'flu', 'fatigue', 'weakness', 'body ache', 'general', 'checkup']
  },
  {
    id: 'DOC-105',
    name: 'Dr. Priya Ramesh',
    specialty: 'Gynecologist & Obstetrician',
    qualifications: 'M.B.B.S, M.D. (Obstetrics & Gynecology)',
    experience: '14+ Years Experience',
    department: 'Gynecology',
    description: 'Specializes in menstrual disorders, PCOS, pregnancy care, infertility evaluation, hormonal problems, and women’s reproductive health.',
    matchingKeywords: ['women', 'woman', 'female', 'period', 'periods', 'menstrual', 'pcos', 'pregnancy', 'pregnant', 'ovary', 'uterus', 'fertility', 'infertility', 'hormone', 'gynecology']
  },
  {
    id: 'DOC-106',
    name: 'Dr. Arjun Mehta',
    specialty: 'Urologist & Men’s Health Specialist',
    qualifications: 'M.B.B.S, M.S. (General Surgery), M.Ch. (Urology)',
    experience: '16+ Years Experience',
    department: 'Urology',
    description: 'Specializes in urinary problems, kidney stones, prostate conditions, male reproductive health, and urinary tract disorders.',
    matchingKeywords: ['men', 'man', 'male', 'urology', 'urine', 'urinary', 'kidney stone', 'kidney', 'prostate', 'bladder', 'male health', 'erectile', 'testicle']
  },
  {
    id: 'DOC-107',
    name: 'Dr. Meera Nair',
    specialty: 'Pediatrician & Child Health Specialist',
    qualifications: 'M.B.B.S, M.D. (Pediatrics)',
    experience: '13+ Years Experience',
    department: 'Pediatrics',
    description: 'Provides comprehensive healthcare for infants, children, and teenagers including fever, infections, nutrition, growth, and vaccinations.',
    matchingKeywords: ['child', 'children', 'kid', 'kids', 'baby', 'infant', 'pediatric', 'paediatric', 'newborn', 'vaccination', 'growth', 'nutrition']
  },
  {
    id: 'DOC-108',
    name: 'Dr. Vikram Singh',
    specialty: 'Orthopedic Surgeon & Bone Specialist',
    qualifications: 'M.B.B.S, M.S. (Orthopedics)',
    experience: '17+ Years Experience',
    department: 'Orthopedics',
    description: 'Specializes in bone and joint disorders, fractures, arthritis, back pain, sports injuries, and musculoskeletal conditions.',
    matchingKeywords: ['bone', 'bones', 'joint', 'joints', 'fracture', 'arthritis', 'back pain', 'knee', 'shoulder', 'neck pain', 'orthopedic', 'orthopaedic', 'injury']
  },
  {
    id: 'DOC-109',
    name: 'Dr. Neha Verma',
    specialty: 'ENT Specialist & Head and Neck Surgeon',
    qualifications: 'M.B.B.S, M.S. (ENT)',
    experience: '11+ Years Experience',
    department: 'ENT',
    description: 'Treats ear infections, hearing problems, sinusitis, throat infections, tonsils, nasal problems, and voice disorders.',
    matchingKeywords: ['ear', 'hearing', 'nose', 'throat', 'sinus', 'sinusitis', 'tonsil', 'voice', 'nasal', 'ent', 'earache', 'sore throat']
  },
  {
    id: 'DOC-110',
    name: 'Dr. Rohit Malhotra',
    specialty: 'Neurologist & Brain Specialist',
    qualifications: 'M.B.B.S, M.D. (Medicine), D.M. (Neurology)',
    experience: '19+ Years Experience',
    department: 'Neurology',
    description: 'Specializes in headaches, migraines, seizures, epilepsy, nerve disorders, dizziness, and neurological conditions.',
    matchingKeywords: ['brain', 'neurology', 'neurologist', 'headache', 'migraine', 'seizure', 'epilepsy', 'nerve', 'nerves', 'dizziness', 'memory', 'stroke']
  },
  {
    id: 'DOC-111',
    name: 'Dr. Ananya Rao',
    specialty: 'Psychiatrist & Mental Wellness Specialist',
    qualifications: 'M.B.B.S, M.D. (Psychiatry)',
    experience: '12+ Years Experience',
    department: 'Psychiatry',
    description: 'Provides evaluation and treatment for stress, anxiety, depression, sleep problems, mood disorders, and other mental health concerns.',
    matchingKeywords: ['mental', 'psychiatry', 'psychiatrist', 'anxiety', 'depression', 'stress', 'insomnia', 'mood', 'panic', 'emotional']
  },
  {
    id: 'DOC-112',
    name: 'Dr. Suresh Iyer',
    specialty: 'Gastroenterologist & Digestive Health Specialist',
    qualifications: 'M.B.B.S, M.D. (Medicine), D.M. (Gastroenterology)',
    experience: '16+ Years Experience',
    department: 'Gastroenterology',
    description: 'Specializes in acidity, gastritis, ulcers, indigestion, constipation, diarrhea, liver disorders, and digestive system conditions.',
    matchingKeywords: ['stomach', 'digestion', 'digestive', 'acidity', 'gas', 'gastric', 'gastritis', 'ulcer', 'constipation', 'diarrhea', 'liver', 'abdominal', 'abdomen']
  },
  {
    id: 'DOC-113',
    name: 'Dr. Pooja Kapoor',
    specialty: 'Endocrinologist & Diabetes Specialist',
    qualifications: 'M.B.B.S, M.D. (Medicine), D.M. (Endocrinology)',
    experience: '15+ Years Experience',
    department: 'Endocrinology',
    description: 'Specializes in diabetes, thyroid disorders, hormonal imbalances, obesity, metabolic disorders, and endocrine conditions.',
    matchingKeywords: ['diabetes', 'sugar', 'blood sugar', 'thyroid', 'insulin', 'obesity', 'weight', 'endocrine', 'metabolism']
  },
  {
    id: 'DOC-114',
    name: 'Dr. Sameer Khan',
    specialty: 'Pulmonologist & Respiratory Specialist',
    qualifications: 'M.B.B.S, M.D. (Pulmonary Medicine)',
    experience: '14+ Years Experience',
    department: 'Pulmonology',
    description: 'Treats asthma, breathing difficulties, chronic cough, bronchitis, respiratory infections, and other lung conditions.',
    matchingKeywords: ['lung', 'lungs', 'breathing', 'breath', 'asthma', 'respiratory', 'bronchitis', 'pneumonia', 'shortness of breath']
  },
  {
    id: 'DOC-115',
    name: 'Dr. Lakshmi Devi',
    specialty: 'Ophthalmologist & Eye Specialist',
    qualifications: 'M.B.B.S, M.S. (Ophthalmology)',
    experience: '13+ Years Experience',
    department: 'Ophthalmology',
    description: 'Specializes in vision problems, eye infections, cataracts, dry eyes, glaucoma screening, and general eye care.',
    matchingKeywords: ['eye', 'eyes', 'vision', 'sight', 'blurred vision', 'cataract', 'glaucoma', 'dry eyes', 'eye infection', 'spectacles', 'ophthalmology']
  },
  {
    id: 'DOC-116',
    name: 'Dr. Manish Agarwal',
    specialty: 'Nephrologist & Kidney Specialist',
    qualifications: 'M.B.B.S, M.D. (Medicine), D.M. (Nephrology)',
    experience: '17+ Years Experience',
    department: 'Nephrology',
    description: 'Specializes in kidney diseases, kidney function problems, high blood pressure related to kidneys, and chronic kidney conditions.',
    matchingKeywords: ['nephrology', 'creatinine', 'protein urine', 'renal', 'kidney disease', 'dialysis', 'swelling']
  },
  {
    id: 'DOC-117',
    name: 'Dr. Ritu Menon',
    specialty: 'Oncologist & Cancer Care Specialist',
    qualifications: 'M.B.B.S, M.D. (Medical Oncology)',
    experience: '18+ Years Experience',
    department: 'Oncology',
    description: 'Provides evaluation and medical management for various cancers with focus on diagnosis, treatment planning, and supportive cancer care.',
    matchingKeywords: ['cancer', 'tumor', 'oncology', 'oncologist', 'chemotherapy', 'lump', 'mass', 'breast cancer', 'cancer treatment']
  },
  {
    id: 'DOC-118',
    name: 'Dr. Deepak Joshi',
    specialty: 'General Surgeon & Surgical Specialist',
    qualifications: 'M.B.B.S, M.S. (General Surgery)',
    experience: '15+ Years Experience',
    department: 'General Surgery',
    description: 'Specializes in common surgical conditions including hernia, gallbladder problems, appendicitis, abscesses, and minor surgical procedures.',
    matchingKeywords: ['surgery', 'surgeon', 'hernia', 'appendix', 'appendicitis', 'gallbladder', 'gallstone', 'abscess', 'operation', 'surgical']
  },
  {
    id: 'DOC-119',
    name: 'Dr. Swathi Reddy',
    specialty: 'Obstetrician & High-Risk Pregnancy Specialist',
    qualifications: 'M.B.B.S, M.D. (Obstetrics & Gynecology), Fellowship in Maternal Medicine',
    experience: '12+ Years Experience',
    department: 'Obstetrics',
    description: 'Specializes in pregnancy monitoring, prenatal care, high-risk pregnancies, maternal health, and postnatal care.',
    matchingKeywords: ['prenatal', 'antenatal', 'postnatal', 'delivery', 'maternal', 'high risk pregnancy', 'obstetrics']
  },
  {
    id: 'DOC-120',
    name: 'Dr. Karthik Rao',
    specialty: 'Andrologist & Male Reproductive Health Specialist',
    qualifications: 'M.B.B.S, M.S. (General Surgery), Fellowship in Andrology',
    experience: '10+ Years Experience',
    department: 'Andrology',
    description: 'Focuses on male reproductive health, fertility concerns, hormonal issues, and male sexual health conditions.',
    matchingKeywords: ['andrology', 'male fertility', 'sperm', 'testosterone', 'male reproductive', 'sexual health']
  },
  {
    id: 'DOC-121',
    name: 'Dr. Asha Patel',
    specialty: 'Pediatric Neurologist & Child Brain Specialist',
    qualifications: 'M.B.B.S, M.D. (Pediatrics), D.M. (Pediatric Neurology)',
    experience: '11+ Years Experience',
    department: 'Pediatric Neurology',
    description: 'Specializes in neurological conditions affecting children including seizures, developmental concerns, headaches, and movement disorders.',
    matchingKeywords: ['child brain', 'child seizure', 'children seizure', 'pediatric neurology', 'pediatric neurologist', 'developmental delay', 'child headache']
  },
  {
    id: 'DOC-122',
    name: 'Dr. Nikhil Bansal',
    specialty: 'Pediatric Orthopedic Surgeon',
    qualifications: 'M.B.B.S, M.S. (Orthopedics), Fellowship in Pediatric Orthopedics',
    experience: '10+ Years Experience',
    department: 'Pediatric Orthopedics',
    description: 'Treats bone, joint, muscle, and movement-related conditions in infants, children, and adolescents.',
    matchingKeywords: ['child bone', 'children bone', 'child fracture', 'pediatric orthopedic', 'kid fracture', 'child joint', 'child knee', 'child walking', 'pediatric bone']
  },
  {
    id: 'DOC-123',
    name: 'Dr. Shalini Gupta',
    specialty: 'Pediatric Dentist & Child Dental Specialist',
    qualifications: 'B.D.S, M.D.S (Pediatric Dentistry)',
    experience: '9+ Years Experience',
    department: 'Pediatric Dentistry',
    description: 'Provides dental care for children including cavities, tooth pain, preventive dental care, dental hygiene, and developing teeth.',
    matchingKeywords: ['child tooth', 'child teeth', 'children dental', 'kids dental', 'baby teeth', 'milk teeth', 'child cavity', 'pediatric dentist', 'kid tooth', 'child toothache']
  },
  {
    id: 'DOC-124',
    name: 'Dr. Rahul Sharma',
    specialty: 'Pulmonologist & Sleep Medicine Specialist',
    qualifications: 'M.B.B.S, M.D. (Pulmonary Medicine), Fellowship in Sleep Medicine',
    experience: '13+ Years Experience',
    department: 'Sleep Medicine',
    description: 'Specializes in sleep-related breathing disorders, snoring, sleep apnea, chronic cough, and respiratory sleep problems.',
    matchingKeywords: ['snoring', 'sleep apnea', 'apnea', 'breathing sleep', 'sleep disorder', 'daytime sleepiness']
  },
  {
    id: 'DOC-125',
    name: 'Dr. Monica Thomas',
    specialty: 'Rheumatologist & Arthritis Specialist',
    qualifications: 'M.B.B.S, M.D. (Medicine), D.M. (Rheumatology)',
    experience: '14+ Years Experience',
    department: 'Rheumatology',
    description: 'Treats arthritis, joint inflammation, autoimmune conditions, muscle pain, stiffness, and chronic rheumatic diseases.',
    matchingKeywords: ['joint swelling', 'stiffness', 'autoimmune', 'rheumatology', 'muscle pain', 'inflammation', 'rheumatoid']
  },
  {
    id: 'DOC-126',
    name: 'Dr. Sanjay Rao',
    specialty: 'Physiotherapist & Rehabilitation Specialist',
    qualifications: 'B.P.T, M.P.T (Orthopedics)',
    experience: '12+ Years Experience',
    department: 'Physiotherapy',
    description: 'Provides rehabilitation and physical therapy for back pain, neck pain, sports injuries, joint problems, and post-surgical recovery.',
    matchingKeywords: ['physiotherapy', 'physio', 'physical therapy', 'rehabilitation', 'sports injury', 'exercise therapy', 'recovery']
  },
  {
    id: 'DOC-127',
    name: 'Dr. Kavya Reddy',
    specialty: 'Nutritionist & Clinical Dietitian',
    qualifications: 'M.Sc. (Clinical Nutrition), Registered Dietitian',
    experience: '9+ Years Experience',
    department: 'Nutrition & Dietetics',
    description: 'Provides personalized nutrition plans for diabetes, weight management, digestive health, pregnancy nutrition, and general wellness.',
    matchingKeywords: ['diet', 'dietitian', 'nutrition', 'nutritionist', 'weight loss', 'weight gain', 'food', 'meal plan', 'diabetes diet', 'pregnancy diet', 'healthy eating']
  },
  {
    id: 'DOC-128',
    name: 'Dr. Vivek Rao',
    specialty: 'Emergency Medicine Specialist',
    qualifications: 'M.B.B.S, M.D. (Emergency Medicine)',
    experience: '11+ Years Experience',
    department: 'Emergency Medicine',
    description: 'Provides immediate medical care for acute injuries, sudden illness, severe pain, breathing difficulties, and other urgent conditions.',
    matchingKeywords: ['emergency', 'urgent', 'accident', 'bleeding', 'fainting', 'unconscious', 'breathing emergency', 'trauma']
  },
  {
    id: 'DOC-129',
    name: 'Dr. Harini Rao',
    specialty: 'Plastic & Reconstructive Surgeon',
    qualifications: 'M.B.B.S, M.S. (General Surgery), M.Ch. (Plastic Surgery)',
    experience: '13+ Years Experience',
    department: 'Plastic Surgery',
    description: 'Specializes in reconstructive procedures, scar management, wound reconstruction, and selected cosmetic surgical procedures.',
    matchingKeywords: ['plastic surgery', 'reconstructive', 'scar', 'scars', 'wound', 'burn', 'reconstruction', 'cosmetic surgery']
  },
  {
    id: 'DOC-130',
    name: 'Dr. Ajay Kumar',
    specialty: 'Hematologist & Blood Disorder Specialist',
    qualifications: 'M.B.B.S, M.D. (Medicine), D.M. (Clinical Hematology)',
    experience: '15+ Years Experience',
    department: 'Hematology',
    description: 'Specializes in anemia, blood disorders, clotting problems, abnormal blood counts, and other hematological conditions.',
    matchingKeywords: ['blood disorder', 'anemia', 'anaemia', 'hemoglobin', 'platelets', 'clotting', 'blood count', 'hematology']
  },
  {
    id: 'DOC-131',
    name: 'Dr. Snehal Kapoor',
    specialty: 'Allergist & Immunology Specialist',
    qualifications: 'M.B.B.S, M.D. (Internal Medicine), Fellowship in Allergy & Immunology',
    experience: '10+ Years Experience',
    department: 'Allergy & Immunology',
    description: 'Diagnoses and manages allergies, allergic rhinitis, food allergies, asthma-related allergies, and immune system disorders.',
    matchingKeywords: ['allergic', 'allergies', 'sneezing', 'nasal allergy', 'food allergy', 'dust allergy', 'immunity', 'immune']
  },
  {
    id: 'DOC-132',
    name: 'Dr. Varun Reddy',
    specialty: 'Radiologist & Diagnostic Imaging Specialist',
    qualifications: 'M.B.B.S, M.D. (Radiodiagnosis)',
    experience: '12+ Years Experience',
    department: 'Radiology',
    description: 'Specializes in diagnostic imaging including X-rays, ultrasound, CT scans, MRI, and image-guided diagnostic procedures.',
    matchingKeywords: ['xray', 'x-ray', 'ultrasound', 'scan', 'ct scan', 'mri', 'imaging', 'radiology', 'diagnostic scan']
  },
  {
    id: 'DOC-133',
    name: 'Dr. Preethi Sharma',
    specialty: 'Gynecologist & PCOS Specialist',
    qualifications: 'M.B.B.S, M.D. (Obstetrics & Gynecology), Fellowship in Reproductive Medicine',
    experience: '11+ Years Experience',
    department: 'Women’s Health',
    description: 'Focuses on PCOS, irregular periods, hormonal disorders, reproductive health, fertility concerns, and preventive women’s healthcare.',
    matchingKeywords: ['women health', 'irregular periods', 'period problem', 'hormonal imbalance', 'reproductive health']
  },
  {
    id: 'DOC-134',
    name: 'Dr. Naveen Reddy',
    specialty: 'Cardiologist & Preventive Heart Specialist',
    qualifications: 'M.B.B.S, M.D. (Medicine), D.M. (Cardiology)',
    experience: '14+ Years Experience',
    department: 'Preventive Cardiology',
    description: 'Focuses on heart disease prevention, cholesterol management, hypertension, cardiac risk assessment, and lifestyle-based heart health.',
    matchingKeywords: ['heart checkup', 'cholesterol', 'heart health', 'cardiac risk', 'heart prevention', 'hypertension']
  },
  {
    id: 'DOC-135',
    name: 'Dr. Isha Malhotra',
    specialty: 'Family Medicine & Primary Care Specialist',
    qualifications: 'M.B.B.S, M.D. (Family Medicine)',
    experience: '12+ Years Experience',
    department: 'Family Medicine',
    description: 'Provides primary healthcare for adults, women, children, and families including routine checkups, common illnesses, and preventive care.',
    matchingKeywords: ['family', 'family doctor', 'primary care', 'routine checkup', 'health checkup', 'general doctor', 'wellness']
  },
  {
    id: 'DOC-136',
    name: 'Dr. Akash Verma',
    specialty: 'Pain Management Specialist',
    qualifications: 'M.B.B.S, M.D. (Anesthesiology), Fellowship in Pain Medicine',
    experience: '10+ Years Experience',
    department: 'Pain Management',
    description: 'Specializes in evaluation and management of chronic pain including back pain, neck pain, nerve pain, and musculoskeletal pain.',
    matchingKeywords: ['chronic pain', 'nerve pain', 'pain management']
  },
  {
    id: 'DOC-137',
    name: 'Dr. Nandini Rao',
    specialty: 'Geriatrician & Elderly Care Specialist',
    qualifications: 'M.B.B.S, M.D. (Geriatric Medicine)',
    experience: '13+ Years Experience',
    department: 'Geriatric Medicine',
    description: 'Provides comprehensive healthcare for older adults including chronic disease management, mobility concerns, medication review, and preventive care.',
    matchingKeywords: ['elderly', 'old age', 'senior citizen', 'senior', 'geriatric', 'aging', 'older adult', 'elder care', 'mobility']
  },
  {
    id: 'DOC-138',
    name: 'Dr. Rakesh Patel',
    specialty: 'Infectious Disease Specialist',
    qualifications: 'M.B.B.S, M.D. (Internal Medicine), D.M. (Infectious Diseases)',
    experience: '15+ Years Experience',
    department: 'Infectious Diseases',
    description: 'Specializes in diagnosis and management of bacterial, viral, fungal, and other infectious diseases and complicated infections.',
    matchingKeywords: ['bacterial', 'fungal', 'dengue', 'malaria', 'typhoid', 'infection specialist']
  },
  {
    id: 'DOC-139',
    name: 'Dr. Swetha Menon',
    specialty: 'Speech & Language Therapist',
    qualifications: 'M.Sc. (Speech-Language Pathology)',
    experience: '8+ Years Experience',
    department: 'Speech & Language Therapy',
    description: 'Helps children and adults with speech delays, language difficulties, pronunciation problems, voice disorders, and communication challenges.',
    matchingKeywords: ['speech', 'speech delay', 'language', 'talking', 'pronunciation', 'communication', 'child speech', 'stammering', 'stuttering']
  },
  {
    id: 'DOC-140',
    name: 'Dr. Imran Khan',
    specialty: 'Neurosurgeon & Spine Specialist',
    qualifications: 'M.B.B.S, M.S. (General Surgery), M.Ch. (Neurosurgery)',
    experience: '18+ Years Experience',
    department: 'Neurosurgery',
    description: 'Specializes in surgical management of brain, spine, nerve, and complex neurological conditions.',
    matchingKeywords: ['neurosurgery', 'brain surgery', 'spine', 'spinal', 'brain tumor', 'head injury', 'disc', 'slipped disc', 'spinal surgery']
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
