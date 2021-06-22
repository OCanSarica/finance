using core.Bases;
using core.Tools;
using dal.Entities;
using dto.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace bll.Extensions
{
    public static class DtoConverter
    {
        public static UserLog ConvertToEntity(this RequestLogUserDto _dto) =>
            new UserLog
            {
                Date = DateTime.Now,
                TypeDefid = (int)_dto.UserLogType,
                UserId = _dto.UserId,
                Ip = HttpTool.Instance.GetIpAddress()
            };

        #region income
        public static Income ConvertToEntity(this IncomeDto _dto) =>
            new Income
            {
                Id = _dto.Id,
                Amount = _dto.Amount,
                Name = _dto.Name,
                Period = new DateTime(_dto.Period.Year, _dto.Period.Month, 1),
                UserId = HttpTool.Instance.GetUserId()
            };

        public static IncomeDto ConvertToDto(this Income _entity) =>
            new IncomeDto
            {
                Amount = _entity.Amount,
                Id = _entity.Id,
                Name = _entity.Name,
                Period = _entity.Period
            };
        #endregion

        #region expense
        public static Expense ConvertToEntity(this ExpenseDto _dto) =>
            new Expense
            {
                Id = _dto.Id,
                Amount = _dto.Amount,
                Name = _dto.Name,
                Period = new DateTime(_dto.Period.Year, _dto.Period.Month, 1),
                UserId = HttpTool.Instance.GetUserId()
            };

        public static ExpenseDto ConvertToDto(this Expense _entity) =>
            new ExpenseDto
            {
                Amount = _entity.Amount,
                Id = _entity.Id,
                Name = _entity.Name,
                Period = _entity.Period
            };
        #endregion

        #region loan
        public static Loan ConvertToEntity(this LoanDto _dto)
        {
            _dto.Period = new DateTime(_dto.Period.Year, _dto.Period.Month, 1);

            DateTime? _closedPeriod = null;

            if (_dto.Closed && _dto.ClosedPeriod != null)
            {
                _closedPeriod = new DateTime(
                    _dto.ClosedPeriod.Value.Year,
                    _dto.ClosedPeriod.Value.Month, 1);
            }

            return new Loan
            {
                Id = _dto.Id,
                Amount = _dto.Amount,
                Installment = _dto.Installment,
                Name = _dto.Name,
                PrincipalAmount = _dto.PrincipalAmount,
                Period = _dto.Period,
                Closed = _dto.Closed,
                ClosedPeriod = _closedPeriod,
                UserId = HttpTool.Instance.GetUserId()
            };
        }

        public static LoanDto ConvertToDto(
            this Loan _entity,
            DateTime _referenceDate)
        {
            var _currentDate = new DateTime(_referenceDate.Year, _referenceDate.Month, 1);

            var _paidInstallment = (_currentDate.Year - _entity.Period.Year) * 12 +
                _currentDate.Month - _entity.Period.Month + 1;

            _paidInstallment = _paidInstallment < 0 ? 0 : _paidInstallment;

            var _currentInstallment = _paidInstallment < _entity.Installment ?
                _paidInstallment :
                _entity.Installment;

            return new LoanDto
            {
                Id = _entity.Id,
                Amount = _entity.Amount,
                Closed = _entity.Closed,
                ClosedPeriod = _entity.Closed ? _entity.ClosedPeriod : null,
                CurrentInstallment = _currentInstallment,
                Installment = _entity.Installment,
                IsCompleted = !_entity.Closed ?
                    _paidInstallment > _entity.Installment :
                    true,
                Name = _entity.Name,
                PrincipalAmount = _entity.PrincipalAmount,
                Period = _entity.Period,
                TotalAmount = _entity.Amount * _entity.Installment
            };
        }
        #endregion

        #region def_account_type
        public static DefAccountType ConvertToEntity(this DefAccountTypeDto _dto) =>
            new DefAccountType
            {
                Id = _dto.Id,
                Text = _dto.Text
            };

        public static DefAccountTypeDto ConvertToDto(this DefAccountType _entity) =>
            new DefAccountTypeDto
            {
                Id = _entity.Id,
                Text = _entity.Text
            };
        #endregion

        #region user
        public static User ConvertToEntity(this UserDto _dto) =>
            new User
            {
                Id = _dto.Id,
                Email = _dto.Email,
                Password = EncryptionTool.Instance.Encrypt(_dto.Password),
                Username = _dto.Username
            };

        public static UserDto ConvertToDto(this User _entity) =>
            new UserDto
            {
                Id = _entity.Id,
                Email = _entity.Email,
                Password = _entity.Password,
                Username = _entity.Username
            };
        #endregion

        #region account
        public static Account ConvertToEntity(this AccountDto _dto) =>
            new Account
            {
                Id = _dto.Id,
                Amount = _dto.Amount,
                Name = _dto.Name,
                Date = _dto.Date,
                TypeDefid = _dto.TypeDefid,
                UserId = HttpTool.Instance.GetUserId()
            };

        public static AccountDto ConvertToDto(this Account _entity) =>
            new AccountDto
            {
                Id = _entity.Id,
                Amount = _entity.Amount,
                Name = _entity.Name,
                Date = _entity.Date,
                TypeDefid = _entity.TypeDefid
            };
        #endregion

        #region credit_card
        public static CreditCard ConvertToEntity(this CreditCardDto _dto) =>

            new CreditCard
            {
                Id = _dto.Id,
                Name = _dto.Name,
                UserId = HttpTool.Instance.GetUserId()
            };

        public static CreditCardDto ConvertToDto(this CreditCard _entity) =>
            new CreditCardDto
            {
                Id = _entity.Id,
                Name = _entity.Name,
            };
        #endregion

        #region credit_card_installment
        public static CreditCardInstallment ConvertToEntity(
            this CreditCardInstallmentDto _dto)
        {
            _dto.Period = new DateTime(_dto.Period.Year, _dto.Period.Month, 1);

            return new CreditCardInstallment
            {
                Id = _dto.Id,
                CreditCardId = _dto.CreditCardId,
                Amount = _dto.Amount,
                Installment = _dto.Installment,
                Name = _dto.Name,
                Period = _dto.Period,
            };
        }

        public static CreditCardInstallmentDto ConvertToDto(
            this CreditCardInstallment _entity,
            DateTime _referenceDate)
        {
            var _currentDate = new DateTime(_referenceDate.Year, _referenceDate.Month, 1);

            var _paidInstallment = (_currentDate.Year - _entity.Period.Year) * 12 +
                _currentDate.Month - _entity.Period.Month + 1;

            _paidInstallment = _paidInstallment < 0 ? 0 : _paidInstallment;

            var _currentInstallment = _paidInstallment < _entity.Installment ?
                _paidInstallment :
                _entity.Installment;

            return new CreditCardInstallmentDto
            {
                Id = _entity.Id,
                Amount = _entity.Amount,
                CreditCardId = _entity.CreditCardId,
                CurrentInstallment = _currentInstallment,
                Installment = _entity.Installment,
                IsCompleted = _paidInstallment > _entity.Installment,
                Name = _entity.Name,
                Period = _entity.Period,
                TotalAmount = Math.Round(_entity.Amount * _entity.Installment, 2)
            };
        }
        #endregion

        #region #region credit_card_period
        public static CreditCardPeriod ConvertToEntity(
            this CreditCardPeriodDto _dto)
        {
            _dto.Period = new DateTime(_dto.Period.Year, _dto.Period.Month, 1);

            return new CreditCardPeriod
            {
                Id = _dto.Id,
                CreditCardId = _dto.CreditCardId,
                Amount = _dto.Amount,
                Period = _dto.Period
            };
        }

        public static CreditCardPeriodDto ConvertToDto(
            this CreditCardPeriod _entity,
            bool _calcInstallment)
        {
            double _installmentAmount = 0;

            if (_calcInstallment)
            {
                _installmentAmount = _entity.CreditCard.CreditCardInstallment.
                    Select(x => x.ConvertToDto(_entity.Period)).
                    Where(x =>
                        _entity.Period >= x.Period &&
                        !x.IsCompleted).
                    Sum(x => x.Amount);
            }

            return new CreditCardPeriodDto
            {
                Id = _entity.Id,
                Amount = _entity.Amount,
                CreditCardId = _entity.CreditCardId,
                CreditCardName = _entity.CreditCard?.Name,
                InstallmentAmount = _installmentAmount,
                Period = _entity.Period,
            };
        }
        #endregion

        #region project
        public static Project ConvertToEntity(this ProjectDto _dto) =>
            new Project
            {
                Id = _dto.Id,
                Date = _dto.Date,
                Name = _dto.Name,
                UserId = HttpTool.Instance.GetUserId()
            };

        public static ProjectDto ConvertToDto(this Project _entity) =>
            new ProjectDto
            {
                Amount = _entity.ProjectItem.Sum(x => !x.IsIncome ? x.Amount * -1 : x.Amount),
                Id = _entity.Id,
                Date = _entity.Date,
                Name = _entity.Name,
            };
        #endregion

        #region project item
        public static ProjectItem ConvertToEntity(this ProjectItemDto _dto) =>
            new ProjectItem
            {
                Id = _dto.Id,
                Amount = _dto.Amount,
                Name = _dto.Name,
                IsIncome = _dto.IsIncome,
                Period = _dto.Period,
                ProjectId = _dto.ProjectId
            };

        public static ProjectItemDto ConvertToDto(this ProjectItem _entity) =>
            new ProjectItemDto
            {
                Id = _entity.Id,
                Amount = _entity.Amount,
                Name = _entity.Name,
                IsIncome = _entity.IsIncome,
                Period = _entity.Period,
                ProjectId = _entity.ProjectId
            };
        #endregion
    }
}
