using System;
using System.Collections.Generic;

namespace console.models
{
    public partial class User
    {
        public User()
        {
            Account = new HashSet<Account>();
            CreditCard = new HashSet<CreditCard>();
            Expense = new HashSet<Expense>();
            Income = new HashSet<Income>();
            Loan = new HashSet<Loan>();
            Project = new HashSet<Project>();
        }

        public long Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }

        public virtual ICollection<Account> Account { get; set; }
        public virtual ICollection<CreditCard> CreditCard { get; set; }
        public virtual ICollection<Expense> Expense { get; set; }
        public virtual ICollection<Income> Income { get; set; }
        public virtual ICollection<Loan> Loan { get; set; }
        public virtual ICollection<Project> Project { get; set; }
    }
}
