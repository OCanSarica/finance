import { combineReducers } from 'redux';
import AuthenticationReducer from './AuthenticationReducer';
import IncomeReducer from './IncomeReducer';
import ExpenseReducer from './ExpenseReducer';
import LoanReducer from './LoanReducer';
import CreditCardReducer from './CreditCardReducer';
import CreditCardInstallmentReducer from './CreditCardInstallmentReducer';
import CreditCardPeriodReducer from './CreditCardPeriodReducer';
import AccountReducer from './AccountReducer';
import UserReducer from './UserReducer';
import UIReducer from './UIReducer';
import DefReducer from './DefReducer';
import ProjectReducer from './ProjectReducer';
import ProjectItemReducer from './ProjectItemReducer';

export default combineReducers({
    AuthenticationReducer,
    IncomeReducer,
    ExpenseReducer,
    LoanReducer,
    CreditCardReducer,
    CreditCardInstallmentReducer,
    CreditCardPeriodReducer,
    AccountReducer,
    UserReducer,
    UIReducer,
    DefReducer,
    ProjectReducer,
    ProjectItemReducer,
});