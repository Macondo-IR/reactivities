﻿using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SecondApi.DTOs;
using System.Threading.Tasks;

namespace SecondApi.Controllers
{
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;

        public AccountController(UserManager<AppUser> userManager,SignInManager<AppUser> signInManager )

        {
            _userManager = userManager;
            _signInManager = signInManager;
        }
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null) return Unauthorized();
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Paswword, false);
            if(result.Succeeded)
            {
                return new UserDto()
                {
                    DisplayName = user.DisplayName,
                    Image = null,
                    Token = "Token",
                    UserName = user.UserName
                };
            }
            return Unauthorized();
        }
             
    }
}
