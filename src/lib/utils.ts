export function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export function getDiagnosisColor(diagnosis: string): string {
  const diagnosisMap: Record<string, string> = {
    'ADHD': 'warning',
    'Autism Spectrum': 'info',
    'ASD Level 1': 'info',
    'ASD Level 2': 'info',
    'ASD Level 3': 'info',
    'Dyslexia': 'secondary',
    'Speech Delay': 'default',
    'Dysgraphia': 'secondary'
  };
  
  return diagnosisMap[diagnosis] || 'default';
}