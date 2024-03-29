﻿using Microsoft.Extensions.Configuration;
using System;
using System.Security.Cryptography;
using System.Text;
using core.Bases;
using core.Encryptors;
using System.Collections.Generic;

namespace core.Tools
{
    public sealed class EncryptionTool
    {
        private readonly IConfiguration _Configuration;

        private readonly IEncryptor _Encryptor;

        private static readonly Lazy<EncryptionTool> _Instance =
            new Lazy<EncryptionTool>(() => new EncryptionTool(EncryptionAlgorithm.Rsa));

        public static EncryptionTool Instance => _Instance.Value;

        private EncryptionTool(EncryptionAlgorithm _encryptionAlgorithm)
        {
            _Configuration = new ConfigurationBuilder().
                AddJsonFile("appsettings.json", true, true).
                Build();

            if (_encryptionAlgorithm == EncryptionAlgorithm.Md5)
            {
                _Encryptor = new Md5Encryptor(_Configuration["Md5Key"]);
            }
            else if (_encryptionAlgorithm == EncryptionAlgorithm.Rsa)
            {
                var _publicKey = _Configuration["RsaKey:Public"];

                var _privateKey = _Configuration["RsaKey:Private"];
               
                var _rsaPublicKey = Encoding.UTF8.GetString(
                    Convert.FromBase64String(_publicKey));

                var _rsaPrivateKey = Encoding.UTF8.GetString(
                    Convert.FromBase64String(_privateKey));

                _Encryptor = new RsaEncryptor(_rsaPrivateKey, _rsaPublicKey);
            }
        }

        public string Encrypt(string _data) => _Encryptor.Encrypt(_data);

        public string Decrypt(string _data) => _Encryptor.Decrypt(_data);

        public static Dictionary<string, string> GenerateKeys()
        {
            using var _rsa = new RSACryptoServiceProvider(2048)
            {
                PersistKeyInCsp = false
            };

            var _publicKey = _rsa.ToXmlString(false);

            var _publicKey64 = Convert.ToBase64String(Encoding.UTF8.GetBytes(_publicKey));

            var _privateKey = _rsa.ToXmlString(true);

            var _privateKey64 = Convert.ToBase64String(Encoding.UTF8.GetBytes(_privateKey));

            return new Dictionary<string,string>()
            {
                ["_publicKey"] = _publicKey,
                ["_publicKey64"] = _publicKey64,
                ["_privateKey"] = _privateKey,
                ["_privateKey64"] = _privateKey64
            };
            
        }

        private enum EncryptionAlgorithm
        {
            Md5,
            Rsa
        }
    }
}
