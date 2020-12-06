import {
  FETCH_GROOVE_MAIL_BROADCAST_DATA_START,
  FETCH_GROOVE_MAIL_BROADCAST_DATA_SUCCESS,
  GROOVE_MAIL_BROADCAST_SET_DATA,
  GROOVE_MAIL_STOP_CAMPAIGN_BROADCAST,
  GROOVE_MAIL_SEND_NOW_BROADCAST,
  // GROOVE_MAIL_SEND_NOW_BROADCAST_SUCCESS,
} from '../constants';

import * as Storage from '../../utils/AsyncStorage';
import APICaller from '../../utils/APICaller';

export const actionForFetchGrooveMailBroadcastData = () => async (
  dispatch,
  getState,
) => {
  dispatch({type: FETCH_GROOVE_MAIL_BROADCAST_DATA_START});
  try {
    const url = 'groovemail/campaign';
    const user = await Storage.get('user');
    const token = user && user.token;
    const response = await APICaller({
      url,
      method: 'GET',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log('response.data broadcast', response.data?.data?.data);
    response &&
      response?.data &&
      dispatch({
        type: FETCH_GROOVE_MAIL_BROADCAST_DATA_SUCCESS,
        payload: response.data?.data?.data,
      });
  } catch (error) {
    console.log('error ----------', error);
  }
};

export const actionForGrooveMailBroadcastSetData = (data) => ({
  type: GROOVE_MAIL_BROADCAST_SET_DATA,
  payload: data,
});

export const actionForGrooveMailStopCampaignBroadcast = (campId) => async (
  dispatch,
  getState,
) => {
  dispatch({type: GROOVE_MAIL_STOP_CAMPAIGN_BROADCAST});
  try {
    const url = 'groovemail/stop/campaign';
    const user = await Storage.get('user');
    const token = user && user.token;
    const response = await APICaller({
      url,
      data: {camp_id: campId},
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    response.data === 1 &&
      response.status === 200 &&
      dispatch(actionForFetchGrooveMailBroadcastData());
  } catch (error) {
    console.log('error -------', error);
  }
};

export const actionForGrooveMailArchiveCampaignBroadcast = (campId) => async (
  dispatch,
  getState,
) => {
  dispatch({type: GROOVE_MAIL_STOP_CAMPAIGN_BROADCAST});
  try {
    const url = `groovemail/campaign/${campId}`;
    const user = await Storage.get('user');
    const token = user && user.token;
    // console.log('Token Archive >>>>', token);
    const response = await APICaller({
      url,
      method: 'DELETE',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log('response Archive >>>>>>', response);
    response.status === 200 &&
      dispatch(actionForFetchGrooveMailBroadcastData());
  } catch (error) {
    console.log('error --------', error);
  }
};

export const actionForGrooveMailSendNowBroadCast = (data) => async (
  dispatch,
  getState,
) => {
  dispatch({type: GROOVE_MAIL_SEND_NOW_BROADCAST});
  try {
    // console.log('actionForGrooveMailSendNowBroadCast', data);
    const {
      name = null,
      description = null,
      sender_id = null,
      sendername = null,
      senderemail = null,
      replyemail = null,
      method = null,
      gateway = null,
      id = null,
      conditions = null,
      emailtype = null,
      subject = null,
      previewtext = null,
      message = null,
      emailscheduled = null,
      sheduledtime = null,
    } = data;
    let url = `groovemail/campaign/${id}`;
    const user = await Storage.get('user');
    const token = user && user.token;
    let response = await APICaller({
      url,
      method: 'POST',
      data: {
        name,
        description,
        sender_id,
        sendername,
        senderemail,
        replyemail,
        method,
        gateway,
        conditions,
        emailtype,
        subject,
        previewtext,
        message,
        emailscheduled: 'sendnow',
        sheduledtime,
        _method: 'PUT',
      },
      isFormData: true,
      headers: {
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(
    //   'response >>>>>>>>>> GrooveMailBroadCast sendNow function',
    //   response,
    // );
    if (response.status === 200) {
      url = `groovemail/sendemailleads/${id}`;
      const res = await APICaller({
        method: 'GET',
        url,
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log('Second res', res);
      res?.data?.status === 'success' &&
        dispatch(actionForFetchGrooveMailBroadcastData());
    }
  } catch (error) {
    console.log('error ----------', error);
  }
};

export const actionForGrooveMailDeleteCampaignBroadcast = (campId) => async (
  dispatch,
  getState,
) => {
  dispatch({type: GROOVE_MAIL_STOP_CAMPAIGN_BROADCAST});
  try {
    const url = `groovemail/delete/campaign`;
    const user = await Storage.get('user');
    const token = user && user.token;
    const response = await APICaller({
      url,
      method: 'POST',
      data: {campaign_id: campId},
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    response.status === 200 &&
      dispatch(actionForFetchGrooveMailBroadcastData());
  } catch (error) {
    console.log('error --------', error);
  }
};
