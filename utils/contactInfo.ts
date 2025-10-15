const DEFAULT_COMPANY_NAME = 'UAB „ORTOPEDIJOS PASLAUGŲ KLINIKA“';
const DEFAULT_EMAIL = 'info@mocc.lt';
const DEFAULT_ADDRESS = 'Laisvės pr. 77, Vilnius';
const DEFAULT_GMAPS_URL = 'https://goo.gl/maps/RVoW7FDnbvK3EUiBA';
const DEFAULT_PHONE = '+370 607 92111';

const trimOrUndefined = (value?: string | null) => value?.trim() || undefined;

export const COMPANY_NAME = trimOrUndefined(process.env.NEXT_PUBLIC_COMPANY_NAME) ?? DEFAULT_COMPANY_NAME;
export const COMPANY_EMAIL = trimOrUndefined(process.env.NEXT_PUBLIC_EMAIL) ?? DEFAULT_EMAIL;
export const COMPANY_ADDRESS = trimOrUndefined(process.env.NEXT_PUBLIC_ADDRESS) ?? DEFAULT_ADDRESS;
export const COMPANY_GMAPS_URL = trimOrUndefined(process.env.NEXT_PUBLIC_GMAPS_URL) ?? DEFAULT_GMAPS_URL;

const phoneDisplay = trimOrUndefined(process.env.NEXT_PUBLIC_PHONE) ?? DEFAULT_PHONE;
export const COMPANY_PHONE_DISPLAY = phoneDisplay;
export const COMPANY_PHONE_TEL = phoneDisplay.replace(/\s+/g, '');

export const COMPANY_WEBSITE_URL = trimOrUndefined(process.env.NEXT_PUBLIC_URL);
export const COMPANY_API_URL = trimOrUndefined(process.env.NEXT_PUBLIC_API_URL);
