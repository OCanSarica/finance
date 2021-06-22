using Microsoft.AspNetCore.Http;
using System;

namespace core.Tools
{
    public sealed class HttpTool
    {
        private static readonly Lazy<HttpTool> _Instance =
            new Lazy<HttpTool>(() => new HttpTool());

        public static HttpTool Instance => _Instance.Value;

        private IHttpContextAccessor _HttpContextAccessor;

        public void Configure(IHttpContextAccessor _httpContextAccessor) =>
            _HttpContextAccessor = _httpContextAccessor;

        public HttpContext GetHttpContext() =>
            _HttpContextAccessor.HttpContext;

        public ISession GetSession() =>
            _HttpContextAccessor.HttpContext.Session;

        public long GetUserId() => 
            Convert.ToInt64(
                _HttpContextAccessor.HttpContext.Request.Headers["token_user_id"]);

        public string GetIpAddress()
        {
            var _result = "";

            try
            {
                _result = _HttpContextAccessor.HttpContext.Connection.RemoteIpAddress.ToString();
            }
            catch (System.Exception)
            {
            }

            return _result;
        }
    }
}
