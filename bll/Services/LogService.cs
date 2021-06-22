using bll.Bases;
using bll.Extensions;
using core.Tools;
using dal.Bases;
using dal.Entities;
using dto.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace bll.Services
{
    public class LogService : ServiceBase, ILogService
    {
        private readonly IRepository<UserLog> _UserLogRepository;

        public LogService(IUnitOfWork _unitofWork) : base(_unitofWork)
        {
            _UserLogRepository = _unitofWork.GetRepository<UserLog>();
        }

        public async Task<long> LogUserAsync(RequestLogUserDto _dto)
        {

            var _log = await _UserLogRepository.AddAsync(_dto.ConvertToEntity());

            Save();

            return _log.Id;

        }
    }
}
