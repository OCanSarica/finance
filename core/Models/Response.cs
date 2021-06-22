using System.Collections.Generic;

namespace core.Models
{
    public class Response
    {
        private string _Message;

        public object Data { get; set; }

        public bool Success { get; set; }

        public string Message
        {
            get
            {
                if (!Success && string.IsNullOrEmpty(_Message))
                {
                    return "something went wrong.";
                }

                return _Message ?? string.Empty;
            }
            set
            {
                _Message = value;
            }
        }
    }
}
