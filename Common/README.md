# Packages
This folder contains a local repository with nuget packages(nuget_repo) and their source code. This way different microservices can share common functions(for example token validation).
## Installation
First, you need to add nuget_repo to NugetPackageSources(using VisualStudio) and then you will be able to install PingPongMicro package using NugetPackageManager.
## Usage
Inside Startup, ConfigureServices:
```
services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(
    options =>
    {
        var key = PingPongMicro.TokenHelper.BuildRsaSigningKey(publicAuthorizationKey);
        options.TokenValidationParameters = PingPongMicro.TokenHelper.GetTokenValidationParameters(key);
    });
```
As you can see, you will need a public key. You should obtain it from authentication service, for example:
```
using (var httpClient = new HttpClient())
{    
    using (var response = httpClient.GetAsync("http://localhost:5000/api/publickey"))
    {
        string publicAuthorizationKey = response.Result.Content.ReadAsStringAsync().Result;
    }
}
```
From now you are able to use [Authorize] attribute inside your controllers. Tokens will be validated automatically.