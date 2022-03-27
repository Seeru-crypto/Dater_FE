import config from '../config.json';

export const eventDataValidation = (name, date, description) => {
  const maxYear = config.CALENDAR_MAX_DATE.substring(0, 4);
  const minYear = config.CALENDAR_MIN_DATE.substring(0, 4);
  if (name.trim() === '' || name.trim().length > config.NAME_MAX_LEN) {
    return { result: false, property: 'name' };
  }
  if (date.toString().trim() === '' || date.toString().trim() === 'Invalid Date') {
    return { result: false, property: 'date' };
  }

  if (new Date(date).getFullYear() < parseInt(minYear, 10) || new Date(date).getFullYear() > parseInt(maxYear, 10)) {
    return { result: false, property: 'date' };
  }
  if (description.trim().length > config.DESC_MAX_LEN) {
    return { result: false, property: 'description' };
  }
  return { result: true };
};

export const adminDataValidation = (mailAdress, smsTo) => {
  const emailRes = adminEmailValidation(mailAdress);
  if (!emailRes.result) return emailRes;

  const smsRes = adminSmsValidation(smsTo);
  if (!smsRes.result) return smsRes;

  return { result: true };
};

export const adminEmailValidation = (mailAddress) => {
  const mailRegex = new RegExp(config.EMAIL_REGEX);

  if (mailAddress.length > config.MAX_EMAIL_LENGTH) {
    return { result: false, property: 'userMailAddressLength' };
  }

  if (mailAddress.length !== 0 && !mailRegex.test(mailAddress)) {
    return { result: false, property: 'userMailAddressInvalid' };
  }
  return { result: true };
};

export const adminSmsValidation = (smsTo) => {
  const smsRegex = new RegExp(config.PHONE_NR_REGEX);

  if (smsTo.length !== 0 && !smsRegex.test(smsTo)) {
    return { result: false, property: 'userSmsToInvalid' };
  }

  return { result: true };
};
