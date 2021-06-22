using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace dto.Enums
{
    public enum UserLogType
    {
        [Description("Kullanıcı adı veya şifre yanlış.")]
        WrongLogin = 1,

        [Description("Kullanıcı giriş yaptı.")]
        Login = 2,

        [Description("Çıkış yapıldı.")]
        Logout = 3,
    }
}
