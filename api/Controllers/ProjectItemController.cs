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
    public class ProjectItemController : ControllerBase
    {
        private readonly IProjectItemService _ProjectItemService;

        private readonly IProjectService _ProjectService;

        public ProjectItemController(
            IProjectService _projectService,
            IProjectItemService _projectItemService)
        {
            _ProjectService = _projectService;

            _ProjectItemService = _projectItemService;
        }

        [HttpGet]
        [Route("{_projectId}")]
        public Response GetAll(long _projectId)
        {
            var _result = new Response();

            try
            {
                var _userId = HttpTool.Instance.GetUserId();

                if (!_ProjectService.Check(_userId, _projectId))
                {
                    _result.Message = "the project is not yours.";

                    return _result;
                }

                _result.Data = _ProjectItemService.
                    GetAll(_projectId).
                    OrderByDescending(x => x.Period).
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
        public Response Add(ProjectItemDto _dto)
        {
            var _result = new Response();

            try
            {
                var _userId = HttpTool.Instance.GetUserId();

                if (!_ProjectService.Check(_userId, _dto.ProjectId))
                {
                    _result.Message = "the project is not yours.";

                    return _result;
                }

                _dto.Id = _ProjectItemService.Add(_dto);

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
        public Response Update(ProjectItemDto _dto)
        {
            var _result = new Response();

            try
            {
                var _userId = HttpTool.Instance.GetUserId();

                if (!_ProjectItemService.Check(_userId, _dto.Id))
                {
                    _result.Message = "the project item is not yours.";

                    return _result;
                }

                _ProjectItemService.Update(_dto);

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

                if (!_ProjectItemService.Check(_userId, _id))
                {
                    _result.Message = "the project item is not yours.";

                    return _result;
                }

                _ProjectItemService.Remove(_id);

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