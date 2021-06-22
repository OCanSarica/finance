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
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _ProjectService;

        private readonly IProjectItemService _ProjectItemService;

        public ProjectController(
            IProjectService _projectService,
            IProjectItemService _projectItemService)
        {
            _ProjectService = _projectService;

            _ProjectItemService = _projectItemService;
        }

        [HttpGet]
        public Response GetAll()
        {
            var _result = new Response();

            try
            {
                var _userId = HttpTool.Instance.GetUserId();

                _result.Data = _ProjectService.
                    GetAll(_userId).
                    OrderByDescending(x=>x.Date).
                    ToList();

                _result.Success = true;
            }
            catch (Exception _ex)
            {
                LogTool.Instance.Error(_ex);
            }

            return _result;
        }

        [HttpGet]
        [Route("{_id}")]
        public Response Get(long _id)
        {
            var _result = new Response();

            try
            {
                var _userId = HttpTool.Instance.GetUserId();

                _result.Data = _ProjectService.Get(_id);

                _result.Success = true;
            }
            catch (Exception _ex)
            {
                LogTool.Instance.Error(_ex);
            }

            return _result;
        }

        [HttpPost]
        public Response Add(ProjectDto _dto)
        {
            var _result = new Response();

            try
            {
                _dto.Id = _ProjectService.Add(_dto);

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
        public Response Update(ProjectDto _dto)
        {
            var _result = new Response();

            try
            {
                var _userId = HttpTool.Instance.GetUserId();

                if (!_ProjectService.Check(_userId, _dto.Id))
                {
                    _result.Message = "the project is not yours.";

                    return _result;
                }

                _ProjectService.Update(_dto);

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

                if (!_ProjectService.Check(_userId, _id))
                {
                    _result.Message = "the project is not yours.";

                    return _result;
                }

                _ProjectService.Remove(_id);

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