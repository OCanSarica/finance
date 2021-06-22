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

namespace bll.Services
{
    public class ProjectItemService : ServiceBase, IProjectItemService
    {
        private readonly IRepository<ProjectItem> _ProjectItemRepository;

        private readonly IRepository<Project> _ProjectRepository;

        public ProjectItemService(IUnitOfWork _unitofWork) : base(_unitofWork)
        {
            _ProjectItemRepository = _unitofWork.GetRepository<ProjectItem>();

            _ProjectRepository = _unitofWork.GetRepository<Project>();
        }

        public IEnumerable<ProjectItemDto> GetAll(long _projectId) =>
             _ProjectItemRepository.GetAll(x => x.ProjectId == _projectId).
                Select(x => x.ConvertToDto());

        public long Add(ProjectItemDto _dto)
        {
            var _result = _ProjectItemRepository.Add(_dto.ConvertToEntity());

            Save();

            return _result.Id;
        }

        public void Update(ProjectItemDto _dto)
        {
            var _projectItem = _ProjectItemRepository.Get(_dto.Id);

            _projectItem.Amount = _dto.Amount;

            _projectItem.IsIncome = _dto.IsIncome;

            _projectItem.Name = _dto.Name;

            _projectItem.Period = _dto.Period;

            Save();
        }

        public void Remove(long _id)
        {
            _ProjectItemRepository.Remove(_id);

            Save();
        }

        // aslında bunu yapmak yerine projectitemrepository yazmak lazımdı,
        // _Context.ProjectItems.Any(x => x.Id == _id && x.Project.UserId == _userId)
        // ama erindim
        public bool Check(long _userId, long _id)
        {
            var _result = false;

            var _projectItem = _ProjectItemRepository.Get(_id);

            if (_projectItem == null)
            {
                return _result;
            }

            _result = _ProjectRepository.
                Any(x => x.UserId == _userId && x.Id == _projectItem.ProjectId);

            return _result;
        }
    }
}
