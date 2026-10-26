// Bank transfer details for donations. accountName must match the bank's
// records exactly, or donors' banks will show a Confirmation of Payee warning.
export const bank = {
  accountName: 'Love Is Still The Answer Ltd',
  sortCode: '608371', // 6 digits, shown as 60-83-71
  accountNumber: '20981173',
  reference: 'LISTA DONATION', // max 18 characters for Faster Payments
};

// Trading disclosures required on the website of a UK limited company.
export const company = {
  name: 'Love Is Still The Answer Ltd',
  number: '17336311',
  registeredIn: 'England and Wales',
  url: 'https://find-and-update.company-information.service.gov.uk/company/17336311',
};
