using System;
using Microsoft.AspNetCore.Mvc;
using core.Tools;
using core.Models;
using bll.Bases;
using bll.Extensions;
using dto.Models;
using core.Filters;
using System.Collections.Generic;
using System.Linq;

namespace api.Controllers
{
    [ApiController]
    [AuthApiFilter]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _AccountService;

        private readonly IIncomeService _IncomeService;

        private readonly IExpenseService _ExpenseService;

        private readonly ILoanService _LoanService;

        private readonly ICreditCardPeriodService _CreditCardPeriodService;

        public AccountController(
            IAccountService _accountService,
            IIncomeService _iIncomeService,
            IExpenseService _expenseService,
            ILoanService _loanService,
            ICreditCardPeriodService _creditCardPeriodService)
        {
            _AccountService = _accountService;

            _IncomeService = _iIncomeService;

            _ExpenseService = _expenseService;

            _LoanService = _loanService;

            _CreditCardPeriodService = _creditCardPeriodService;
        }

        [HttpGet]
        public Response GetAll()
        {
            var _result = new Response();

            try
            {
                var _userId = HttpTool.Instance.GetUserId();

                _result.Data = _AccountService.
                    GetAll(_userId).
                    OrderByDescending(x => x.Date).
                    ToList();

                _result.Success = true;
            }
            catch (Exception _ex)
            {
                LogTool.Instance.Error(_ex);
            }

            return _result;
        }

        [HttpPost]
        public Response Add(AccountDto _dto)
        {
            var _result = new Response();

            try
            {
                _dto.Id = _AccountService.Add(_dto);

                _result.Data = _dto;

                _result.Success = true;
            }
            catch (Exception _ex)
            {
                LogTool.Instance.Error(_ex);
            }

            return _result;
        }

        [HttpPut]
        public Response Update(AccountDto _dto)
        {
            var _result = new Response();

            try
            {
                var _userId = HttpTool.Instance.GetUserId();

                if (!_AccountService.Any(x => x.UserId == _userId && x.Id == _dto.Id))
                {
                    _result.Message = "the account is not yours.";

                    return _result;
                }

                _AccountService.Update(_dto);

                _result.Data = _dto;

                _result.Success = true;
            }
            catch (Exception _ex)
            {
                LogTool.Instance.Error(_ex);
            }

            return _result;
        }

        [HttpDelete]
        [Route("{_id}")]
        public Response Remove(long _id)
        {
            var _result = new Response();

            try
            {
                var _userId = HttpTool.Instance.GetUserId();

                if (!_AccountService.Any(x => x.UserId == _userId && x.Id == _id))
                {
                    _result.Message = "the account is not yours.";

                    return _result;
                }

                _AccountService.Remove(_id);

                _result.Success = true;
            }
            catch (Exception _ex)
            {
                LogTool.Instance.Error(_ex);
            }

            return _result;
        }

        [HttpGet]
        [Route("statements/{_year}")]
        public Response GetStatements(int _year)
        {
            var _result = new Response();

            try
            {
                var _userId = HttpTool.Instance.GetUserId();

                var _now = DateTime.Now;

                var _statements = new List<AccountStatementDto>();

                var _month = _year == _now.Year ? _now.Month : 12;

                for (int i = _month; i > 0; i--)
                {
                    var _currentDate = new DateTime(_year, i, 1);

                    var _minDate = _currentDate.AddDays(-1);

                    var _maxDate = i != 12 ?
                        new DateTime(_year, i + 1, 1) :
                        new DateTime(_year, i, 31);

                    var _incomes = _IncomeService.
                        GetAll(x =>
                            x.UserId == _userId &&
                            x.Period > _minDate &&
                            x.Period < _maxDate).
                        ToList();

                    var _expenses = _ExpenseService.
                        GetAll(x =>
                            x.UserId == _userId &&
                            x.Period > _minDate &&
                            x.Period < _maxDate).
                        ToList();

                    var _loans = _LoanService.
                        GetAll(
                            x =>
                                x.UserId == _userId &&
                                x.Period <= _currentDate,
                            _currentDate).
                        Where(x =>
                            (
                                x.Closed &&
                                x.Period <= _currentDate &&
                                _currentDate < x.ClosedPeriod) ||
                            (
                                !x.Closed &&
                                !x.IsCompleted &&
                                x.CurrentInstallment > 0)).
                        ToList();

                    var _creditCards = _CreditCardPeriodService.
                        GetAll(
                            x =>
                                x.CreditCard.UserId == _userId &&
                                x.Period > _minDate && x.Period < _maxDate,
                            true).
                        ToList();

                    var _currentStatement = new AccountStatementDto
                    {
                        CreditCardAmount = Math.Round(
                            _creditCards.Sum(x => x.Amount),
                            2),
                        CreditCardInstallmentAmount = Math.Round(
                            _creditCards.Sum(x => x.InstallmentAmount),
                            2),
                        ExpenseAmount = Math.Round(
                            _expenses.Sum(x => x.Amount),
                            2),
                        IncomeAmount = Math.Round(
                            _incomes.Sum(x => x.Amount),
                            2),
                        LoanAmount = Math.Round(
                            _loans.Sum(x => x.Amount),
                            2),
                        Period = _currentDate,
                    };

                    _currentStatement.Summary = Math.Round(
                        _currentStatement.IncomeAmount -
                        _currentStatement.ExpenseAmount -
                        _currentStatement.CreditCardAmount -
                        _currentStatement.LoanAmount, 2);

                    _statements.Add(_currentStatement);
                }

                _result.Data = _statements;

                _result.Success = true;
            }
            catch (Exception _ex)
            {
                LogTool.Instance.Error(_ex);
            }

            return _result;
        }

        [HttpGet]
        [Route("statement/{_year}/{_month}")]
        public Response GetStatementDetails(int _year, int _month)
        {
            var _result = new Response();

            try
            {
                var _userId = HttpTool.Instance.GetUserId();

                var _now = DateTime.Now;

                var _details = new List<AccountStatementDetail>();

                var _currentDate = new DateTime(_year, _month, 1);

                var _minDate = _currentDate.AddDays(-1);

                var _maxDate = _month != 12 ?
                    new DateTime(_year, _month + 1, 1) :
                    new DateTime(_year, _month, 31);

                var _incomes = _IncomeService.
                    GetAll(x =>
                        x.UserId == _userId &&
                        x.Period > _minDate &&
                        x.Period < _maxDate).
                    ToList();

                var _expenses = _ExpenseService.
                    GetAll(x =>
                        x.UserId == _userId &&
                        x.Period > _minDate &&
                        x.Period < _maxDate).
                    ToList();

                var _loans = _LoanService.
                    GetAll(
                        x =>
                            x.UserId == _userId &&
                            x.Period <= _currentDate,
                        _currentDate).
                    Where(x =>
                        (
                            x.Closed &&
                            x.Period <= _currentDate &&
                            _currentDate < x.ClosedPeriod) ||
                        (
                            !x.Closed &&
                            !x.IsCompleted &&
                            x.CurrentInstallment > 0)).
                    ToList();

                var _creditCards = _CreditCardPeriodService.
                    GetAll(
                        x =>
                            x.CreditCard.UserId == _userId &&
                            x.Period > _minDate && x.Period < _maxDate,
                        true).
                    ToList();

                foreach (var _income in _incomes)
                {
                    _details.Add(new AccountStatementDetail
                    {
                        Amount = _income.Amount,
                        Name = _income.Name,
                        Type = "income"
                    });
                }

                foreach (var _expense in _expenses)
                {
                    _details.Add(new AccountStatementDetail
                    {
                        Amount = _expense.Amount * -1,
                        Name = _expense.Name,
                        Type = "expense"
                    });
                }

                foreach (var _loan in _loans)
                {
                    _details.Add(new AccountStatementDetail
                    {
                        Amount = _loan.Amount * -1,
                        Name = _loan.Name,
                        Type = "loan"
                    });
                }

                foreach (var _creditCard in _creditCards)
                {
                    _details.Add(new AccountStatementDetail
                    {
                        Amount = _creditCard.Amount * -1,
                        Name = _creditCard.CreditCardName,
                        Type = "credit card"
                    });
                }

                _result.Data = _details;

                _result.Success = true;
            }
            catch (Exception _ex)
            {
                LogTool.Instance.Error(_ex);
            }

            return _result;
        }

        [HttpGet]
        [Route("[action]")]
        public Response GetTypes()
        {
            var _result = new Response();

            try
            {
                _result.Data = _AccountService.
                    GetTypes().
                    ToList();

                _result.Success = true;
            }
            catch (Exception _ex)
            {
                LogTool.Instance.Error(_ex);
            }

            return _result;
        }
    }
}