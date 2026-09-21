import type { ConditionItem } from '../types';

export const conditionsData: ConditionItem[] = [
  {
    id: 'back-pain',
    title: 'Back Pain',
    description: 'Relief for acute sciatica, herniated discs, lower back stiffness, and muscle spasms.',
    iconName: 'Activity',
    region: 'spine',
  },
  {
    id: 'neck-pain',
    title: 'Neck Pain',
    description: 'Targeted therapy for cervical strain, stiffness, pinched nerves, and posture headaches.',
    iconName: 'Zap',
    region: 'spine',
  },
  {
    id: 'sports-injuries',
    title: 'Sports Injuries',
    description: 'Specialized management of muscle sprains, ligament tears, tendinitis, and athletic strain.',
    iconName: 'Trophy',
    region: 'sports',
  },
  {
    id: 'joint-pain',
    title: 'Joint Pain',
    description: 'Restorative care for knee arthritis, frozen shoulder, hip stiffness, and ankle instability.',
    iconName: 'Shield',
    region: 'joint',
  },
  {
    id: 'post-surgery',
    title: 'Post-Surgery Recovery',
    description: 'Step-by-step rehabilitation following ACL reconstruction, joint replacements, and spinal surgeries.',
    iconName: 'HeartPulse',
    region: 'postop',
  },
  {
    id: 'muscle-injuries',
    title: 'Muscle Injuries',
    description: 'Ultrasound, dry needling, and tissue therapy for hamstring pulls, calf tears, and groin strains.',
    iconName: 'Flame',
    region: 'sports',
  },
  {
    id: 'posture-problems',
    title: 'Posture Problems',
    description: 'Correction of forward-head syndrome, rounded shoulders, and desk-bound spinal strain.',
    iconName: 'UserCheck',
    region: 'spine',
  },
  {
    id: 'mobility-issues',
    title: 'Mobility Issues',
    description: 'Gait retraining, balance improvement, and flexibility restoration for active living.',
    iconName: 'Compass',
    region: 'joint',
  },
];
