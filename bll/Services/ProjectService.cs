using bll.Bases;
using core.Bases;
using dal.Bases;
using bll.Extensions;
using dto.Models;
using System.Collections.Generic;
using dal.Entities;
using System.Linq;
using System.Linq.Expressions;
using System;
using Microsoft.EntityFrameworkCore;

namespace bll.Services
{
    public class ProjectService : ServiceBase, IProjectService
    {
        private readonly IRepository<Project> _Repository;

        public ProjectService(IUnitOfWork _unitofWork) : base(_unitofWork)
        {
            _Repository = _unitofWork.GetRepository<Project>();
        }

        public IEnumerable<ProjectDto> GetAll(long _userId) =>
             _Repository.GetAll(x => x.UserId == _userId).
                AsQueryable().
                Include(x=>x.ProjectItem).
                Select(x => x.ConvertToDto());

        public ProjectDto Get(long _id) =>
            _Repository.Get(_id)?.ConvertToDto();

        public long Add(ProjectDto _dto)
        {
            var _result = _Repository.Add(_dto.ConvertToEntity());

            Save();

            return _result.Id;
        }

        public void Update(ProjectDto _dto)
        {
            var _project = _Repository.Get(_dto.Id);

            _project.Date = _dto.Date;

            _project.Name = _dto.Name;

            Save();
        }

        public void Remove(long _id)
        {
            _Repository.Remove(_id);

            Save();
        }

        public bool Check(long _userId, long _id) =>
            _Repository.Any(x => x.Id == _id && x.UserId == _userId);
    }
}
