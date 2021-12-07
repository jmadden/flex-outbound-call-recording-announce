import { Manager } from '@twilio/flex-ui';
const manager = Manager.getInstance();

export const updateConference = async (conferenceSid, announceUrl) => {
  console.debug('Updating Conference:', conferenceSid);
  const fetchUrl = `${process.env.FLEX_APP_FUNCTIONS_BASE}/update-conference`;
  const fetchBody = {
    Token: manager.store.getState().flex.session.ssoTokenPayload.token,
    conferenceSid,
    announceUrl,
  };
  const fetchOptions = {
    method: 'POST',
    body: new URLSearchParams(fetchBody),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  };

  let conference;
  try {
    const response = await fetch(fetchUrl, fetchOptions);
    conference = await response.json();
    console.debug('Updated Conference:', conference);
  } catch (error) {
    console.error('Failed to update conference');
  }
  return conference;
};
