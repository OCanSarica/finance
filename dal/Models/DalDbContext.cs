using Microsoft.EntityFrameworkCore;
using dal.Entities;

namespace dal.Models
{
    public partial class DalDbContext : DbContext
    {
        public DalDbContext(DbContextOptions<DalDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<CreditCard> CreditCard { get; set; }
        public virtual DbSet<DefAccountType> DefAccountType { get; set; }
        public virtual DbSet<Account> Account { get; set; }
        public virtual DbSet<CreditCardInstallment> CreditCardInstallment { get; set; }
        public virtual DbSet<CreditCardPeriod> CreditCardPeriod { get; set; }
        public virtual DbSet<Loan> Credit { get; set; }
        public virtual DbSet<DefUserLogType> DefUserLogType { get; set; }
        public virtual DbSet<Expense> Expense { get; set; }
        public virtual DbSet<Income> Income { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<UserLog> UserLog { get; set; }
        public virtual DbSet<Project> Project { get; set; }
        public virtual DbSet<ProjectItem> ProjectItem { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>(entity =>
            {
                entity.ToTable("account");

                entity.HasIndex(e => e.UserId)
                    .HasName("fki_account_user_id_fk");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasDefaultValueSql("nextval('account_seq'::regclass)");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name");

                entity.Property(e => e.Amount).HasColumnName("amount");

                entity.Property(e => e.Date).HasColumnName("date");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.Property(e => e.TypeDefid).HasColumnName("type_defid");

                entity.HasOne(d => d.DefAccountType)
                   .WithMany(p => p.Accounts)
                   .HasForeignKey(d => d.TypeDefid)
                   .OnDelete(DeleteBehavior.ClientSetNull)
                   .HasConstraintName("account_type_defid_fk");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Account)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("account_user_id_fk");
            });

            modelBuilder.Entity<CreditCard>(entity =>
            {
                entity.ToTable("credit_card");

                entity.HasIndex(e => e.UserId)
                    .HasName("fki_credit_card_user_id_fk");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasDefaultValueSql("nextval('credit_card_seq'::regclass)");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.CreditCard)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("credit_card_user_id_fk");
            });

            modelBuilder.Entity<CreditCardInstallment>(entity =>
            {
                entity.ToTable("credit_card_installment");

                entity.HasIndex(e => e.CreditCardId)
                    .HasName("fki_credit_card_installment_credit_card_id_fk");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasDefaultValueSql("nextval('credit_card_installment_seq'::regclass)");

                entity.Property(e => e.Amount).HasColumnName("amount");

                entity.Property(e => e.CreditCardId).HasColumnName("credit_card_id");

                entity.Property(e => e.Installment).HasColumnName("installment");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name");

                entity.Property(e => e.Period)
                    .HasColumnName("period")
                    .HasColumnType("date");

                entity.HasOne(d => d.CreditCard)
                    .WithMany(p => p.CreditCardInstallment)
                    .HasForeignKey(d => d.CreditCardId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("credit_card_installment_credit_card_id_fk");
            });

            modelBuilder.Entity<CreditCardPeriod>(entity =>
            {
                entity.ToTable("credit_card_period");

                entity.HasIndex(e => e.CreditCardId)
                    .HasName("fki_credit_card_period_credit_card_id_fk");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasDefaultValueSql("nextval('credit_card_period_seq'::regclass)");

                entity.Property(e => e.Amount).HasColumnName("amount");

                entity.Property(e => e.CreditCardId).HasColumnName("credit_card_id");

                entity.Property(e => e.Period)
                    .HasColumnName("period")
                    .HasColumnType("date");

                entity.HasOne(d => d.CreditCard)
                    .WithMany(p => p.CreditCardPeriod)
                    .HasForeignKey(d => d.CreditCardId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("credit_card_period_credit_card_id_fk");
            });

            modelBuilder.Entity<Loan>(entity =>
            {
                entity.ToTable("loan");

                entity.HasIndex(e => e.UserId)
                    .HasName("fki_loan_user_id_fk");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasDefaultValueSql("nextval('loan_seq'::regclass)");

                entity.Property(e => e.Amount).HasColumnName("amount");

                entity.Property(e => e.PrincipalAmount).HasColumnName("principal_amount");

                entity.Property(e => e.Installment).HasColumnName("installment");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name");

                entity.Property(e => e.Closed)
                    .IsRequired()
                    .HasColumnName("closed");

                entity.Property(e => e.ClosedPeriod)
                    .HasColumnName("closed_period")
                    .HasColumnType("date");

                entity.Property(e => e.Period)
                    .HasColumnName("period")
                    .HasColumnType("date");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Loan)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("loan_user_id_fk");
            });

            modelBuilder.Entity<DefUserLogType>(entity =>
            {
                entity.ToTable("def_user_log_type");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Text).HasColumnName("text");
            });

            modelBuilder.Entity<DefAccountType>(entity =>
            {
                entity.ToTable("def_account_type");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Text).HasColumnName("text");
            });

            modelBuilder.Entity<Expense>(entity =>
            {
                entity.ToTable("expense");

                entity.HasIndex(e => e.UserId)
                    .HasName("fki_expense_user_id_fk");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasDefaultValueSql("nextval('expense_seq'::regclass)");

                entity.Property(e => e.Amount).HasColumnName("amount");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name");

                entity.Property(e => e.Period)
                    .IsRequired()
                    .HasColumnName("period");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Expense)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("expense_user_id_fk");
            });

            modelBuilder.Entity<Income>(entity =>
            {
                entity.ToTable("income");

                entity.HasIndex(e => e.UserId)
                    .HasName("fki_income_user_id_fk");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasDefaultValueSql("nextval('income_seq'::regclass)");

                entity.Property(e => e.Amount).HasColumnName("amount");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name");

                entity.Property(e => e.Period)
                    .IsRequired()
                    .HasColumnName("period");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Income)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("income_user_id_fk");
            });

            modelBuilder.Entity<Project>(entity =>
            {
                entity.ToTable("project");

                entity.HasIndex(e => e.UserId)
                    .HasName("fki_project_user_fkey");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasDefaultValueSql("nextval('project_seq'::regclass)");

                entity.Property(e => e.Date).HasColumnName("date");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Project)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("project_user_fkey");
            });

            modelBuilder.Entity<ProjectItem>(entity =>
            {
                entity.ToTable("project_item");

                entity.HasIndex(e => e.ProjectId)
                    .HasName("fki_project_item_project_fkey");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasDefaultValueSql("nextval('project_item_seq'::regclass)");

                entity.Property(e => e.Amount).HasColumnName("amount");

                entity.Property(e => e.IsIncome).HasColumnName("is_income");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name");

                entity.Property(e => e.Period)
                    .HasColumnName("period")
                    .HasColumnType("date");

                entity.Property(e => e.ProjectId).HasColumnName("project_id");

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.ProjectItem)
                    .HasForeignKey(d => d.ProjectId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("project_item_project_fkey");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("user_");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasDefaultValueSql("nextval('user_seq'::regclass)");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password");

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasColumnName("username");
            });

            modelBuilder.Entity<UserLog>(entity =>
            {
                entity.ToTable("user_log");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasDefaultValueSql("nextval('user_log_seq'::regclass)");

                entity.Property(e => e.Date)
                    .HasColumnName("date")
                    .HasColumnType("timestamp(4) without time zone");

                entity.Property(e => e.Ip)
                    .IsRequired()
                    .HasColumnName("ip")
                    .HasDefaultValueSql("''::text");

                entity.Property(e => e.TypeDefid).HasColumnName("type_defid");

                entity.Property(e => e.UserId).HasColumnName("user_id");
            });

            modelBuilder.HasSequence("credit_card_installment_seq");

            modelBuilder.HasSequence("credit_card_period_seq");

            modelBuilder.HasSequence("credit_card_seq");

            modelBuilder.HasSequence("loan_seq");

            modelBuilder.HasSequence("expense_seq");

            modelBuilder.HasSequence("income_seq");

            modelBuilder.HasSequence("user_log_seq");

            modelBuilder.HasSequence("user_seq");

            modelBuilder.HasSequence("account_seq");

            OnModelCreatingPartial(modelBuilder);
        }
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
