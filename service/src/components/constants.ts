export enum OrderStatus {
    InProcess = 'IN_PROCESS',
    Done = 'DONE'
}

export const validationPatterns = [
  {
    id: 'startDate_before_endDate',
    keys: ['startDate', 'endDate'],
    pattern: '{{startDate}}: ##startDate## must be before than {{endDate}}: ##endDate##',
  },
  {
    id: 'startDate_before_expiredDate',
    keys: ['startDate', 'expiredDate'],
    pattern: '{{startDate}}: ##startDate## must be before than {{expiredDate}}: ##expiredDate##',
  },
];
