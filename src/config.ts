// Bank transfer details for donations. accountName must match the bank's
// records exactly, or donors' banks will show a Confirmation of Payee warning.
export const bank = {
  accountName: 'Love Is Still The Answer Ltd',
  sortCode: '608371', // 6 digits, shown as 60-83-71
  accountNumber: '20981173',
  reference: 'DONATION', // max 18 characters for Faster Payments
};

// Trading disclosures required on the website of a UK limited company.
export const company = {
  name: 'Love Is Still The Answer Ltd',
  number: '17336311',
  registeredIn: 'England and Wales',
  url: 'https://find-and-update.company-information.service.gov.uk/company/17336311',
};

// What people can pay for on the /pay page (the QR code at gigs).
// /pay#tshirt and /pay#donate open the page with that option selected, so each
// can have its own QR code. The first option here is the default.
export interface PayOption {
  id: string; // used in the URL: /pay#<id>
  label: string; // big text on the choice button
  summary: string; // small text under it
  amount: number | null; // pounds; null means the payer chooses how much
  reference: string; // max 18 characters for Faster Payments
  // Link to a third-party card checkout (a SumUp or Stripe payment link).
  // PASTE IT between the quotes, e.g. 'https://pay.sumup.com/b2c/XXXXXXXX'.
  // While it is '' the "Pay by card" button is not shown for this option.
  // It must start with https:// (the build stops with an error if not).
  cardLink: string;
  afterPay?: string; // extra last step shown once they have paid
  atStall?: string; // shown first, for paying in person on the card reader
}

export const payOptions: PayOption[] = [
  {
    id: 'tshirt',
    label: 'T-shirt',
    summary: '£28',
    amount: 28,
    reference: 'TSHIRT',
    cardLink: 'https://pay.sumup.com/b2c/QM13MK8U', // £28 T-shirt, reusable SumUp link
    afterPay: 'Show your payment confirmation at the stall and pick your size.',
    atStall: 'At the stall? Just tap your card or phone on our card reader.',
  },
  {
    id: 'donate',
    label: 'Donation',
    summary: 'Any amount',
    amount: null,
    reference: bank.reference,
    cardLink: 'https://pay.sumup.com/b2c/QO6JZDSM', // open-amount donation, reusable SumUp link
  },
];
