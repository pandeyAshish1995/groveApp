import {combineReducers} from 'redux';
import LoginReducer from './loginReducer';
import GrooveSellVendorReducer from './GrooveFunnelVendorReducer';
import GrooveFunnelVendorTransactionsReducer from './GrooveFunnelVendorTransactionsReducer';
import GrooveFunnelAffiliateReducer from './GrooveFunnelAffiliateReducer';
import GrooveFunnelAffiliateTransactionsReducer from './GrooveFunnelAffiliateTransactionsReducer';
import {SIGNOUT} from '../constants';
import GrooveMailListsReducer from './GrooveMailListsReducer';
import GrooveMailFormReducer from './GrooveMailFormReducer';
import GrooveMailBroadcastReducer from './GrooveMailBroadcastReducer';
import GrooveMailDashboardReducer from './GrooveMailDashboardReducer';
import GrooveVideoDashboardReducer from './GrooveVideoDashboardReducer';
import GrooveVideoAnalyticsReducer from './GrooveVideoAnalyticsReducer';
import GrooveMemberReducer from './GrooveMemberReducer';
import GroovePagesDashboardReducer from './GroovePagesDashboardReducer';

const appReducer = combineReducers({
  login: LoginReducer,
  grooveSellVendor: GrooveSellVendorReducer,
  grooveSellAffiliate: GrooveFunnelAffiliateReducer,
  grooveSellVendorTransactions: GrooveFunnelVendorTransactionsReducer,
  grooveSellAffiliateTransactions: GrooveFunnelAffiliateTransactionsReducer,
  grooveMailList: GrooveMailListsReducer,
  grooveMailForm: GrooveMailFormReducer,
  grooveMailBroadcast: GrooveMailBroadcastReducer,
  grooveMailDashboard: GrooveMailDashboardReducer,
  grooveVideoDashboard: GrooveVideoDashboardReducer,
  grooveVideoAnalytics: GrooveVideoAnalyticsReducer,
  grooveMember: GrooveMemberReducer,
  groovePagesDashboard: GroovePagesDashboardReducer,
});

const rootReducer = (state, action) => {
  if (action.type === SIGNOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
