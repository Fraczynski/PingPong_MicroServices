using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;
using PingPongMicro;
using Auth_Service.Dtos;
using Microsoft.AspNetCore.Identity;
using Auth_Service.Models;
using System.Threading.Tasks;

namespace Auth_Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IConfiguration _configuration;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly RoleManager<Role> _roleManager;
        public AuthController(IConfiguration configuration, UserManager<User> userManager, SignInManager<User> signInManager, RoleManager<Role> roleManager)
        {
            _configuration = configuration;
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
        }
        [HttpGet("publicKey")]
        public IActionResult GetPublicKey()
        {
            return Ok(_configuration.GetSection("AppSettings:PublicKey").Value);
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            User userToCreate = new User { Email = registerDto.Email, FirstName = registerDto.FirstName, LastName = registerDto.LastName };
            userToCreate.UserName = userToCreate.Email;

            var creatingUserResult = await _userManager.CreateAsync(userToCreate, registerDto.Password);
            if (!creatingUserResult.Succeeded)
            {
                return BadRequest(creatingUserResult.Errors);
            }
            await _userManager.AddToRoleAsync(userToCreate, "Employee");
            return Ok();
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user != null)
            {
                var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

                if (result.Succeeded)
                {
                    return Ok(new
                    {
                        token = GenerateToken(_configuration.GetSection("AppSettings:PrivateKey").Value, user).Result
                    });
                }
            }
            return Unauthorized();
        }
        private async Task<string> GenerateToken(string privateKey, User user)
        {
            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()));

            var roles = await _userManager.GetRolesAsync(user);

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            SecurityKey key = TokenHelper.BuildRsaSigningKey(privateKey);
            var creds = new SigningCredentials(key, SecurityAlgorithms.RsaSha256Signature, SecurityAlgorithms.Sha256Digest);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddHours(24),
                SigningCredentials = creds
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}