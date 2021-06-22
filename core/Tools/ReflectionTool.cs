using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace core.Tools
{
    public sealed class ReflectionTool
    {
        public static ReflectionTool Instance => _Instance.Value;

        private static readonly Lazy<ReflectionTool> _Instance =
            new Lazy<ReflectionTool>(() => new ReflectionTool());

        private ReflectionTool()
        {
        }

        public IEnumerable<Type> GetTypesInNamespace(
            Assembly _assymbly,
            string _nameSpace,
            Type _baseType = null,
            Type _implementedInterface = null)
        {
            IEnumerable<Type> _result = null;

            try
            {
                _result = _assymbly.
                    GetTypes().
                    Where(t => string.Equals(
                        t.Namespace, 
                        _nameSpace, 
                        StringComparison.Ordinal));

                if (_implementedInterface != null)
                {
                    _result = _result.Where(x =>
                        ((TypeInfo)x).ImplementedInterfaces.
                            Contains(_implementedInterface));
                }
                else if (_baseType != null)
                {
                    _result = _result.Where(x => x.BaseType == _baseType);
                }
            }
            catch (Exception _ex)
            {
                LogTool.Instance.Error(_ex);
            }

            return _result;
        }

        public Type GetEntityType(string _entity) => 
            $"dal.Entities.{_entity}".GetType();


        public JsonPropertyAttribute GetTableJsonAttribute(Type _type) =>
            _type.GetCustomAttribute<JsonPropertyAttribute>();
    }
}
